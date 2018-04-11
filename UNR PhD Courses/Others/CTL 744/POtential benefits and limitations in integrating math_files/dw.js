
var DW={hasClass:function(element,className){var classes=element.className.split(/\s+/);for(var i=0;i<classes.length;i++){if(classes[i]==className){return true;}}
return false;},delay:function(t){var now=new Date();var cur=null;do{var cur=new Date();}while(cur-now<t);},getCookie:function(name){var start=document.cookie.indexOf(name+"=");var len=start+name.length+1;if((!start)&&(name!=document.cookie.substring(0,name.length))){return null;}
if(start==-1)return null;var end=document.cookie.indexOf(';',len);if(end==-1)end=document.cookie.length;return unescape(document.cookie.substring(len,end));},addEvent:function(elm,evType,fn,useCapture){if(elm.addEventListener){elm.addEventListener(evType,fn,useCapture);return true;}
else if(elm.attachEvent){var r=elm.attachEvent('on'+evType,fn);return r;}
else{elm['on'+evType]=fn;}},mergeParams:function(){var to={};for(var i=0;i<arguments.length;i++){var obj=arguments[i]
for(var p in obj){if(obj.hasOwnProperty&&obj.hasOwnProperty(p)){to[p.toLowerCase()]=obj[p];}}}
return to;},findLinkObject:function(obj){for(var j=0;j<=5;j++){if(obj&&obj.nodeName.toUpperCase()=='A'){return obj;}
if(!obj.parentNode){return null;}
obj=obj.parentNode;}
return null;},click:function(e,cb){if(!e)e=window.event
var tg=DW.findLinkObject(e.target||e.srcElement);if(tg){cb(tg);}},hasTagParam:function(link){return link.search.match(/(\?|&)tag=/)!=null},ignoreClick:function(link){var hrefAttr=link.getAttribute('href');if(hrefAttr.charAt(0)=='#'||hrefAttr.match(/^javascript/)){return true;}
if(DW.ignoreDomains){for(var i=0;i<DW.ignoreDomains.length;i++){if(link.href.match(DW.ignoreDomains[i])){return true;}}}
return false;},findSection:function(obj){for(var j=0;j<=5;j++){if(obj&&obj.nodeName.toUpperCase()=='DIV'&&obj.getAttribute("section")){return obj.getAttribute("section");}
if(obj&&obj.nodeName.toUpperCase()=='DIV'&&DW.hasClass(obj,"section")){return obj.id;}
if(!obj.parentNode){return null;}
obj=obj.parentNode;}
return null;},defaultClickHandler:function(link){if(DW.ignoreClick(link)){return;}
var section=DW.findSection(link);if(DW.hasTagParam(link)){return;}else{redirUrl=section?DW.redir({tag:section}):DW.redir();}},trackClicks:function(clickHandler){DW.addEvent(document.body,"click",function(e){DW.click(e,clickHandler||DW.defaultClickHandler)},false);DW.addEvent(document.body,"contextmenu",function(e){DW.click(e,clickHandler||DW.defaultClickHandler)},false);},redir:function(additionalParams){var params=this.mergeParams(DW.pageParams,additionalParams);d=new Date();params.ts=d.getTime();params.desturl="http://img.com.com/b.gif";var img=new Image(1,1);img.src=DW.buildUrl(DW.redirPath,DW.toQueryString(params));return params;},parseReferrerUrl:function(referrer){var questionMark=referrer.indexOf('?');var params={};if(questionMark!=-1){params.xref=referrer.substring(0,questionMark);params.xrq=referrer.substring(questionMark+1);}else{params.xref=referrer;}
return params;},parseUrsCookie:function(cookieValue){var parts=cookieValue.split("!",4);var params={};if(parts[0]){var regId=parts[0].substring(40);params.ursuid=regId;}
if(parts[1]){var realm=parseInt(parts[1],16);if(!isNaN(realm)&&(realm&(1<<9))!=0){params.ursclc=1;}}
return params;},clear:function(additionalParams){var params=this.mergeParams(DW.pageParams,additionalParams);d=new Date();params.ts=d.getTime();if(!params.sid){params.sid=params.siteid;delete params.siteid;}
if(window.location.host){if(!params.ld){params.ld=window.location.host;}
if(!params.clgf){params.clgf=DW.getCookie("XCLGFbrowser");}
if(!params.globid){params.globid=DW.getCookie("globid");}}
if(!params.xref&&document.referrer){var xParams=DW.parseReferrerUrl(document.referrer);for(var p in xParams){if(!params[p]){params[p]=xParams[p];}}}
if(DW.regSilo){var pursCookie=DW.getCookie("purs_"+DW.regSilo);if(pursCookie){var ursParams=DW.parseUrsCookie(pursCookie);for(var p in ursParams){if(!params[p]){params[p]=ursParams[p];}}}}
var src=DW.buildUrl(DW.clearPath,DW.toQueryString(params));var img=new Image(1,1);img.src=src;img.onload=function(){DW.dwVoid();}
return src;},buildUrl:function(path,queryString){return DW.protocol+"//"+DW.host+path+"?"+queryString;},toQueryString:function(params){var qs="";var first=true;for(var p in params){val=params[p];if(val){if(!first)qs+="&";qs+=p+"="+encodeURIComponent(val);first=false;}}
return qs;},dwVoid:function(){return;}};DW.protocol="http:";if(window.location.protocol=="https:"){DW.protocol="https:";}
DW.ignoreDomains=[/adlog\.com\.com/,/dw\.com\.com/,/chkpt\.zdnet\.com/];DW.host="dw.com.com";DW.clearPath="/clear/c.gif";DW.redirPath="/redir";