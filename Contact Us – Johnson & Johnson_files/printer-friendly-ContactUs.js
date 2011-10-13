
//This script is used in all templates for the print function
function openTemplatePrintBox() { /* this function opens up a printer friendly version of the page */
var width = 800;
var height = 600;
var left = parseInt((screen.availWidth/2) - (width/2));
var top = parseInt((screen.availHeight/2) - (height/2));
var windowFeatures = "width=" + width + ",height=520  ,status=no,toolbar=0,location=0,menubar=1,directories=0,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
pWin = window.open("","printWindow",windowFeatures);
var d = pWin.document;
d.open("text/html");
d.writeln("<html><head>");

if(document.getElementById("title"))
{

 d.writeln("<title>");
 d.writeln(document.getElementById("title").innerHTML);
 d.writeln("</title>");
}

d.writeln("<script language=\"javascript\">");
d.writeln("var targ=\"\";");
d.writeln("if (window.captureEvents){");
d.writeln("window.captureEvents(Event.CLICK);");
d.writeln("window.onclick=handle;}");
d.writeln("else document.onclick=handle;");

d.writeln("function handle(e) {");
  d.writeln("if (!e){");
  d.writeln("var e=window.event;");
  d.writeln("}");
d.writeln("if (e.target)  {");
  d.writeln("targ=e.target;");
  d.writeln("}");
d.writeln("else if (e.srcElement)");
  d.writeln("{");
  d.writeln("targ=e.srcElement;");
  d.writeln("}");
d.writeln("if (targ.nodeType==3)");
  d.writeln("{");
  d.writeln("targ = targ.parentNode;");
  d.writeln("}");
  d.writeln("var tname;");
  d.writeln("tname=targ.tagName;");
  d.writeln("if(\"javascript:window.print()\"==targ){");
  d.writeln(" return true; }");
  d.writeln(" else  return false;");
d.writeln("}");

d.writeln("function checkEnterConTuctUs(e){}");
d.writeln("function errorSubject(){}");
d.writeln("function errorCountry(){}");
d.writeln("function errorFirstName(){}");
d.writeln("function errorLastName(){}");
d.writeln("function errorEmailAddr(){}");
d.writeln("function errorErrMessage(){}");
d.writeln("function goSubmit(){}");



d.writeln("</script>");

var browser = navigator.appName;
var version = navigator.appVersion;
<!-- For IE 6.0 or Mozilla or Safari or IE 8.0-->
if (version.indexOf("MSIE 6.0") != -1 || browser == "Netscape" || version.indexOf("MSIE 8.0") != -1) {
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer.css\" type=\"text/css\" rel=\"stylesheet\">");
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-frinedly-social.css\" type=\"text/css\" rel=\"stylesheet\">");
	} 
<!-- Only for IE 7.0 -->
else if (version.indexOf("MSIE 7.0") != -1) {
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-ie7.css\" type=\"text/css\" rel=\"stylesheet\">");
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-frinedly-socialIE7.css\" type=\"text/css\" rel=\"stylesheet\">");
	}
//d.writeln("<script type=\"text/javascript\"> function call(){alert(\"hi\")} </script>"); 

d.writeln("</head><body>");

d.writeln("<div id=\"container\">");
d.writeln("<div id=\"toolscontainer\">");
  d.writeln("<ul id=\"toollist\">");
    d.writeln("<li><a style=\"BACKGROUND-IMAGE: url(/wps/wcm/jsp/images/content/printerfriendly-icon.gif) ;BACKGROUND-POSITION: left top; PADDING-left: 20px; BACKGROUND-REPEAT: no-repeat\" href=\"javascript:window.print()\"> Print</a> </li>");
  d.writeln("</ul>");
d.writeln("</div>");

d.writeln("<div id=\"headerNav\">");
d.writeln(" <ul id=\"globalnav\"> " + 
   "  <li>Employees</li>" + 
   "  <li>Careers</li>" + 
    " <li>Investors</li>" + 
    " <li>News</li>" + 
   "  <li>Partners</li>" + 
   "  <li>Contact Us</li>" + 
  " </ul>");
 d.writeln("</div>");

d.writeln("<div id=\"leadstory-print\">");
d.writeln("<img src=\"/wps/wcm/jsp/images/home/jnj-logo.gif\" width=\"650\" height=\"100\">");
d.writeln("</div>");


if(document.getElementById("faqContainer"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("faqContainer").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("midcontainer_sm"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer_sm").innerHTML);
 d.writeln("</div>");
}


if(document.getElementById("midcontainer_ci"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer_ci").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("midcontainer"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("leadstorytext"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("leadstorytext").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("midcontainer_ci_text"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer_ci_text").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("footerNav"))
{
 d.writeln("<div id=\"footerNav\">");
 d.writeln(document.getElementById("footerNav").innerHTML);
 d.writeln("</div>");
}



if(document.getElementById("footer"))
{
 d.writeln("<div id=\"footer\">");
 d.writeln(document.getElementById("footer").innerHTML);
 d.writeln("</div>");
}
d.writeln("</div>");

 
d.writeln("</body></html>\n");
d.close();
}
function openTemplatePrintBoxTextOnly() { /* this function opens up a printer friendly version of the page */

              var width = 800;
		var height = 600;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var windowFeatures = "width=" + width + ",height=520,status=no,toolbar=0,location=0,menubar=1,directories=0,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
pWin = window.open("","printWindow", windowFeatures);



var d = pWin.document;
d.open("text/html");
d.writeln("<html><head>");
if(document.getElementById("title"))
{
 d.writeln("<title>");
 d.writeln(document.getElementById("title").innerHTML);
 d.writeln("</title>");
}

d.writeln("<script language=\"javascript\">");
d.writeln("var targ=\"\";");
d.writeln("if (window.captureEvents){");
d.writeln("window.captureEvents(Event.CLICK);");
d.writeln("window.onclick=handle;}");
d.writeln("else document.onclick=handle;");

d.writeln("function handle(e) {");
  d.writeln("if (!e){");
  d.writeln("var e=window.event;");
  d.writeln("}");
d.writeln("if (e.target)  {");
  d.writeln("targ=e.target;");
  d.writeln("}");
d.writeln("else if (e.srcElement)");
  d.writeln("{");
  d.writeln("targ=e.srcElement;");
  d.writeln("}");
d.writeln("if (targ.nodeType==3)");
  d.writeln("{");
  d.writeln("targ = targ.parentNode;");
  d.writeln("}");
  d.writeln("var tname;");
  d.writeln("tname=targ.tagName;");
  d.writeln("if(\"javascript:window.print()\"==targ){");
d.writeln(" return true; }");
d.writeln(" else  return false;");
d.writeln("}");

d.writeln("function checkEnterConTuctUs(e){}");
d.writeln("function errorSubject(){}");
d.writeln("function errorCountry(){}");
d.writeln("function errorFirstName(){}");
d.writeln("function errorLastName(){}");
d.writeln("function errorEmailAddr(){}");
d.writeln("function errorErrMessage(){}");
d.writeln("function goSubmit(){}");

d.writeln("</script>");

var browser = navigator.appName;
var version = navigator.appVersion;
<!-- For IE 6.0 or Mozilla or Safari -->
if (version.indexOf("MSIE 6.0") != -1 || browser == "Netscape") {
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer.css\" type=\"text/css\" rel=\"stylesheet\">");
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-frinedly-social.css\" type=\"text/css\" rel=\"stylesheet\">");
	} 
<!-- Only for IE 7.0 -->
else if (version.indexOf("MSIE 7.0") != -1) {
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-ie7.css\" type=\"text/css\" rel=\"stylesheet\">");
	d.writeln("<link media=all href=\"/wps/wcm/jsp/css/printer-frinedly-socialIE7.css\" type=\"text/css\" rel=\"stylesheet\">");
	}



d.writeln("</head><body>");

d.writeln("<div id=\"container\">");
d.writeln("<div id=\"headerNav\">");
d.writeln(" <ul id=\"globalnav\"> " + 
   "  <li>Employees</li>" + 
   "  <li>Careers</li>" + 
    " <li>Investors</li>" + 
    " <li>News</li>" + 
   "  <li>Partners</li>" + 
   "  <li>Contact Us</li>" + 
  " </ul>");
 d.writeln("</div>");
d.writeln("<br>");
d.writeln("<div id=\"toolscontainertext\">");
  d.writeln("<ul id=\"toollisttext\">");
    d.writeln("<li><a href=\"javascript:window.print()\"> Print</a> </li>");
  d.writeln("</ul>");
d.writeln("</div>");


d.writeln("<div class=\"line_ci_text\"></div>");
d.writeln("<div id=\"logo\">Johnson & Johnson</div>");

 
d.writeln("<ul id=\"subnav_text\">");
  d.writeln("<li><a>Home</a></li>");
    
    d.writeln("<li><a>Our Products</a></li>");
    d.writeln("<li><a>Our Caring</a></li>");
    d.writeln("<li><a>Our Company</a></li>");
  d.writeln("</ul>");





d.writeln("<div class=\"line_ci_text\"></div>");
d.writeln("<br>");

if(document.getElementById("midcontainer_ci"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer_ci").innerHTML);
 d.writeln("</div>");
}
else if(document.getElementById("midcontainer_ci_text"))
{
 d.writeln("<div id=\"midcontainer_ci_text\">");
 d.writeln(document.getElementById("midcontainer_ci_text").innerHTML);
 d.writeln("</div>");
}

if(document.getElementById("footerNav"))
{
 d.writeln("<div id=\"footerNav\">");
 d.writeln(document.getElementById("footerNav").innerHTML);
 d.writeln("</div>");
}


if(document.getElementById("footer"))
{
 d.writeln("<div id=\"footer\">");
 d.writeln(document.getElementById("footer").innerHTML);
 d.writeln("</div>");
}

d.writeln("</div>");
d.writeln("</body></html>\n");
d.close();
}




