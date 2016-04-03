<?php

namespace App\Models;

use Abimo\Factory;
use Upload\File;
use Upload\Storage\FileSystem;
use Upload\Validation\Mimetype;
use Upload\Validation\Size;
use ImageOptimizer\OptimizerFactory;
use Webpatser\Sanitize\Sanitize;

class BusinessModel
{
    /**
     * @var string
     */
    public $table;

    /**
     * @var string
     */
    public $action;

    /**
     * @var string
     */
    public $id;

    /**
     * @var Factory
     */
    public $factory;

    /**
     * @var \Abimo\Config
     */
    private $config;

    /**
     * @var array
     */
    public $data = [];

    /**
     * BusinessModel constructor.
     *
     * @param $table
     * @param $action
     * @param $id
     */
    public function __construct($table = null, $action = null, $id = null)
    {
        $this->table = $table;
        $this->action = $action;
        $this->id = $id;

        $this->factory = new Factory();

        $this->config = $this->factory->config();
    }

    /**
     * CRUD based on the data.
     *
     * @throws \ErrorException
     * @return void
     */
    public function manageData()
    {
        $persistenceModel = new PersistenceModel($this);

        $this->getJson();

        $this->managePermissions();

        if (!empty($_POST)) {
            if (!empty($_POST['order'])) {
                $persistenceModel->updateOrder();
            } else {
                $response = $this->factory->response();
                $url = new UrlModel();

                if ($this->action === 'create') {
                    $this->managePlugins();

                    $persistenceModel->createRow();

                    $response
                        ->header('Location: '.$url->admin($this->table))
                        ->send();

                    exit;
                } elseif ($this->action === 'update') {
                    $this->managePlugins();

                    $persistenceModel->updateRow();

                    $response
                        ->header('Location: '.$url->admin($this->table))
                        ->send();

                    exit;
                } elseif ($this->action === 'delete') {
                    $persistenceModel->deleteRow();

                    if (!empty($this->id)) {
                        exit(json_encode($url->admin($this->table)));
                    }
                }
            }
        }

        $persistenceModel->readRows();
    }

    /**
     * Parse the .json files and prepare the structure.
     *
     * @throws \ErrorException
     * @return array
     */
    public function getJson()
    {
        $path = rtrim($this->config->get('admin', 'jsonPath'), '/');

        $iterator = new \DirectoryIterator($path);

        foreach ($iterator as $file) {
            $file = $file->getFilename();

            //TODO - skip hidden files
            if (substr($file, 0, 1) === '.') {
                continue;
            }

            $string = file_get_contents($path.'/'.$file);

            if (!$json = json_decode($string, true)) {
                throw new \ErrorException('Unable to decode '.$file);
            }

            $table = basename($file, '.json');

            $data[$table] = $json;

            //TODO - there must always be the key present
            $key = $data[$table]['key'];

            //TODO - if the key is not provided, build the default
            if (empty($data[$table]['columns'][$key])) {
                $data[$table]['columns'] = [
                        $key => [
                            'name' => 'ID',
                            'view' => false,
                            'attributes' => [
                                'disabled' => 'true'
                            ]
                        ]
                    ] + $data[$table]['columns'];
            }
        }

        ksort($data);

        return $this->data = $data;
    }

    /**
     * Manage CRUD permissions.
     *
     * @throws \ErrorException
     */
    public function managePermissions()
    {
        if (!empty($this->action)) {
            switch($this->action) {
                case 'create':
                    if (empty($this->data[$this->table]['create'])) {
                        throw new \ErrorException('Permission denied to: '.$this->action);
                    }
                    break;
                case 'update':
                    if (empty($this->data[$this->table]['update'])) {
                        throw new \ErrorException('Permission denied to: '.$this->action);
                    }
                    break;
                case 'delete':
                    if (empty($this->data[$this->table]['delete'])) {
                        throw new \ErrorException('Permission denied to: '.$this->action);
                    }
                    break;
            };
        }
    }

    /**
     * Manage the plugins.
     *
     * @return void
     */
    public function managePlugins()
    {
        
        if (empty($this->action)) {
            return;
        }
        
        $plugins = [] ; 
        
        foreach ( $this->data[$this->table]['columns'] as $column => $columnconfig ) {
          
          if ( empty( $columnconfig['plugin'] ) ) continue ;
          
          $pluginclass = '\\App\\Plugins\\'. ucfirst( $columnconfig['plugin'] ) .'Plugin' ;
          
          if ( ! class_exists( $pluginclass ) ) {
            #TODO: throw an exception of a plugin class does not exist
            #   for now, there are lots of them, so skip it silently.          
            #throw new \Exception( "Plugin class {$pluginclass} not found" ) ;
            #var_export([ 'plugin class not found:' => $pluginclass, $column => $columnconfig ]) ;
            continue ;
          }
          
          #var_export([ $pluginclass, $column => $columnconfig ]) ; 
          
          // cache instantiated plugins for re-use
          if ( empty( $plugins[$pluginclass] ) )
            $plugins[$pluginclass] = new $pluginclass( $this, $this->config ) ;

          $httpmethod = strtoupper( $this->factory->request()->method() ) ;
          if ( $httpmethod === 'POST'  ) {
            $plugins[$pluginclass]->postHandler( $column, $this->factory->request() ) ;
            
          } elseif ( $httpmethod === 'GET') {
            
            // call the viewTemplate() configuration method with a new template
            $template = $this->factory->template() ;
            $plugins[$pluginclass]->viewTemplate( $column, $template ) ;

            // put the template (or its results?) into data structure for later rendering
            $this->data[$this->table]['plugins'][$column] = $template->render() ;
        
          }
          
        }
        
        
    }  

}
