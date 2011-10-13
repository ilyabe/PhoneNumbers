
function setNonFlashSession(){
	
       var urlVal=document.getElementById("urlValue").value;
       var queryString=location.search;
       if(queryString!="")
       urlVal=urlVal+queryString; 
       location.href="/wps/wcm/jsp/flash/navigation/nonFlashSessionVal.jsp?url="+urlVal;

}


function nonFlashNavigationDisplay()
{

	var imgName = document.getElementById("imgName").value;
	var htmlString = "";
	var htmlMediaMap = "";

	var browser=navigator.appName;
	

	if(document.getElementById("flashContent-navigation"))
	{
		if(document.getElementById("masthead_image")){
			//htmlString = document.getElementById("masthead_image").innerHTML;
			document.getElementById("masthead_image").style.display = 'block';

		
		}

	 	htmlString += "<div id=\"leadstory-nonflash\" style=\"background:url(/wps/wcm/jsp/flash/navigation/images/"+imgName+".jpg) center top no-repeat;\">";
		
		if(document.getElementById("leadstory-nonflash")){
		document.getElementById("leadstory-nonflash").style.display = 'block';

		}


		htmlString += "</div>";
		document.getElementById("flashContent-navigation").style.display = 'none';
	}
	
}	

function nonFlashDisplayHome()
{

	var htmlString = "";
	var browser=navigator.appName;
	//document.location.href="/wps/wcm/connect/jnj.com+development/Development/Home/home?presentationtemplate=nonflash" ;
	//location.replace("/wps/wcm/connect/jnj.com+development/Development/Home/home?presentationtemplate=nonflash");
         location.replace("/connect/home?presentationtemplate=nonflash");

}	



//function detectFlash()
//{
//	if(!FlashDetect.installed){
//		if(document.getElementById("flashSessionVal").value=="true"){
//			nonFlashNavigationDisplay();
//		}else {
//		
//		      var legal_text = "<div style='padding:10px;align:justify;'>This site requires Flash 8 or newer. \n Click on Get Macromedia Flash button to download //Flash player now.\n For non-flash version of this site click Continue without Flash</div>";
//			Dialog.confirm(legal_text, {width:310, height:100, className: "mac_os_x",okLabel: "", buttonClass: "aClass", id: "aId", cancel:function(win) ////{setNonFlashSession();}, ok:function(win) {downloadFlash();return true;}});
//		}
//	}
//}

function detectFlash()
{
	if(!FlashDetect.installed){
		if(document.getElementById("flashSessionVal").value=="true"){
			nonFlashNavigationDisplay();
		}else {
		
		      nonFlashDisplayHome();

		}
	}
}

function detectFlashHome()
{
	if(!FlashDetect.installed){
		if(document.getElementById("flashSessionVal").value=="true"){
			nonFlashDisplayHome();
			
		}else {
			nonFlashDisplayHome();
		}
	}
}



//function detectFlashHome()
//{
//	if(!FlashDetect.installed){
//		if(document.getElementById("flashSessionVal").value=="true"){
//			nonFlashDisplayHome();
			
//		}else {
//			var legal_text = "<div style='padding:10px;align:justify;'>This site requires Flash 8 or newer. \n Click on Get //Macromedia Flash button to download Flash player now.\n For non-flash version of this site click Continue without Flash</div>";
//			Dialog.confirm(legal_text, {width:310, height:100, className: "mac_os_x",okLabel: "", buttonClass: "aClass", id: "aId", //cancel:function(win) {setNonFlashSession();}, ok:function(win) {downloadFlash();return true;}});
//		}
//	}
//}



function detectBrowser()
{
				var browser=navigator.appName;
				if (browser == "Microsoft Internet Explorer") {
					
					document.write('<a href=\"/wps/wcm/connect/jnj.com development/development/\"><div style=\"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=/wps/wcm/jsp/images/common/jnj-logo.png); cursor:pointer;width:255px; height:100px;\"></div></a>');
				} else {
					
					document.write('<a href=\"/wps/wcm/myconnect/JnJ.Com Development/development/\"><div style=\"background:url(/wps/wcm/jsp/images/common/jnj-logo.png) no-repeat; cursor:pointer; width:255px; height:100px;\"></div></a>');
				}


	
}




function applyPrimaryItemColorNonFlash(id)
{
  
    if(document.getElementById(id))
    {
    	document.getElementById(id).style.color="#12c2e9";
      document.getElementById(id).style.cursor="none";
    }
  
}

function downloadFlash()
{
	window.location.href = "http://www.macromedia.com/go/getflash/";
}