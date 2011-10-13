var searchBoxInnerHTML = "";
var searchBoxTextInnerHTML = "";

function onloadClick(){
	

	if(searchBoxInnerHTML == ""){
		searchBoxInnerHTML = document.getElementById("search_box").innerHTML;	
	}

	if(searchBoxTextInnerHTML == ""){
		searchBoxTextInnerHTML = document.getElementById("search_box_text").innerHTML;
	}


	if(document.getElementById("txtOnlyVal").value=="true"){
		setTextOnlyDivBlock();
	}else {
		setTextOnlyDivNone();
	}
	

		if(document.getElementById("nonFlashMedia").value=="true"){
			if(document.getElementById("media-nonflash")){
				document.getElementById("media-nonflash").style.display = 'block';
			}
			if(document.getElementById("media-flash")){
				document.getElementById("media-flash").style.display = 'none';
			}

		}
	

}

function setTextOnlyTrue(){
	if(document.getElementById("urlValue") != null)
       	var urlVal=document.getElementById("urlValue").value;
	if(document.getElementById("feedUrlVal") != null)
		var feedUrl=document.getElementById("feedUrlVal").value;
       //var queryString = location.search; 
       //if(queryString != "") urlVal = urlVal + queryString; 
 
   	urlVal = urlVal.replace(/&/g,"^");
	//alert(urlVal);
       location.href="/wps/wcm/jsp/setSession.jsp?url="+urlVal+"&q=true&FEEDURL="+feedUrl;
}

function setTextOnlyFalse(){
	if(document.getElementById("urlValue") != null)
       	var urlVal=document.getElementById("urlValue").value;
	if(document.getElementById("feedUrlVal") != null)
		var feedUrl=document.getElementById("feedUrlVal").value;
       
	//var queryString = location.search; 
       //if(queryString != "") urlVal = urlVal + queryString; 

	urlVal = urlVal.replace(/&/g,"^");
       //alert(urlVal);
       location.href="/wps/wcm/jsp/setSession.jsp?url="+urlVal+"&q=false&FEEDURL="+feedUrl;
}




function setTextOnlyDivBlock(){
	if(document.getElementById("container") != null)
		document.getElementById("container").style.display = 'none'; 
	if(document.getElementById("textonly") != null)
       	document.getElementById("textonly").style.display = 'block';

	
	if(document.getElementById("search_box") != null){
		document.getElementById("search_box").innerHTML = ''; 

	}
	if(document.getElementById("search_box_text") != null){
	      	document.getElementById("search_box_text").innerHTML= searchBoxTextInnerHTML ;
	}

       if(document.getElementById("body")!= null){
	document.getElementById("body").className='bodytext';
	}
	classChange();



}
function setTextOnlyDivNone(){
	if(document.getElementById("container") != null)
		document.getElementById("container").style.display = 'block'; 
	if(document.getElementById("textonly") != null)
		document.getElementById("textonly").style.display = 'none';

	if(document.getElementById("search_box") != null){
		document.getElementById("search_box").innerHTML = searchBoxInnerHTML; 

	}
	if(document.getElementById("search_box_text") != null){
	      	document.getElementById("search_box_text").innerHTML= '' ;
	}

 	if(document.getElementById("body")!= null){
	document.getElementById("body").className='bodygrp';
	}



}

function classChange() {
	if(document.getElementsByTagName("a") != null){
		for (i=0;i<document.getElementsByTagName("a").length; i++) {
			if (document.getElementsByTagName("a").item(i).className == "icon pdf-file"){
				document.getElementsByTagName("a").item(i).className = "red";
			}
		}
	}
}

function changePrimaryItemColor()
{
  var path =location.href;
  if((path.indexOf("NewsArchive")!=-1)||(path.indexOf("news")!=-1))
  {
      var pathArray=new Array();
      pathArray=path.split("/");
      document.getElementById(pathArray[pathArray.length-2]).style.color="#12c2e9";
      document.getElementById(pathArray[pathArray.length-2]).style.cursor="none";
  }  
}


function changeProduct(productid){
  
 
  if(productid == '1') {
  	document.getElementById("bgimageDIV1").style.display = "block";
  	document.getElementById("bgimageDIV2").style.display = "none";
  	document.getElementById("bgimageDIV3").style.display = "none";
  	document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(productid == '2') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "block";
	document.getElementById("bgimageDIV3").style.display = "none";
  	document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(productid == '3') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "none";
	document.getElementById("bgimageDIV3").style.display = "block";
  	document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(productid == '4') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "none";
	document.getElementById("bgimageDIV3").style.display = "none";
  	document.getElementById("bgimageDIV4").style.display = "block";
  }

}

function changeProductText(productid){
  
 
  if(productid == '1') {
  	document.getElementById("bgimagetextDIV1").style.display = "block";
  	document.getElementById("bgimagetextDIV2").style.display = "none";
  	document.getElementById("bgimagetextDIV3").style.display = "none";
  	document.getElementById("bgimagetextDIV4").style.display = "none";
  }
  
  if(productid == '2') {
  	document.getElementById("bgimagetextDIV1").style.display = "none";
	document.getElementById("bgimagetextDIV2").style.display = "block";
	document.getElementById("bgimagetextDIV3").style.display = "none";
  	document.getElementById("bgimagetextDIV4").style.display = "none";
  }
  
  if(productid == '3') {
  	document.getElementById("bgimagetextDIV1").style.display = "none";
	document.getElementById("bgimagetextDIV2").style.display = "none";
	document.getElementById("bgimagetextDIV3").style.display = "block";
  	document.getElementById("bgimagetextDIV4").style.display = "none";
  }
  
  if(productid == '4') {
  	document.getElementById("bgimagetextDIV1").style.display = "none";
	document.getElementById("bgimagetextDIV2").style.display = "none";
	document.getElementById("bgimagetextDIV3").style.display = "none";
  	document.getElementById("bgimagetextDIV4").style.display = "block";
  }

}

function changeStories(storyid){
  
  
  
  if(storyid == '1') {
  	document.getElementById("bgimageDIV1").style.display = "block";
  	document.getElementById("bgimageDIV2").style.display = "none";
  	document.getElementById("bgimageDIV3").style.display = "none";
  	//document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(storyid == '2') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "block";
	document.getElementById("bgimageDIV3").style.display = "none";
  	//document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(storyid == '3') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "none";
	document.getElementById("bgimageDIV3").style.display = "block";
  	//document.getElementById("bgimageDIV4").style.display = "none";
  }
  
  if(storyid == '4') {
  	document.getElementById("bgimageDIV1").style.display = "none";
	document.getElementById("bgimageDIV2").style.display = "none";
	document.getElementById("bgimageDIV3").style.display = "none";
  	document.getElementById("bgimageDIV4").style.display = "block";
  }

}


