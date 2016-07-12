!function(e,t,n){"use strict";e.fn.hideseek=function(t){var n={list:".hideseek-data",nodata:"",attribute:"text",highlight:!1,ignore:"",navigation:!1,ignore_accents:!1,hidden_mode:!1},t=e.extend(n,t);return this.each(function(){var n=e(this);n.opts=[],e.map(["list","nodata","attribute","highlight","ignore","navigation","ignore_accents","hidden_mode"],function(e,i){n.opts[e]=n.data(e)||t[e]});var i=e(n.opts.list);n.opts.navigation&&n.attr("autocomplete","off"),n.opts.hidden_mode&&i.children().hide(),n.keyup(function(t){function o(e){return e.children(".selected:visible")}function a(e){return o(e).prevAll(":visible:first")}function r(e){return o(e).nextAll(":visible:first")}if(38!=t.keyCode&&40!=t.keyCode&&13!=t.keyCode){var s=n.val().toLowerCase();i.children(n.opts.ignore.trim()?":not("+n.opts.ignore+")":"").removeClass("selected").each(function(){var t="text"!=n.opts.attribute?e(this).attr(n.opts.attribute).toLowerCase():e(this).text().toLowerCase(),i=-1==t.removeAccents(n.opts.ignore_accents).indexOf(s)||s===(n.opts.hidden_mode?"":!1);i?(e(this).hide(),n.trigger("_after_each")):(n.opts.highlight?e(this).removeHighlight().highlight(s).show():e(this).show(),n.trigger("_after_each"))}),n.opts.nodata&&(i.find(".no-results").remove(),i.children(':not([style*="display: none"])').length?(e(".table").removeClass("hidden"),e(".no-results").addClass("hidden")):(e(".table").addClass("hidden"),e(".no-results").removeClass("hidden"))),n.trigger("_after")}n.opts.navigation&&(38==t.keyCode?o(i).length?(a(i).addClass("selected"),o(i).last().removeClass("selected")):i.children(":visible").last().addClass("selected"):40==t.keyCode?o(i).length?(r(i).addClass("selected"),o(i).first().removeClass("selected")):i.children(":visible").first().addClass("selected"):13==t.keyCode&&(o(i).find("a").length?document.location=o(i).find("a").attr("href"):n.val(o(i).text())))})})},e(document).ready(function(){e('[data-toggle="hideseek"]').hideseek()})}(jQuery),jQuery.fn.highlight=function(e){function t(e,n){var i=0;if(3==e.nodeType){var o=e.data.removeAccents(!0).toUpperCase().indexOf(n);if(o>=0){var a=document.createElement("mark");a.className="highlight";var r=e.splitText(o);r.splitText(n.length);var s=r.cloneNode(!0);a.appendChild(s),r.parentNode.replaceChild(a,r),i=1}}else if(1==e.nodeType&&e.childNodes&&!/(script|style)/i.test(e.tagName))for(var l=0;l<e.childNodes.length;++l)l+=t(e.childNodes[l],n);return i}return this.length&&e&&e.length?this.each(function(){t(this,e.toUpperCase())}):this},jQuery.fn.removeHighlight=function(){return this.find("mark.highlight").each(function(){with(this.parentNode.firstChild.nodeName,this.parentNode)replaceChild(this.firstChild,this),normalize()}).end()},String.prototype.removeAccents=function(e){return e?this.replace(/[áàãâä]/gi,"a").replace(/[éè¨ê]/gi,"e").replace(/[íìïî]/gi,"i").replace(/[óòöôõ]/gi,"o").replace(/[úùüû]/gi,"u").replace(/[ç]/gi,"c").replace(/[ñ]/gi,"n"):this},function(e){"use strict";"function"==typeof define&&define.amd?define(e):"undefined"!=typeof module&&"undefined"!=typeof module.exports?module.exports=e():"undefined"!=typeof Package?Sortable=e():window.Sortable=e()}(function(){"use strict";function e(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be HTMLElement, and not "+{}.toString.call(e);this.el=e,this.options=t=m({},t),e[H]=this;var n={group:Math.random(),sort:!0,disabled:!1,store:null,handle:null,scroll:!0,scrollSensitivity:30,scrollSpeed:10,draggable:/[uo]l/i.test(e.nodeName)?"li":">*",ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",ignore:"a, img",filter:null,animation:0,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1};for(var i in n)!(i in t)&&(t[i]=n[i]);F(t);for(var a in this)"_"===a.charAt(0)&&(this[a]=this[a].bind(this));this.nativeDraggable=t.forceFallback?!1:z,o(e,"mousedown",this._onTapStart),o(e,"touchstart",this._onTapStart),this.nativeDraggable&&(o(e,"dragover",this),o(e,"dragenter",this)),$.push(this._onDragOver),t.store&&this.sort(t.store.get(this))}function t(e){w&&w.state!==e&&(s(w,"display",e?"none":""),!e&&w.state&&x.insertBefore(w,y),w.state=e)}function n(e,t,n){if(e){n=n||X,t=t.split(".");var i=t.shift().toUpperCase(),o=new RegExp("\\s("+t.join("|")+")(?=\\s)","g");do if(">*"===i&&e.parentNode===n||(""===i||e.nodeName.toUpperCase()==i)&&(!t.length||((" "+e.className+" ").match(o)||[]).length==t.length))return e;while(e!==n&&(e=e.parentNode))}return null}function i(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.preventDefault()}function o(e,t,n){e.addEventListener(t,n,!1)}function a(e,t,n){e.removeEventListener(t,n,!1)}function r(e,t,n){if(e)if(e.classList)e.classList[n?"add":"remove"](t);else{var i=(" "+e.className+" ").replace(M," ").replace(" "+t+" "," ");e.className=(i+(n?" "+t:"")).replace(M," ")}}function s(e,t,n){var i=e&&e.style;if(i){if(void 0===n)return X.defaultView&&X.defaultView.getComputedStyle?n=X.defaultView.getComputedStyle(e,""):e.currentStyle&&(n=e.currentStyle),void 0===t?n:n[t];t in i||(t="-webkit-"+t),i[t]=n+("string"==typeof n?"":"px")}}function l(e,t,n){if(e){var i=e.getElementsByTagName(t),o=0,a=i.length;if(n)for(;a>o;o++)n(i[o],o);return i}return[]}function c(e,t,n,i,o,a,r){var s=X.createEvent("Event"),l=(e||t[H]).options,c="on"+n.charAt(0).toUpperCase()+n.substr(1);s.initEvent(n,!0,!0),s.to=t,s.from=o||t,s.item=i||t,s.clone=w,s.oldIndex=a,s.newIndex=r,t.dispatchEvent(s),l[c]&&l[c].call(e,s)}function u(e,t,n,i,o,a){var r,s,l=e[H],c=l.options.onMove;return r=X.createEvent("Event"),r.initEvent("move",!0,!0),r.to=t,r.from=e,r.dragged=n,r.draggedRect=i,r.related=o||t,r.relatedRect=a||t.getBoundingClientRect(),e.dispatchEvent(r),c&&(s=c.call(l,r)),s}function d(e){e.draggable=!1}function f(){Y=!1}function h(e,t){var n=e.lastElementChild,i=n.getBoundingClientRect();return(t.clientY-(i.top+i.height)>5||t.clientX-(i.right+i.width)>5)&&n}function p(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,n=t.length,i=0;n--;)i+=t.charCodeAt(n);return i.toString(36)}function g(e){var t=0;if(!e||!e.parentNode)return-1;for(;e&&(e=e.previousElementSibling);)"TEMPLATE"!==e.nodeName.toUpperCase()&&t++;return t}function v(e,t){var n,i;return function(){void 0===n&&(n=arguments,i=this,setTimeout(function(){1===n.length?e.call(i,n[0]):e.apply(i,n),n=void 0},t))}}function m(e,t){if(e&&t)for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}var y,b,C,w,x,S,T,D,_,E,k,B,O,N,A,I,q,L={},M=/\s+/g,H="Sortable"+(new Date).getTime(),U=window,X=U.document,j=U.parseInt,z=!!("draggable"in X.createElement("div")),P=function(e){return e=X.createElement("x"),e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}(),Y=!1,R=Math.abs,$=([].slice,[]),W=v(function(e,t,n){if(n&&t.scroll){var i,o,a,r,s=t.scrollSensitivity,l=t.scrollSpeed,c=e.clientX,u=e.clientY,d=window.innerWidth,f=window.innerHeight;if(D!==n&&(T=t.scroll,D=n,T===!0)){T=n;do if(T.offsetWidth<T.scrollWidth||T.offsetHeight<T.scrollHeight)break;while(T=T.parentNode)}T&&(i=T,o=T.getBoundingClientRect(),a=(R(o.right-c)<=s)-(R(o.left-c)<=s),r=(R(o.bottom-u)<=s)-(R(o.top-u)<=s)),a||r||(a=(s>=d-c)-(s>=c),r=(s>=f-u)-(s>=u),(a||r)&&(i=U)),L.vx===a&&L.vy===r&&L.el===i||(L.el=i,L.vx=a,L.vy=r,clearInterval(L.pid),i&&(L.pid=setInterval(function(){i===U?U.scrollTo(U.pageXOffset+a*l,U.pageYOffset+r*l):(r&&(i.scrollTop+=r*l),a&&(i.scrollLeft+=a*l))},24)))}},30),F=function(e){var t=e.group;t&&"object"==typeof t||(t=e.group={name:t}),["pull","put"].forEach(function(e){e in t||(t[e]=!0)}),e.groups=" "+t.name+(t.put.join?" "+t.put.join(" "):"")+" "};return e.prototype={constructor:e,_onTapStart:function(e){var t=this,i=this.el,o=this.options,a=e.type,r=e.touches&&e.touches[0],s=(r||e).target,l=s,u=o.filter;if(!("mousedown"===a&&0!==e.button||o.disabled)&&(s=n(s,o.draggable,i))){if(B=g(s),"function"==typeof u){if(u.call(this,e,s,this))return c(t,l,"filter",s,i,B),void e.preventDefault()}else if(u&&(u=u.split(",").some(function(e){return e=n(l,e.trim(),i),e?(c(t,e,"filter",s,i,B),!0):void 0})))return void e.preventDefault();o.handle&&!n(l,o.handle,i)||this._prepareDragStart(e,r,s)}},_prepareDragStart:function(e,t,n){var i,a=this,s=a.el,c=a.options,u=s.ownerDocument;n&&!y&&n.parentNode===s&&(A=e,x=s,y=n,b=y.parentNode,S=y.nextSibling,N=c.group,i=function(){a._disableDelayedDrag(),y.draggable=!0,r(y,a.options.chosenClass,!0),a._triggerDragStart(t)},c.ignore.split(",").forEach(function(e){l(y,e.trim(),d)}),o(u,"mouseup",a._onDrop),o(u,"touchend",a._onDrop),o(u,"touchcancel",a._onDrop),c.delay?(o(u,"mouseup",a._disableDelayedDrag),o(u,"touchend",a._disableDelayedDrag),o(u,"touchcancel",a._disableDelayedDrag),o(u,"mousemove",a._disableDelayedDrag),o(u,"touchmove",a._disableDelayedDrag),a._dragStartTimer=setTimeout(i,c.delay)):i())},_disableDelayedDrag:function(){var e=this.el.ownerDocument;clearTimeout(this._dragStartTimer),a(e,"mouseup",this._disableDelayedDrag),a(e,"touchend",this._disableDelayedDrag),a(e,"touchcancel",this._disableDelayedDrag),a(e,"mousemove",this._disableDelayedDrag),a(e,"touchmove",this._disableDelayedDrag)},_triggerDragStart:function(e){e?(A={target:y,clientX:e.clientX,clientY:e.clientY},this._onDragStart(A,"touch")):this.nativeDraggable?(o(y,"dragend",this),o(x,"dragstart",this._onDragStart)):this._onDragStart(A,!0);try{X.selection?X.selection.empty():window.getSelection().removeAllRanges()}catch(t){}},_dragStarted:function(){x&&y&&(r(y,this.options.ghostClass,!0),e.active=this,c(this,x,"start",y,x,B))},_emulateDragOver:function(){if(I){if(this._lastX===I.clientX&&this._lastY===I.clientY)return;this._lastX=I.clientX,this._lastY=I.clientY,P||s(C,"display","none");var e=X.elementFromPoint(I.clientX,I.clientY),t=e,n=" "+this.options.group.name,i=$.length;if(t)do{if(t[H]&&t[H].options.groups.indexOf(n)>-1){for(;i--;)$[i]({clientX:I.clientX,clientY:I.clientY,target:e,rootEl:t});break}e=t}while(t=t.parentNode);P||s(C,"display","")}},_onTouchMove:function(t){if(A){e.active||this._dragStarted(),this._appendGhost();var n=t.touches?t.touches[0]:t,i=n.clientX-A.clientX,o=n.clientY-A.clientY,a=t.touches?"translate3d("+i+"px,"+o+"px,0)":"translate("+i+"px,"+o+"px)";q=!0,I=n,s(C,"webkitTransform",a),s(C,"mozTransform",a),s(C,"msTransform",a),s(C,"transform",a),t.preventDefault()}},_appendGhost:function(){if(!C){var e,t=y.getBoundingClientRect(),n=s(y),i=this.options;C=y.cloneNode(!0),r(C,i.ghostClass,!1),r(C,i.fallbackClass,!0),s(C,"top",t.top-j(n.marginTop,10)),s(C,"left",t.left-j(n.marginLeft,10)),s(C,"width",t.width),s(C,"height",t.height),s(C,"opacity","0.8"),s(C,"position","fixed"),s(C,"zIndex","100000"),s(C,"pointerEvents","none"),i.fallbackOnBody&&X.body.appendChild(C)||x.appendChild(C),e=C.getBoundingClientRect(),s(C,"width",2*t.width-e.width),s(C,"height",2*t.height-e.height)}},_onDragStart:function(e,t){var n=e.dataTransfer,i=this.options;this._offUpEvents(),"clone"==N.pull&&(w=y.cloneNode(!0),s(w,"display","none"),x.insertBefore(w,y)),t?("touch"===t?(o(X,"touchmove",this._onTouchMove),o(X,"touchend",this._onDrop),o(X,"touchcancel",this._onDrop)):(o(X,"mousemove",this._onTouchMove),o(X,"mouseup",this._onDrop)),this._loopId=setInterval(this._emulateDragOver,50)):(n&&(n.effectAllowed="move",i.setData&&i.setData.call(this,n,y)),o(X,"drop",this),setTimeout(this._dragStarted,0))},_onDragOver:function(e){var i,o,a,r=this.el,l=this.options,c=l.group,d=c.put,p=N===c,g=l.sort;if(void 0!==e.preventDefault&&(e.preventDefault(),!l.dragoverBubble&&e.stopPropagation()),q=!0,N&&!l.disabled&&(p?g||(a=!x.contains(y)):N.pull&&d&&(N.name===c.name||d.indexOf&&~d.indexOf(N.name)))&&(void 0===e.rootEl||e.rootEl===this.el)){if(W(e,l,this.el),Y)return;if(i=n(e.target,l.draggable,r),o=y.getBoundingClientRect(),a)return t(!0),void(w||S?x.insertBefore(y,w||S):g||x.appendChild(y));if(0===r.children.length||r.children[0]===C||r===e.target&&(i=h(r,e))){if(i){if(i.animated)return;m=i.getBoundingClientRect()}t(p),u(x,r,y,o,i,m)!==!1&&(y.contains(r)||(r.appendChild(y),b=r),this._animate(o,y),i&&this._animate(m,i))}else if(i&&!i.animated&&i!==y&&void 0!==i.parentNode[H]){_!==i&&(_=i,E=s(i),k=s(i.parentNode));var v,m=i.getBoundingClientRect(),T=m.right-m.left,D=m.bottom-m.top,B=/left|right|inline/.test(E.cssFloat+E.display)||"flex"==k.display&&0===k["flex-direction"].indexOf("row"),O=i.offsetWidth>y.offsetWidth,A=i.offsetHeight>y.offsetHeight,I=(B?(e.clientX-m.left)/T:(e.clientY-m.top)/D)>.5,L=i.nextElementSibling,M=u(x,r,y,o,i,m);if(M!==!1){if(Y=!0,setTimeout(f,30),t(p),1===M||-1===M)v=1===M;else if(B){var U=y.offsetTop,X=i.offsetTop;v=U===X?i.previousElementSibling===y&&!O||I&&O:X>U}else v=L!==y&&!A||I&&A;y.contains(r)||(v&&!L?r.appendChild(y):i.parentNode.insertBefore(y,v?L:i)),b=y.parentNode,this._animate(o,y),this._animate(m,i)}}}},_animate:function(e,t){var n=this.options.animation;if(n){var i=t.getBoundingClientRect();s(t,"transition","none"),s(t,"transform","translate3d("+(e.left-i.left)+"px,"+(e.top-i.top)+"px,0)"),t.offsetWidth,s(t,"transition","all "+n+"ms"),s(t,"transform","translate3d(0,0,0)"),clearTimeout(t.animated),t.animated=setTimeout(function(){s(t,"transition",""),s(t,"transform",""),t.animated=!1},n)}},_offUpEvents:function(){var e=this.el.ownerDocument;a(X,"touchmove",this._onTouchMove),a(e,"mouseup",this._onDrop),a(e,"touchend",this._onDrop),a(e,"touchcancel",this._onDrop)},_onDrop:function(t){var n=this.el,i=this.options;clearInterval(this._loopId),clearInterval(L.pid),clearTimeout(this._dragStartTimer),a(X,"mousemove",this._onTouchMove),this.nativeDraggable&&(a(X,"drop",this),a(n,"dragstart",this._onDragStart)),this._offUpEvents(),t&&(q&&(t.preventDefault(),!i.dropBubble&&t.stopPropagation()),C&&C.parentNode.removeChild(C),y&&(this.nativeDraggable&&a(y,"dragend",this),d(y),r(y,this.options.ghostClass,!1),r(y,this.options.chosenClass,!1),x!==b?(O=g(y),O>=0&&(c(null,b,"sort",y,x,B,O),c(this,x,"sort",y,x,B,O),c(null,b,"add",y,x,B,O),c(this,x,"remove",y,x,B,O))):(w&&w.parentNode.removeChild(w),y.nextSibling!==S&&(O=g(y),O>=0&&(c(this,x,"update",y,x,B,O),c(this,x,"sort",y,x,B,O)))),e.active&&(null!==O&&-1!==O||(O=B),c(this,x,"end",y,x,B,O),this.save())),x=y=b=C=S=w=T=D=A=I=q=O=_=E=N=e.active=null)},handleEvent:function(e){var t=e.type;"dragover"===t||"dragenter"===t?y&&(this._onDragOver(e),i(e)):"drop"!==t&&"dragend"!==t||this._onDrop(e)},toArray:function(){for(var e,t=[],i=this.el.children,o=0,a=i.length,r=this.options;a>o;o++)e=i[o],n(e,r.draggable,this.el)&&t.push(e.getAttribute(r.dataIdAttr)||p(e));return t},sort:function(e){var t={},i=this.el;this.toArray().forEach(function(e,o){var a=i.children[o];n(a,this.options.draggable,i)&&(t[e]=a)},this),e.forEach(function(e){t[e]&&(i.removeChild(t[e]),i.appendChild(t[e]))})},save:function(){var e=this.options.store;e&&e.set(this)},closest:function(e,t){return n(e,t||this.options.draggable,this.el)},option:function(e,t){var n=this.options;return void 0===t?n[e]:(n[e]=t,void("group"===e&&F(n)))},destroy:function(){var e=this.el;e[H]=null,a(e,"mousedown",this._onTapStart),a(e,"touchstart",this._onTapStart),this.nativeDraggable&&(a(e,"dragover",this),a(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),$.splice($.indexOf(this._onDragOver),1),this._onDrop(),this.el=e=null}},e.utils={on:o,off:a,css:s,find:l,is:function(e,t){return!!n(e,t,e)},extend:m,throttle:v,closest:n,toggleClass:r,index:g},e.create=function(t,n){return new e(t,n)},e.version="1.4.1",e}),function(e,t){function n(t){var n=g(),i=n.querySelector("h2"),o=n.querySelector("p"),a=n.querySelector("button.cancel"),r=n.querySelector("button.confirm");if(i.innerHTML=C(t.title).split("\n").join("<br>"),o.innerHTML=C(t.text||"").split("\n").join("<br>"),t.text&&x(o),T(n.querySelectorAll(".icon")),t.type){for(var s=!1,l=0;l<h.length;l++)if(t.type===h[l]){s=!0;break}if(!s)return e.console.error("Unknown alert type: "+t.type),!1;var c=n.querySelector(".icon."+t.type);switch(x(c),t.type){case"success":y(c,"animate"),y(c.querySelector(".tip"),"animateSuccessTip"),y(c.querySelector(".long"),"animateSuccessLong");break;case"error":y(c,"animateErrorIcon"),y(c.querySelector(".x-mark"),"animateXMark");break;case"warning":y(c,"pulseWarning"),y(c.querySelector(".body"),"pulseWarningIns"),y(c.querySelector(".dot"),"pulseWarningIns")}}if(t.imageUrl){var u=n.querySelector(".icon.custom");u.style.backgroundImage="url("+t.imageUrl+")",x(u);var d=80,f=80;if(t.imageSize){var p=t.imageSize.split("x")[0],v=t.imageSize.split("x")[1];p&&v?(d=p,f=v,u.css({width:p+"px",height:v+"px"})):e.console.error("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+t.imageSize)}u.setAttribute("style",u.getAttribute("style")+"width:"+d+"px; height:"+f+"px")}n.setAttribute("data-has-cancel-button",t.showCancelButton),t.showCancelButton?a.style.display="inline-block":T(a),n.setAttribute("data-has-confirm-button",t.showConfirmButton),t.showConfirmButton?r.style.display="inline-block":T(r),t.cancelButtonText&&(a.innerHTML=C(t.cancelButtonText)),t.confirmButtonText&&(r.innerHTML=C(t.confirmButtonText)),r.className="confirm btn btn-lg",y(n,t.containerClass),y(r,t.confirmButtonClass),y(a,t.cancelButtonClass),y(i,t.titleClass),y(o,t.textClass),n.setAttribute("data-allow-ouside-click",t.allowOutsideClick);var m=!!t.doneFunction;n.setAttribute("data-has-done-function",m),n.setAttribute("data-timer",t.timer)}function i(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function o(){var e=g();E(v(),10),x(e),y(e,"showSweetAlert"),b(e,"hideSweetAlert"),s=t.activeElement;var n=e.querySelector("button.confirm");n.focus(),setTimeout(function(){y(e,"visible")},500);var i=e.getAttribute("data-timer");"null"!==i&&""!==i&&setTimeout(function(){a()},i)}function a(){var n=g();k(v(),5),k(n,5),b(n,"showSweetAlert"),y(n,"hideSweetAlert"),b(n,"visible");var i=n.querySelector(".icon.success");b(i,"animate"),b(i.querySelector(".tip"),"animateSuccessTip"),b(i.querySelector(".long"),"animateSuccessLong");var o=n.querySelector(".icon.error");b(o,"animateErrorIcon"),b(o.querySelector(".x-mark"),"animateXMark");var a=n.querySelector(".icon.warning");b(a,"pulseWarning"),b(a.querySelector(".body"),"pulseWarningIns"),b(a.querySelector(".dot"),"pulseWarningIns"),e.onkeydown=c,t.onclick=l,s&&s.focus(),u=void 0}function r(){var e=g();e.style.marginTop=_(g())}var s,l,c,u,d=".sweet-alert",f=".sweet-overlay",h=["error","warning","info","success"],p={title:"",text:"",type:null,allowOutsideClick:!1,showCancelButton:!1,showConfirmButton:!0,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonClass:"btn-primary",cancelButtonText:"Cancel",cancelButtonClass:"btn-default",containerClass:"",titleClass:"",textClass:"",imageUrl:null,imageSize:null,timer:null},g=function(){return t.querySelector(d)},v=function(){return t.querySelector(f)},m=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},y=function(e,t){t&&!m(e,t)&&(e.className+=" "+t)},b=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(m(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},C=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},w=function(e){e.style.opacity="",e.style.display="block"},x=function(e){if(e&&!e.length)return w(e);for(var t=0;t<e.length;++t)w(e[t])},S=function(e){e.style.opacity="",e.style.display="none"},T=function(e){if(e&&!e.length)return S(e);for(var t=0;t<e.length;++t)S(e[t])},D=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},_=function(e){e.style.left="-9999px",e.style.display="block";var t=e.clientHeight,n=parseInt(getComputedStyle(e).getPropertyValue("padding"),10);return e.style.left="",e.style.display="none","-"+parseInt(t/2+n)+"px"},E=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,i=function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(i,t)};i()}},k=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,i=function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(i,t):e.style.display="none"};i()},B=function(n){if(MouseEvent){var i=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(i)}else if(t.createEvent){var o=t.createEvent("MouseEvents");o.initEvent("click",!1,!1),n.dispatchEvent(o)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},O=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};e.sweetAlertInitialize=function(){var e='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert" tabIndex="-1"><div class="icon error"><span class="x-mark"><span class="line left"></span><span class="line right"></span></span></div><div class="icon warning"> <span class="body"></span> <span class="dot"></span> </div> <div class="icon info"></div> <div class="icon success"> <span class="line tip"></span> <span class="line long"></span> <div class="placeholder"></div> <div class="fix"></div> </div> <div class="icon custom"></div> <h2>Title</h2><p class="lead text-muted">Text</p><p><button class="cancel btn btn-lg" tabIndex="2">Cancel</button> <button class="confirm btn btn-lg" tabIndex="1">OK</button></p></div>',n=t.createElement("div");n.innerHTML=e,t.body.appendChild(n)},e.sweetAlert=e.swal=function(){function s(e){var t=e.keyCode||e.which;if(-1!==[9,13,32,27].indexOf(t)){for(var n=e.target||e.srcElement,i=-1,o=0;o<x.length;o++)if(n===x[o]){i=o;break}9===t?(n=-1===i?C:i===x.length-1?x[0]:x[i+1],O(e),n.focus()):(n=13===t||32===t?-1===i?C:void 0:27!==t||w.hidden||"none"===w.style.display?void 0:w,void 0!==n&&B(n,e))}}function d(e){var t=e.target||e.srcElement,n=e.relatedTarget,i=m(h,"visible");if(i){var o=-1;if(null!==n){for(var a=0;a<x.length;a++)if(n===x[a]){o=a;break}-1===o&&t.focus()}else u=t}}if(void 0===arguments[0])return e.console.error("sweetAlert expects at least 1 attribute!"),!1;var f=i({},p);switch(typeof arguments[0]){case"string":f.title=arguments[0],f.text=arguments[1]||"",f.type=arguments[2]||"",f.confirmButtonClass=f.type?"btn-"+f.type:p.confirmButtonClass;break;case"object":if(void 0===arguments[0].title)return e.console.error('Missing "title" argument!'),!1;f.title=arguments[0].title,f.text=arguments[0].text||p.text,f.type=arguments[0].type||p.type,f.allowOutsideClick=arguments[0].allowOutsideClick||p.allowOutsideClick,f.showCancelButton=void 0!==arguments[0].showCancelButton?arguments[0].showCancelButton:p.showCancelButton,f.showConfirmButton=void 0!==arguments[0].showConfirmButton?arguments[0].showConfirmButton:p.showConfirmButton,f.closeOnConfirm=void 0!==arguments[0].closeOnConfirm?arguments[0].closeOnConfirm:p.closeOnConfirm,f.closeOnCancel=void 0!==arguments[0].closeOnCancel?arguments[0].closeOnCancel:p.closeOnCancel,f.timer=arguments[0].timer||p.timer,f.confirmButtonText=p.showCancelButton?"Confirm":p.confirmButtonText,f.confirmButtonText=arguments[0].confirmButtonText||p.confirmButtonText,f.confirmButtonClass=arguments[0].confirmButtonClass||(arguments[0].type?"btn-"+arguments[0].type:null)||p.confirmButtonClass,f.cancelButtonText=arguments[0].cancelButtonText||p.cancelButtonText,f.cancelButtonClass=arguments[0].cancelButtonClass||p.cancelButtonClass,f.containerClass=arguments[0].containerClass||p.containerClass,f.titleClass=arguments[0].titleClass||p.titleClass,f.textClass=arguments[0].textClass||p.textClass,f.imageUrl=arguments[0].imageUrl||p.imageUrl,f.imageSize=arguments[0].imageSize||p.imageSize,f.doneFunction=arguments[1]||null;break;default:return e.console.error('Unexpected type of argument! Expected "string" or "object", got '+typeof arguments[0]),!1}n(f),r(),o();for(var h=g(),v=function(e){var t=e.target||e.srcElement,n=t.className.indexOf("confirm")>-1,i=m(h,"visible"),o=f.doneFunction&&"true"===h.getAttribute("data-has-done-function");switch(e.type){case"click":if(n&&o&&i)f.doneFunction(!0),f.closeOnConfirm&&a();else if(o&&i){var r=String(f.doneFunction).replace(/\s/g,""),s="function("===r.substring(0,9)&&")"!==r.substring(9,10);s&&f.doneFunction(!1),f.closeOnCancel&&a()}else a()}},y=h.querySelectorAll("button"),b=0;b<y.length;b++)y[b].onclick=v;l=t.onclick,t.onclick=function(e){var t=e.target||e.srcElement,n=h===t,i=D(h,e.target),o=m(h,"visible"),r="true"===h.getAttribute("data-allow-ouside-click");!n&&!i&&o&&r&&a()};var C=h.querySelector("button.confirm"),w=h.querySelector("button.cancel"),x=h.querySelectorAll("button:not([type=hidden])");c=e.onkeydown,e.onkeydown=s,C.onblur=d,w.onblur=d,e.onfocus=function(){e.setTimeout(function(){void 0!==u&&(u.focus(),u=void 0)},0)}},e.swal.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");i(p,e)},e.swal.close=function(){a()},function(){"complete"===t.readyState||"interactive"===t.readyState&&t.body?sweetAlertInitialize():t.addEventListener?t.addEventListener("DOMContentLoaded",function e(){t.removeEventListener("DOMContentLoaded",e,!1),sweetAlertInitialize()},!1):t.attachEvent&&t.attachEvent("onreadystatechange",function n(){"complete"===t.readyState&&(t.detachEvent("onreadystatechange",n),sweetAlertInitialize())})}()}(window,document),$(function(){$(".create-row-button").click(function(e){var e=$(e.target);$.ajax({type:"POST",contentType:"application/x-www-form-urlencoded; charset=utf-8",url:e.data("url"),data:{},success:function(e){$(".main").first().html(e)}})}),$(".update-row-button, .update-row").click(function(e){window.location.href=$(e.target).data("url")}),$(".delete-row-button").on("click",function(e){var e=$(e.target),t=e.parent().parent();swal({title:"Are you sure?",text:"The row will be deleted permanently.",type:"error",confirmButtonClass:"btn-danger",confirmButtonText:"Delete",showCancelButton:!0,cancelButtonText:"Cancel",closeOnConfirm:!0},function(){$.ajax({type:"DELETE",contentType:"application/x-www-form-urlencoded; charset=utf-8",url:e.data("url"),data:{id:e.data("id")},success:function(e){t.is("tr")?t.remove():window.location.href=$.parseJSON(e)}})})});var e=$(".searchable");e.length&&$("#search").hideseek({highlight:!1,nodata:"No results found",list:".searchable",element:"tr"})});