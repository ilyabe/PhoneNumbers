
//---------------------------------------------------------------
function IEHoverPseudo() {
//---------------------------------------------------------------
 if(!$('subNavContainer')) { return false; }
 
 var navItems = $('subNavContainer').getElementsByTagName("li");
 for (var i=0; i<navItems.length; i++) {
  if(navItems[i].className == "SubNavMain") { 
   navItems[i].onmouseover=function() {
      this.className += " over";
   
      }
   navItems[i].onmouseout=function() { this.className = "SubNavMain"; }
  }
 }
}
//---------------------------------------------------------------
function getURLvar(name) {
//---------------------------------------------------------------
   var rs = "";
   var qparts = location.href.split("?");
   if (qparts.length > 1) {
       var vars = qparts[1].split("&");
       for (var i=0; (i < vars.length) && (rs.length == 0); i++) {
           var parts = vars[i].split("=");
           if (parts[0] == name ) rs = parts[1];
       }
   }
return rs;
}
//---------------------------------------------------------------
function checkScript() {
//---------------------------------------------------------------
  for (i=1; i<13; i++) {
	if ($('choice_'+i)) {
	  if ($('choice_'+i).checked) {
		var status = $('choice_'+i).value;
		break;
	  }
	}
  }
  if (!status) { return false; } 
}
	  
//---------------------------------------------------------------
//Adds additional onload events to the window.
function addLoadEvent(func) {
//---------------------------------------------------------------
	var oldonload = window.onload;
	if(typeof window.onload != 'function')
		window.onload = func;
	else
	{

		window.onload = function()
		{
			oldonload();
			func();
		}
	}
}
   


var blog_id = 0;
var strUserAgent = new String(navigator.userAgent);
var arrUA = strUserAgent.split("MSIE ");
var browserValue = parseFloat(arrUA[1]);

var cssProperty = "<style type='text/css'>";
if (navigator.userAgent.indexOf('MSIE') != -1 && browserValue >= 7){
cssProperty += "#section-nav li.sfhover ul { display: block; }";
}
else {
	cssProperty += "#section-nav li:hover ul, #section-nav li.sfhover ul { display: block; }";
}
cssProperty += "</style>";

document.write(cssProperty);


/* DEAL WITH FLASHING BACKGROUND IMAGES IN IE6 */

fixFlashingBackground= function() {
    try {
        if(document.execCommand && navigator.userAgent.indexOf('MSIE') > 0) {
            document.execCommand("BackgroundImageCache", false, true);
        }
    } catch(err) {}
}

sfHover = function() {
	try {
		var navUL = document.getElementById("section-nav");
		
		if(navUL) {
			
			var sfEls = document.getElementById("section-nav").getElementsByTagName("li");
	
			for(var i=0; i < sfEls.length; i++) {
				sfEls[i].onmouseover = function() {
					this.className += " sfhover";
				}
				sfEls[i].onmouseout=function() {
					this.className = this.className.replace(new RegExp(" sfhover\\b"), "");
				}
			}
		}
	}
	catch(err) { }
}

//if (window.attachEvent) window.attachEvent("onload", sfHover);
//Above line of code not compatible with all browsers.
addLoadEvent(sfHover);

navhideflash = function(showhide) {
	if (navigator.userAgent.indexOf('Safari') != -1 ||
	    navigator.userAgent.indexOf('Ubuntu') != -1) {
		if (showhide == "hide") {
			if (document.getElementById('AdRightSideDiv')) {
			  document.getElementById('AdRightSideDiv').style.visibility='hidden';
                        }
			if (document.getElementById('contentAreaSubLeft')) {
		 	  document.getElementById('contentAreaSubLeft').style.visibility='hidden';
			}
		}
		if (showhide == "show") {
			if (document.getElementById('AdRightSideDiv')) {
			  document.getElementById('AdRightSideDiv').style.visibility='visible';
			}
			if (document.getElementById('contentAreaSubLeft')) {
			  document.getElementById('contentAreaSubLeft').style.visibility='visible';
			}
		}
	}
}//fx



// Subnav?

var link_base = '/EN-US/';
    window.onload=function() {
      IEHoverPseudo();
      var c = document.cookie;
      var cArray = c.split(';');
      var found = ''; 
      var newCookie = '';
      for (var i=0; i < cArray.length; i++) {// >
         if (cArray[i].indexOf('imgCount=') > -1) {
            found = cArray[i].substr(cArray[i].indexOf('=') + 1); 
         } else {
            newCookie += cArray[i] + ";"
         }
      }


    }
