sfHover = function() {
	var sfEls = document.getElementById("navbar").getElementsByTagName("li");
	for (var i=0; i<sfEls.length; i++) {
		sfEls[i].onmouseover=function() {
			this.className+=" hover";
		}
		sfEls[i].onmouseout=function() {
			this.className=this.className.replace(new RegExp(" hover\\b"), "");
		}
	}
}
if (window.attachEvent) window.attachEvent("onload", sfHover);
//ARE WE USING EXPLORER?
var g_isIE = navigator.appName.indexOf("Microsoft")!=-1;
var userAgent = navigator.userAgent.toLowerCase();
var version = parseFloat((userAgent.match( /.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/ ) || [])[1]);
if(g_isIE && version <='7' ){
	var oldIE = true;
}
//ABSTRACTED CONNECT EVENT FUNCTION FOR ANY BROWSER
function connectEvent(element, event, handler) {
	if (g_isIE) {
		element.detachEvent("on" + event, handler);
		element.attachEvent("on" + event, handler);
	} else {
		element.addEventListener(event, handler, false);
	}
}
function activeSections() {
	var section = "home";
	var pathString=window.location.href.split("/");
	if(typeof pathString[3] != "undefined"){
		var section = pathString[3];
		var section = section.replace(".html", "");
		//EXCEPTIOM MAPPING
		if(section == "about-esri"){var section = "company";}
		if(section == "user_showcase"){var section = "industries";}
		if(section == "adpages"){var section = "company";}
		if(section == "aprimoemails"){var section = "company";}
		if(section == "atponly"){var section = "training";}
		if(section == "blogs"){var section = "news";}
		if(section == "cd"){var section = "company";}
		if(section == "censuswatch"){var section = "industries";}
		if(section == "cigt"){var section = "services";}
		if(section == "data"){var section = "products";}
		if(section == "directnews"){var section = "news";}
		if(section == "disaster_response"){var section = "services";}
		if(section == "download"){var section = "products";}
		if(section == "eeap"){var section = "services";}
		if(section == "pss"){var section = "services";}
		if(section == "enewsletters"){var section = "news";}
		if(section == "esripress"){var section = "training";}
		if(section == "federalgsa"){var section = "industries";}
		if(section == "getting_started"){var section = "home";}
		if(section == "getting-started"){var section = "home";}
		if(section == "gisday"){var section = "events";}
		if(section == "grant"){var section = "industries";}
		if(section == "grants"){var section = "industries";}
		if(section == "homepage"){var section = "home";}
		if(section == "htmlemails"){var section = "news";}
		if(section == "htmlform"){var section = "news";}
		if(section == "legal"){var section = "company";}
		if(section == "intldist"){var section = "company";}
		if(section == "industries"){var section = "industries";}
		if(section == "library"){var section = "events";}
		if(section == "mapmuseum"){var section = "home";}
		if(section == "newsletters"){var section = "news";}
		if(section == "partners"){var section = "company";}
		if(section == "showcase"){var section = "industries";}
		if(section == "sag"){var section = "industries";}
		if(section == "site"){var section = "company";}
		if(section == "software"){var section = "products";}
		if(section == "surveys"){var section = "company";}
		if(section == "systemsint"){var section = "services";}
		if(section == "technology-trends"){var section = "home";}
		if(section == "universities"){var section = "industries";}
		if(section == "usersupport"){var section = "company";}
		if(section == "webmaster"){var section = "company";}		
	}
	if(typeof actSection != "undefined"){
		var section = actSection;
	}
	if(typeof section != "undefined"){
		if(document.getElementById(section)){
			document.getElementById(section).setAttribute((oldIE ? 'className' : 'class'), "on");
		} else {
			document.getElementById("home").setAttribute((oldIE ? 'className' : 'class'), "on");
		}
	}
	var myfilename=window.location.href.replace("http://","");
	var myfilename=myfilename.replace(pathString[2],"");
	if(myfilename == ""){
		var myfilename = "index.html";
	}
	// Gets all <a> tags in html
	// var links = document.getElementsByTagName("A"); // removed due to incompatibility with productsmenu.js
	// Gets only <a> tags in id #navbar div
	var links = document.getElementById('navbar').getElementsByTagName("a");
	for ( i=0; i < links.length; i++ ) {
		if(links[i].getAttribute('href') == myfilename || links[i].getAttribute("href",2) == myfilename) {
			links[i].setAttribute(( oldIE ? 'className' : 'class'), "on");
		}
	}
}
connectEvent(window, "load", activeSections);
/**
 * Fixes the xhtml strict lack of target attribute on links.
 * 
 * Usage:
 * Add the class "blankTarget" to your link and this script will open the link in a new window.
 * <a href="someLocation.html"  title="Some Title">Popup</a>  
 * 
 */
function showPopup() {
  var popup = window.open(this.href, "popup", "status=1,toolbar=1,location=1,menubar=1,scrollbars=1,resizable=1");
  return false;
}
function blankTargetLinks() {
	if (!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName("a");
	for (var i=0; i<anchors.length; i++) {
		var anchor = anchors[i];
		if (anchor.getAttribute("href")) {
			var external = /window/;
			if (anchor.getAttribute("rel")) {
				var classValue = anchor.getAttribute("rel");
			}
			else{
				var classValue = anchor.getAttribute("rel");
			}
			if (external.test(classValue)) {
				anchor.onclick = showPopup;
			}
		}
	}
}
connectEvent(window, "load", blankTargetLinks);