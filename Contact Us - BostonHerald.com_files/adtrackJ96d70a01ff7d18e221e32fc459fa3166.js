var allScripts=document.getElementsByTagName("script"),currScript=allScripts[allScripts.length-1],currSrc=currScript.src||"",srcHasProtocol=currSrc.indexOf("://")>0,protocol=window.PubMatic&&window.PubMatic.secure===false?window.PubMatic.protocol||"":"",secure=false;if(!protocol){if(srcHasProtocol){protocol=currSrc.indexOf("https://")==0?"https:":"http:"}else{if(!currSrc&&window.PubMatic&&window.PubMatic.protocol){protocol=PubMatic.protocol}else{protocol=document.location.protocol!="https:"?"http:":"https:"}}secure=protocol=="https:";if(!secure||!window.PubMatic){window.PubMatic={protocol:protocol,secure:secure}}}var komli_base_j=protocol+(secure?"//strack.pubmatic.com/AdServer":"//track.pubmatic.com/AdServer");var komliad_pubmatic_url_j=protocol+"//www.pubmatic.com/publisherreferral.html";var ktrack_init_t=new function(){if(typeof window.komliad_init_done=="undefined"){window.komliad_init_done=0}};var BrowserDetect_j={init:function(){this.browser=this.searchString(this.dataBrowser)||"An unknown browser";this.version=this.searchVersion(navigator.userAgent)||this.searchVersion(navigator.appVersion)||"an unknown version";this.OS=this.searchString(this.dataOS)||"an unknown OS"},searchString:function(d){for(var a=0;a<d.length;a++){var b=d[a].string;var c=d[a].prop;this.versionSearchString=d[a].versionSearch||d[a].identity;if(b){if(b.indexOf(d[a].subString)!=-1){return d[a].identity}}else{if(c){return d[a].identity}}}},searchVersion:function(b){var a=b.indexOf(this.versionSearchString);if(a==-1){return}return parseFloat(b.substring(a+this.versionSearchString.length+1))},dataBrowser:[{string:navigator.userAgent,subString:"OmniWeb",versionSearch:"OmniWeb/",identity:"OmniWeb"},{string:navigator.vendor,subString:"Apple",identity:"Safari"},{prop:window.opera,identity:"Opera"},{string:navigator.vendor,subString:"iCab",identity:"iCab"},{string:navigator.vendor,subString:"KDE",identity:"Konqueror"},{string:navigator.userAgent,subString:"Firefox",identity:"Firefox"},{string:navigator.vendor,subString:"Camino",identity:"Camino"},{string:navigator.userAgent,subString:"Netscape",identity:"Netscape"},{string:navigator.userAgent,subString:"MSIE",identity:"Explorer",versionSearch:"MSIE"},{string:navigator.userAgent,subString:"Gecko",identity:"Mozilla",versionSearch:"rv"},{string:navigator.userAgent,subString:"Mozilla",identity:"Netscape",versionSearch:"Mozilla"}],dataOS:[{string:navigator.platform,subString:"Win",identity:"Windows"},{string:navigator.platform,subString:"Mac",identity:"Mac"},{string:navigator.platform,subString:"Linux",identity:"Linux"}]};if(typeof window.addEventListener!="undefined"){window.addEventListener("load",clicktrack_init_j,false)}else{if(typeof document.addEventListener!="undefined"){document.addEventListener("load",clicktrack_init_j,false)}else{if(typeof window.attachEvent!="undefined"){window.attachEvent("onload",clicktrack_init_j)}else{if(typeof window.onload=="function"){var existing=onload;window.onload=function(){existing();clicktrack_init_j()}}else{window.onload=clicktrack_init_j}}}}function pm_addEventListener_j(c,b,d,a){if(c.addEventListener){c.addEventListener(b,d,a)}else{if(c.attachEvent){c.attachEvent("on"+b,d,a)}else{c["on"+b]=d}}}var _pmal=new Array();function pm_get_adlist(){var o=document.getElementsByTagName("div");var a=0;for(i=0;i<o.length;i++){if(typeof o[i].id!="undefined"){if(o[i].id.indexOf("k_adsbeacon")>-1){var n=o[i].attributes.length;var b=0;var p=0;var f="";for(var g=0;g<n;g++){if(o[i].attributes[g].name.toString()=="kadwidth"){b=o[i].attributes[g].value}if(o[i].attributes[g].name.toString()=="kadheight"){p=o[i].attributes[g].value}if(o[i].attributes[g].name.toString()=="pid"){lpid=o[i].attributes[g].value}if(o[i].attributes[g].name.toString()=="rec"){f=o[i].attributes[g].value}}var d=new Array();var m=document.getElementsByTagName("div");for(var e=0;e<m.length;e++){if(typeof m[e].id!="undefined"){if(m[e].id.indexOf(f)>-1){var h=m[e].attributes.length;for(var c=0;c<h;c++){if(m[e].attributes[c].name.toString()=="clickdata"){d.clickdata=m[e].attributes[c].value;break}}}}}d.fname=f;d.pid=lpid;d.height=p;d.width=b;d.left=findX_j(o[i]);d.top=findY_j(o[i]);d.div=o[i];_pmal[a]=d;a=a+1}}}}function clicktrack_init_j(){BrowserDetect_j.init();if(pubId!="undefined"){if(pubId==8597){return}}pm_get_adlist();if(BrowserDetect_j.browser.toString()=="Explorer"){pm_addEventListener_j(window,"beforeunload",doPageExit_j,false);pm_addEventListener_j(document.body,"mousemove",getCoordinates_j,false)}else{pm_addEventListener_j(window,"unload",doPageExit_j,false);pm_addEventListener_j(window,"mousemove",getCoordinates_j,true)}}var px_t;var py_t;function getCoordinates_j(b){if(!b){var b=window.event}var c=0;try{if(BrowserDetect_j.browser.toString()!="Explorer"){c=0}else{c=1}}catch(a){c=0}if(c==0){px_t=b.pageX;py_t=b.pageY}else{px_t=window.event.offsetX;py_t=window.event.offsetY}}function findY_j(a){var b=0;while(a){b+=a.offsetTop;a=a.offsetParent}return(b)}function findX_j(b){var a=0;while(b){a+=b.offsetLeft;b=b.offsetParent}return(a)}var counter=0;function doPageExit_j(){for(var h=0;h<_pmal.length;h++){var c=_pmal[h];var a=c.width;var o=c.height;var e=c.fname;var f=c.clickdata;var l="";var b="";if(c.div){l=findX_j(c.div);b=findY_j(c.div)}else{l=c.left;b=c.top}var m=((px_t>(l-5))&&(px_t<(parseInt(l)+parseInt(a)+5)));var k=((py_t>(b-5))&&(py_t<(parseInt(b)+parseInt(o)+3)));if(k&&m){var j=komli_base_j+"/AdDisplayTrackerServlet?";var g="AAA";j=j+"operId=3";j=j+"&frameName="+e;j=j+"&clickData="+f;var d=document.createElement("img");d.setAttribute("height",0);d.setAttribute("width",0);d.setAttribute("src",j);d.setAttribute("hspace","0");d.setAttribute("vspace","0");var n=document.getElementsByTagName("body")[0];n.appendChild(d);m_pse_t(900)}}}function m_pse_t(b){var a=new Date();var c=a.getTime()+b;while(true){a=new Date();if(a.getTime()>c){return}}}function addPubMaticNoteToAllAds_j(){for(var a=0;a<_pmal.length;a++){var b=_pmal[a];addPubMaticNote(b.div,b.height,b.width,b.pid)}}function addPubMaticNote_j(g,f,b,e){var d=findX_j(g);var a=findY_j(g);var h=parseInt(d)+parseInt(b);var c=parseInt(a)+parseInt(f);showtip_j(h-115,c-1,e)}function trackNote_j(d){var c=Math.random();var b=komliad_base+"/AdDisplayTrackerServlet?operId=2&activityId=1&activityParam="+d+"&opString="+c;var a=document.createElement("img");a.setAttribute("id","pmsgbeacon");a.setAttribute("height","0");a.setAttribute("width","0");a.setAttribute("hspace","0");a.setAttribute("vspace","0");a.setAttribute("src",b);document.body.appendChild(a)}function showtip_j(b,f,d){var a="Ads optimized by PubMatic";var e=document.createElement("div");var c="pubmaticMessageDiv";e.setAttribute("id",c);e.innerHTML='<a href="'+komliad_pubmatic_url_j+'" style="font-weight: normal; text-decoration: underline; font-family: Arial, Helvetica, sans-serif; font-size:9px" onclick="javascript:trackNote_j('+d+')">'+a+"</a>";e.style.top=f+"px";e.style.left=b+"px";e.style.display="block";e.style.zIndex=0;e.style.position="absolute";e.style.height="5px";e.style.margin="0px 0px 0px 0px";e.style.width="120px";document.body.appendChild(e)}function ObjectSourceStr_j(b){if(b.length>1){this.q=b.substring(1,b.length)}else{this.q=null}this.keyValuePairs=new Array();if(b){for(var a=0;a<this.q.split("&").length;a++){this.keyValuePairs[a]=this.q.split("&")[a]}}this.getKeyValuePairs=function(){return this.keyValuePairs};this.getValue=function(d){for(var c=0;c<this.keyValuePairs.length;c++){if(this.keyValuePairs[c].split("=")[0]==d){return this.keyValuePairs[c].split("=")[1]}}return false};this.getParameters=function(){var c=new Array(this.getLength());for(var d=0;d<this.keyValuePairs.length;d++){c[d]=this.keyValuePairs[d].split("=")[0]}return c};this.getLength=function(){return this.keyValuePairs.length}}function SourceStrParam_j(b,a){var c=new ObjectSourceStr_j(b);return unescape(c.getValue(a))}function isIgnored_j(c){var b=msg_ignore_list_j.length;for(var a=0;a<b;a++){if(c==msg_ignore_list_j[a]){return true}}return false}var msg_ignore_list_j=[0,3144,4773,5016,5159,5296,5302,533,5669,3324,5987,5785,4891,6917,1508,6883,5568,6846,6539,7580,7312,8257,7372,5211,6508,3820,8992,10267,9938,9011,1765,11204,10777,12106,8855,8984,8597,14878,15023,13071,15685,15900,11491,8717,13082,17790,9549,17452,5354,17410,16437,19953,21864,16237,22120,8654,8682,22933,19451,23583,10937,14358];