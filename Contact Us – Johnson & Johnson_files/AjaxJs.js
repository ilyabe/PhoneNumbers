var searchReq = '';

var xmlHttp;
var resultxmlHttp;
var param ='';
var param2 = '';
var textNew = 'true';
var textOnly = 'false';
var textId = 0;
var queryString="";
var textVisible = 'block';
var textHidden = 'none';

var showTimeUrl="http://www.jnj.com/wps/wcm/jsp/showData.jsp";
var TextOnlyShowTimeUrl="http://www.jnj.com/wps/wcm/jsp/textOnlyShowData.jsp";
var urlAjax ="/wps/wcm/connect/jnj.com+development/Development/?srv=cmpnt&source=library&cmpntname=AjaxJspComponent";

var getMethod= 'GET';
var enter ='false';
var textOnlyEnter ='false';
var enterResult ='false';
var emailToFriendEnter ='false';
var contuctUsEnter ='false';
var alertmessage='';
var blankmessage='';
var selectmessage='';
var tooltip='false';
var customSubmit='true';
var winDowOpen = window;
var newWindow = '';
var searchStr = '';
var submitCheck= 'false';
var alertTimeOutId = 0;
var featureListString = '';
var featureListStringTextOnly = '';

function callTextOnlyCustomEvent(){
	clearTimeout(alertTimeOutId);
	alertTimeOutId = setTimeout('textOnlySearchSuggest()', 750);
}
function callCustomEvent(){
	clearTimeout(alertTimeOutId );
	alertTimeOutId = setTimeout('searchSuggest()', 750);
}

if(document.getElementById("txtOnlyVal") != null){
	if(document.getElementById("txtOnlyVal").value=="true"){
			textNew = 'false';

	}
}

function getXmlHttpRequestObject() {
	var objXMLHttp=null;
	if (window.XMLHttpRequest) {
		objXMLHttp =  new XMLHttpRequest();
		

	}
	else if(window.ActiveXObject) {
		objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return objXMLHttp;
}


/*Executed when clicked top search box.*/

function goSearch(){
	var str;
	if(document.getElementById('q').value == "Enter product name, company or keyword"){
		param = '';
		alert("Please enter a product name, company or keyword");
		return false;
	}
	if(document.getElementById('q').value == ""){
		param = '';
		alert("Please enter a product name, company or keyword");
		return false;
	}
	else {
		document.getElementById("search_top").style.visibility = "visible";
		
	   str = escape(document.getElementById('q').value);	
	   searchStr = document.getElementById('q').value;
	   featureListPopulate();
	

		var url = showTimeUrl+'?q='+str;	
		
		textNew = 'true';
	
		document.getElementById('txtHidden').value = param;	
		document.getElementById('featureList').value = featureListString ;
		document.searchform.action =url ;
		document.searchform.submit();	
			}
		}

/*Executed when clicked search box above product result.*/

function moreSearch(){

	var str;

	if(document.getElementById('s').value == ""){
		alert("Please enter a product name, company or keyword");
		return false;
	}
	else {
   			
	   str = escape(document.getElementById('s').value);	
	   searchStr = document.getElementById('s').value;
	   //alert("searchStr :"+searchStr);
	   featureListPopulate();
	   

		
		var url = showTimeUrl+'?q='+str;	
		document.searchform1.action =url ;
		textNew = 'true';
		
		document.getElementById('txtHidden1').value = param;
		document.getElementById('featureList1').value = featureListString ;
		document.searchform1.submit();	
	}

}


function handleSearchSuggestForFeatureList()
{
		var legal_text = "You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.";

		var var1= searchStr;
		//alert("in handleSearchSuggestForFeatureList : " + xmlHttp.readyState);
	

		if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && var1!=null && var1!='')
		{
			var ss = '';
			
			var str = xmlHttp.responseText.split("^");
			//alert("in FeatureList 2 : " + str);
			param = '';
			param2 = '';

			var suggest = '';

			if(str.length>2)
			{
				ss+='<span id="search_header">Featured Results</span><br />';
				//rr.innerHTML += '<div id="resultstop">Featured List</div>';
				var counter = 0;
				for(i=0; i < str.length-1 ; i=i+6)
				{
					textId= textId+1;
										
					//to show only 8 results per dropdown.Each str array element can be split up into 5 units.
					if(i<=24)
					{
						
						suggest = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';
						var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
						if(newWindowFlag == '1') {
							// removing hover effect
							suggest += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="javascript:setFeaturedSearch('+i+');" ><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						} else {
							// after removing hover effect
							suggest += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="javascript:setSameWindowFeaturedSearch('+i+');" ><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						}
						var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;
                                       
						suggest += '<img src="'+ str[i] +'" width="50" height="30" border="0"/></div></td>';
						suggest += '<td><div id="searchtext" ><span id="title" ><img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">';
						suggest += '&nbsp;'+ str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td colspan=2><div id='+i+'  style=" display: none;" class="expand">'+proddesc  +'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.
						ss +=  suggest;
					}


				
				var biglogourl = str[i].replace('/product/','/product/biglogos/');
				var dashIndex = biglogourl.indexOf('-');
				var logoImageURL = biglogourl.substr(0,dashIndex)+"-logob.jpg";
			
				var total_prod_link=str[i+3];
				
				var prod_link=total_prod_link.split("://");

				/*var productlinkstring = prod_link[1].replace(/&/g,"&nbsp;&&nbsp;");
				productlinkstring = productlinkstring.replace(/[/]/g,"/&nbsp;");*/
				
				var  productlinkstring = prod_link[1];
					
				var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
				
				if( counter % 2 == 0){
					var  result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_white" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_white" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" ><img src="'+ logoImageURL +'"  border="0"/></div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+' - <img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">&nbsp;'+productlinkstring +'</span>';
					result += '<div id="resulttext">'+proddesc +'</div></div></div>';
					param += result;
					counter++;
				}
				else {
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_gray" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_gray" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" ><img src="'+ logoImageURL +'"  border="0"/></div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+' - <img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">&nbsp;'+productlinkstring +'</span>';
					result += '<div id="resulttext">'+proddesc +'</div></div></div>';

					param += result;			
					counter++;
				}
				

			}
			
			var1= searchStr;

			if(var1!=null && var1!='') {
				param2 = param;
			} else {
				param2 = '';
			}
			ss += '<div id="search_footer"  ><div id="search_viewall" onclick="javascript:showFeatureList()" >View all Feature Results</div> <div id="search_viewbut" onclick="javascript:showFeatureList()" ><img src="/wps/wcm/jsp/images/home/viewall-but.gif" alt="View all Feature results" style="cursor:pointer;"></div></div>';
			
		}
		else
		{
			param2 = '';
			var suggest = '<div id="search_footer_textonly"><div id="search_viewnone_textonly">'+'No Feature Results were Found'+'</div> </div>';

			
			ss = suggest;
		}
		featureListString = ss;
		
	}	

}


function featureListPopulate()
{
 	var suggest = '';
	
		var var1= searchStr;
		//alert(var1); 
				if(xmlHttp == null) xmlHttp=getXmlHttpRequestObject();
				if(xmlHttp)
      				{

					xmlHttp.onreadystatechange = handleSearchSuggestForFeatureList;
					
					var str = escape(var1);
			
					if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
							
					//alert(urlAjax+'&q='+str);
					xmlHttp.open("GET", urlAjax+'&q='+str, false);
					xmlHttp.send(null);
					//alert("xmlHttp.onreadystatechange :"+xmlHttp.onreadystatechange);
					if (xmlHttp.onreadystatechange == null) handleSearchSuggestForFeatureList();
				
					}
					else{
					
					xmlHttp.open("GET", urlAjax+'&q='+str, false);
					xmlHttp.send(null);
					}
				}
}


function searchSuggest()
{
 	var suggest = '';
	
		var var1=document.getElementById('q').value;
	
		if(enter=='false')
		{
			if(hasWhiteSpace(var1) && (var1!= '') && (var1!='Enter product name, company or keyword'))
			{
				searchReq = getXmlHttpRequestObject();
				if(searchReq)
      				{

					searchReq.onreadystatechange = handleSearchSuggest;
					document.getElementById("search_top").style.visibility = "visible";
					
					var str = escape(var1);
					//alert(urlAjax+'&q='+str);
					searchReq.open("GET", urlAjax+'&q='+str, true);
					searchReq.send(null);

				}
			}else{

				var ss = document.getElementById('search_suggest');
				ss.innerHTML = '';
				document.getElementById('txtHidden').value = '';
				document.getElementById("search_top").style.visibility = "hidden";
				param='';

			}
		}
	
}


function handleSearchSuggest()
{
		var legal_text = "You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.";

		if(document.getElementById("search") != null){
			document.getElementById("search").style.visibility = "visible";
		}
		if(document.getElementById("search_suggest") != null){
			document.getElementById("search_suggest").style.visibility = "visible";
		}
	
		var var1=document.getElementById('q').value;

		if (searchReq.readyState == 4 && searchReq.status == 200 && var1!=null && var1!='')
		{
		

			var ss = document.getElementById('search_suggest');
			ss.innerHTML = '';
			param = '';
			param2 = '';
			var str = searchReq.responseText.split("^");
			var ssFeaturelist = '';

			var suggest = '';
			var suggestFeaturelist = '';

			if(str.length>2)
			{
				ss.innerHTML+='<span id="search_header">Featured List</span><br />';
				ssFeaturelist +='<span id="search_header">Featured Results</span><br />';

				var counter = 0;
				for(i=0; i < str.length-1 ; i=i+6)
				{
					textId= textId+1;
					suggest = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';
					suggest += '<input type="hidden" id="siteproduct'+i+'" value="'+str[i+1]+'"/>';
					//to show only 8 results per dropdown.Each str array element can be split up into 5 units.
					if(i<=42)
					{
					   //	alert("name = " + str[i+1]);
					   //	alert("4 = " + str[i+4]);
						



						//alert("suggest  :"+suggest);
						var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
						if(newWindowFlag == '1') {
							suggest += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="setSearch('+i+');" onmouseenter="scrollDn();" onmouseover="showOn('+i+',textVisible,'+i+','+str.length+');" onmouseout="showOff('+i+',textHidden,'+i+','+ str.length+')"><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						} else {
							suggest += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="setSameWindowSearch('+i+');" onmouseenter="scrollDn();" onmouseover="showOn('+i+',textVisible,'+i+','+str.length+');" onmouseout="showOff('+i+',textHidden,'+i+','+str.length+')"><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						}
						var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

						suggest += '<img src="'+ str[i] +'" width="50" height="30" border="0"/></div></td>';
						suggest += '<td><div id="searchtext" ><span id="title" ><img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">';
						suggest += '&nbsp;'+ str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td colspan=2><div id='+i+'  style=" display: none;" class="expand">'+proddesc  +'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.
						
					


					// Code for feature list in the search result page.
					if(i<=24) {
						suggestFeaturelist = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';
						if(newWindowFlag == '1') {
							// removing hover effect
							suggestFeaturelist += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="javascript:setFeaturedSearch('+i+');" ><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						} else {
							// after removing hover effect
							suggestFeaturelist += '<div id="hoverAll" style="width:297px;cursor:pointer; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;"  onclick="javascript:setSameWindowFeaturedSearch('+i+');" ><table id="hightab'+i+'" style="background-color: #ffffff;width:297px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr><td><div  id="proding" >';
						}

						suggestFeaturelist += '<img src="'+ str[i] +'" width="50" height="30" border="0"/></div></td>';
						suggestFeaturelist += '<td><div id="searchtext" ><span id="title" ><img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">';
						suggestFeaturelist += '&nbsp;'+ str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td colspan=2><div id='+i+'  style=" display: none;" class="expand">'+proddesc  +'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.
						ssFeaturelist +=  suggestFeaturelist ;
					}

				}

					

				
				

				ss.innerHTML +=  suggest;
				var biglogourl = str[i].replace('/product/','/product/biglogos/');
				var dashIndex = biglogourl.indexOf('-');
				var logoImageURL = biglogourl.substr(0,dashIndex)+"-logob.jpg";
			
				var total_prod_link=str[i+3];
				
				var prod_link=total_prod_link.split("://");

				/*var productlinkstring = prod_link[1].replace(/&/g,"&nbsp;&&nbsp;");
				productlinkstring = productlinkstring.replace(/[/]/g,"/&nbsp;");*/
				
				productlinkstring = prod_link[1];

				var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
				
				if( counter % 2 == 0){
					var  result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_white" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_white" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" ><img src="'+ logoImageURL +'"  border="0"/></div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+' - <img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">&nbsp;'+productlinkstring +'</span>';
					result += '<div id="resulttext">'+proddesc +'</div></div></div>';
					
					param += result;
					counter++;
				}
				else {
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_gray" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_gray" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" ><img src="'+ logoImageURL +'"  border="0"/></div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+' - <img src="/wps/wcm/jsp/images/home/newbrowser-icon.gif">&nbsp;'+productlinkstring +'</span>';
					result += '<div id="resulttext">'+proddesc +'</div></div></div>';
					
					param += result;
					counter++;
				}
				

			}//end of for loop
			
			var1=document.getElementById('q').value;

			if(var1!=null && var1!='') {
				param2 = param;
			} else {
				param2 = '';
			}
			ss.innerHTML += '<div id="search_footer"  ><div id="search_viewall" onclick="javascript:nextSearch()" >View all search results</div> <div id="search_viewbut" onclick="javascript:nextSearch()" ><img src="/wps/wcm/jsp/images/home/viewall-but.gif" alt="view all search result" style="cursor:pointer;"></div></div>';
			ssFeaturelist +='<div id="search_footer" ><div id="search_viewall" onclick="javascript:showFeatureList()"> View all Feature Results'+'</div> <div id="search_viewbut" onclick="javascript:showFeatureList()" ><img src="/wps/wcm/jsp/images/home/viewall-but.gif" alt="View all Feature Results" style="cursor:pointer;"></div></div>';;

			featureListString = ssFeaturelist ;
		} //end of if(str.length>2)
		else
		{
			param2 = '';
			var suggest = '<div id="search_footer" ><div id="search_viewall" onclick="javascript:nextSearch()"> View all search results'+'</div> <div id="search_viewbut" onclick="javascript:nextSearch()" ><img src="/wps/wcm/jsp/images/home/viewall-but.gif" alt="view all search result" style="cursor:pointer;"></div></div>';
			featureListString = '<div id="search_footer_textonly"><div id="search_viewnone_textonly">'+'No Feature Results were Found'+'</div> </div>';


			ss.innerHTML = suggest;
		}
		//alert("suggest"+suggest);

	}	

}


/*Executed when clicked on 'ViewAll feature list' button.*/

function showFeatureList(){
		document.getElementById('featureListDiv').style.display = 'block';
		document.getElementById('resultcontainer').style.display = 'none';
		document.getElementById('search_text_took').style.display = 'none';
}

/*Executed when clicked on 'ViewAll' button.*/
function nextSearch(){
		//var url = showTimeUrl+'?q='+document.getElementById('q').value;
		
		var url = showTimeUrl;
		document.getElementById('txtHidden').value = param;
		document.getElementById('featureList').value = featureListString ;

		document.searchform.action =url ;
		document.searchform.submit();
		textNew = 'true';
}





/*check for white space */
function hasWhiteSpace(s)
{
     var reWhiteSpace = new RegExp(/^\s+$/);
     if (reWhiteSpace.test(s)) {
     	return false;
     }
	if(document.getElementById("search_top")!= null)
    		document.getElementById("search_top").style.visibility = "visible";
	return true;
}

/*Check whether user presses "enter" in the top search box */

function checkEnter(e){
	
	var characterCode ;

	if(e && e.which){

	e = e;
	characterCode = e.which;
	}
	else{

	e = event;
	characterCode = e.keyCode ;
	}

	if(characterCode == 13){
		
		goSearch();
	}
	else{
		
		enter='false';
	}
}


/* Check whether user presses "enter" in the search box above product result */

function checkEnterResult(e)
{
	var characterCode ;
	if(e && e.which)
	{
		e = e;
		characterCode = e.which;
	}
	else
	{
		e = event;
		characterCode = e.keyCode ;
	}
	if(characterCode == 13)
	{
		moreSearch();
		enterResult='true';
	}
}



function callMore()
{
	if(enterResult =='true')
	{
		moreSearch();
	}
}


function stopScroll(){  }

function scrollUp() {
   window.scrollBy(0,15); // horizontal and vertical scroll increments
}


function scrollDn() {
    	window.scrollBy(0,-15); // horizontal and vertical scroll increments
}


function suggestOver(div_value) {
	div_value.className = 'suggest_link_over';
}



function suggestOut(div_value) {
	div_value.className = 'suggest_link';
}


function messege(winURL){
	
	 if(document.getElementById("rssLinkNews"))
  	{
    		queryString=document.getElementById("rssLinkNews").innerHTML;
    		winURL=winURL+queryString;
   	} 

	var legal_text = "<div style='padding:10px;align:justify'>You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.</div>";
	//Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {}, ok:function(win) {  {window.open (winURL,"mywindow","type=fullWindow,resizable=yes, location=yes, directories=yes, status=yes");return true};}});
       //changed on 10th Mar 08
       Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {win.setDestroyOnClose();}, ok:function(win) {{var myURL = winURL;var width = 800;var height = 600;var left = parseInt((screen.availWidth/2) - (width/2));var top = parseInt((screen.availHeight/2) - (height/2));var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;window.open(myURL, "", windowFeatures);return true};}});
	//window.open (siteurl,"mywindow","height=768,width=1024,left=0,top=0,resizable=yes, location=yes, directories=yes, status=yes");
	textNew= 'true';

}

function message(winURL){
	
	 if(document.getElementById("rssLinkNews"))
  	{
    		queryString=document.getElementById("rssLinkNews").innerHTML;
    		winURL=winURL+queryString;
   	} 

	var legal_text = "<div style='padding:10px;align:justify'>You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.</div>";
	//Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {}, ok:function(win) {  {window.open (winURL,"mywindow","type=fullWindow,resizable=yes, location=yes, directories=yes, status=yes");return true};}});
       //changed on 10th Mar 08
       Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {win.setDestroyOnClose();}, ok:function(win) {{var myURL = winURL;var width = 800;var height = 600;var left = parseInt((screen.availWidth/2) - (width/2));var top = parseInt((screen.availHeight/2) - (height/2));var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;window.open(myURL, "", windowFeatures);return true};}});
	//window.open (siteurl,"mywindow","height=768,width=1024,left=0,top=0,resizable=yes, location=yes, directories=yes, status=yes");
	textNew= 'true';

}



	

function message_news(winURL){
	
	 
if(document.getElementById("rssLinkNews"))
  	{
    		queryString=document.getElementById("rssLinkNews").innerHTML;
    		winURL=winURL+queryString;
   	} 

	var legal_text = "<div style='padding:10px;align:justify'>You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.</div>";
	//Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {}, ok:function(win) {  {window.open (winURL,"mywindow","type=fullWindow,resizable=yes, location=yes, directories=yes, status=yes");return true};}});
       //changed on 10th Mar 08
       Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {win.setDestroyOnClose();}, ok:function(win) {{var myURL = winURL;var width = 800;var height = 600;var left = parseInt((screen.availWidth/2) - (width/2));var top = parseInt((screen.availHeight/2) - (height/2));var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;window.open(myURL, "", windowFeatures);return true};}});
	//window.open (siteurl,"mywindow","height=768,width=1024,left=0,top=0,resizable=yes, location=yes, directories=yes, status=yes");
	textNew= 'true';

}






function wopen(winURL)
{

//var winURL2=location.href;

		var myURL = winURL;
		var width = 800;
		var height = 600;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
		if("printWindow"!=self.name) 
		window.open(myURL, "", windowFeatures);		
}

function setFeaturedSearch(cnt) {
	if(document.getElementById('siteurl'+cnt) != null){
		var siteurl = document.getElementById('siteurl'+cnt).value;
	}	
	//alert("in call setSearch");

	var legal_text = "<div style='padding:10px;align:justify'>You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.</div>";
	Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) {}, ok:function(win) {{var myURL = siteurl;var width = 768;var height = 576;var left = parseInt((screen.availWidth/2) - (width/2));var top = parseInt((screen.availHeight/2) - (height/2));var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;window.open(myURL, "", windowFeatures);return true};}});;
	textNew= 'true';
	if(document.getElementById("txtOnlyVal") != null){			
		if(document.getElementById("txtOnlyVal").value=="true"){
			textNew = 'false';
		}else{
			textNew = 'true'; 
		}
	}

	
}

function setSameWindowFeaturedSearch(cnt) {
	
	if(document.getElementById('siteurl'+cnt)){
		var siteurl = document.getElementById('siteurl'+cnt).value;
	}
	
	window.document.location.href = siteurl;
	//textNew= 'true';
	if(document.getElementById("txtOnlyVal") != null){
			
			if(document.getElementById("txtOnlyVal").value=="true"){
				textNew = 'false';
			}else{
				textNew = 'true'; 
			}
		}

}


function setSearch(cnt) {
	var siteurl = '/smartsearchresults.jsp';
	var siteproduct='';
	var myURL ='';
	
	if(document.getElementById('siteurl'+cnt) != null){
		myURL = document.getElementById('siteurl'+cnt).value;
	}
	
	if(document.getElementById('siteproduct'+cnt) != null){
		siteproduct = document.getElementById('siteproduct'+cnt).value;
	}
	
	
	//Web Trends Smart Search tracking enabled code
	var keyword = document.getElementById('q').value;
	//alert("product="+siteproduct + " & keyword=" + keyword);
	//dcsMultiTrack('DCS.dcsuri' , siteurl,'WT.ti','Smart Search Results', 'WT.oss',keyword, 'WT.z_searchlink', siteproduct,'WT.z_searchtype','Smart Search','WT.oss_r','1') ;

	var width = 768;
	var height = 576;
	var left = parseInt((screen.availWidth/2) - (width/2));
	var top = parseInt((screen.availHeight/2) - (height/2));
	var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
	window.open(myURL, "", windowFeatures);
	
		
	if(document.getElementById("txtOnlyVal") != null){			
		if(document.getElementById("txtOnlyVal").value=="true"){
			textNew = 'false';
		}else{
			textNew = 'true'; 
		}
	}

	
}

function setSameWindowSearch(cnt) {
	var siteurl = '/smartsearchresults.jsp';
	var siteproduct='';
	var myURL ='';
	
	if(document.getElementById('siteurl'+cnt)){
		myURL = document.getElementById('siteurl'+cnt).value;
	}
	
	if(document.getElementById('siteproduct'+cnt) != null){
		siteproduct = document.getElementById('siteproduct'+cnt).value;
	}
	
	//Web Trends Smart Search tracking enabled code
	var keyword = document.getElementById('q').value;
	//alert('product='+siteproduct + ' & keyword=' + keyword);
	//dcsMultiTrack('DCS.dcsuri' , siteurl,'WT.ti','Smart Search Results', 'WT.oss',keyword, 'WT.z_searchlink', siteproduct,'WT.z_searchtype','Smart Search','WT.oss_r','1') ;

	
	window.document.location.href = myURL;
	if(document.getElementById("txtOnlyVal") != null){
			
	if(document.getElementById("txtOnlyVal").value=="true"){
		textNew = 'false';
	}else{
		textNew = 'true'; 
		}
	}

}

function setSmallSearch(cnt) {
	var siteurl = '';
	
	if(document.getElementById('sitesmallurl'+cnt) != null){
		var siteurl = document.getElementById('sitesmallurl'+cnt).value;
	}
	//alert("before call - setSmallSearch"+ siteurl );
	var myURL = siteurl;
	var width = 768;
	var height = 576;
	var left = parseInt((screen.availWidth/2) - (width/2));
	var top = parseInt((screen.availHeight/2) - (height/2));
	var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
		

	window.open(myURL, "", windowFeatures);	
	//textNew= 'true';
	if(document.getElementById("txtOnlyVal") != null){
			
			if(document.getElementById("txtOnlyVal").value=="true"){
				textNew = 'false';
			}else{
				textNew = 'true'; 
			}
		}

}

function setSmallSameWindowSearch(cnt) {
	if(document.getElementById('sitesmallurl'+cnt) != null){
		var siteurl = document.getElementById('sitesmallurl'+cnt).value;
	}
	
	//alert("before call - setSmallSameWindowSearch"+ siteurl );
	window.document.location.href = siteurl;
	
	//textNew= 'true';
	if(document.getElementById("txtOnlyVal") != null){
			
			if(document.getElementById("txtOnlyVal").value=="true"){
				textNew = 'false';
			}else{
				textNew = 'true'; 
			}
		}

}



function resetProductField(){
//alert("in grafix"+ document.getElementById('s').value);
			if(document.getElementById('s') != null)
				document.getElementById('s').value = '';
			if(document.getElementById('t') != null)
				document.getElementById('t').value = '';

}

function setField(){

	if(document.getElementById("q") != null){
	//alert("in set field")
		if(document.getElementById("q").value == "Enter product name, company or keyword"){
			document.getElementById("q").value = '';
		}
	}
	textNew = 'nocall';
}

function textonlySetField(){
	if(document.searchformtext.q != null){
		//ert(document.searchformtext.q.value);
		if(document.searchformtext.q.value == "Enter product name, company or keyword"){
			document.searchformtext.q.value = '';
			}
	}
	//textOnly = 'true';
	textNew = 'nocall';
	//alert("in textonlySetField" + textNew );

}
/* 	Call on body click 	*/
function resetField(){
	
	if(textNew == 'nocall')
	{	//alert("LL");
		if(document.getElementById("txtOnlyVal") != null){
			
			if(document.getElementById("txtOnlyVal").value=="true"){
				textNew = 'false';
			}else{
				textNew = 'true'; 
			}
		}
		return;

	}
	//alert("textNew----"+textNew);
	if( textNew== 'true') // graphics
	{
		if(document.getElementById('search_suggest')!= null){
			//alert("for garficx1");
			document.getElementById("q").value = 'Enter product name, company or keyword';
			
			document.getElementById("search_top").style.visibility = "hidden";
			document.getElementById("search").style.visibility = "hidden";
			document.getElementById("search_suggest").style.visibility = "hidden";
			//alert("for textOnly2");
		

		}
	}else if(textNew== 'false'){   // Text only
		if(document.getElementById('search_suggest_textonly')!= null ){
			
			if(document.searchformtext.q != null ){
				//alert("for textOnly2");
				document.searchformtext.q.value = 'Enter product name, company or keyword';
				//alert("for textOnly3");
				if(document.getElementById("search_textonly") != null){
					document.getElementById("search_textonly").style.visibility = "hidden";
				}
				if(document.getElementById("search") != null){
					document.getElementById("search").style.visibility = "hidden";
				}
				if(document.getElementById('search_suggest_textonly') != null){
					document.getElementById('search_suggest_textonly').style.visibility = "hidden";
				}

				//alert("for textOnly4");
			}
			//alert("for textOnly1"+document.getElementById('search_suggest_textonly').innerHTML + "!!");
		}
	}
	
	// 	this portion is for to remove tooltip on ContactUs page 	
	if(document.getElementById('tooltip') !=null )
	{
		if( tooltip =='false')
		document.getElementById('tooltip').style.visibility = 'hidden';
	}

	tooltip ='false';


}


function showOn(obj,val,i,k) {
	var ckFlag = false ;
	if (k<48) ckFlag =true;
	var lastItem  ;
	if (ckFlag ) lastItem= k-7;
	else 	lastItem=42;

	document.getElementById("hightab"+lastItem).style.backgroundColor = "#FFFFFF";
	document.getElementById("hightab"+lastItem).style.width = "297px";
	document.getElementById(lastItem).style.display = 'none';

	if(document.getElementById("hightab"+i) != null && document.getElementById("hightab"+i) != 'undefined' ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#EAEAEA";
		document.getElementById("hightab"+i).style.width = "297px";
		document.getElementById(obj).style.display = val;
	}

}

function showOff(obj,val,i,k) {

	var ckFlag = false ;
	if (k<48) ckFlag =true;
	if (ckFlag && i==k-7) 
		return false;
	else if(!ckFlag && i==42 )
		return false;
	if(document.getElementById("hightab"+i) != null ){ 
		
			document.getElementById("hightab"+i).style.backgroundColor = "#FFFFFF";
			document.getElementById("hightab"+i).style.width = "297px";
			document.getElementById(obj).style.display = val;
		
		
	}
	
}

function showOnText(obj,val,i,k) {

	var ckFlag = false ;
	if (k<48) ckFlag =true;
	var lastItem  ;
	if (ckFlag ) lastItem= k-7;
	else 	lastItem=42;
	
	document.getElementById("hightab"+lastItem).style.backgroundColor = "#FFFFFF";
	document.getElementById("hightab"+lastItem).style.width = "160px";
	document.getElementById(lastItem).style.display = 'none';
	
	if(document.getElementById("hightab"+i) != null ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#EAEAEA";
		document.getElementById("hightab"+i).style.width = "160px";
		document.getElementById(obj).style.display = val;
	}
}

function showOffText(obj,val,i,k) {
	var ckFlag = false ;
	if (k<48) ckFlag =true;
	if (ckFlag && i==k-7) 
		return false;
	else if(!ckFlag && i==42 )
		return false;
	if(document.getElementById("hightab"+i) != null ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#FFFFFF";
		document.getElementById("hightab"+i).style.width = "160px";
		document.getElementById(obj).style.display = val;
	}


}




/*function showOn(obj,val,i) {
	
	if(document.getElementById("hightab"+i) != null && document.getElementById("hightab"+i) != 'undefined' ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#EAEAEA";
		//alert('2- showOn');
		document.getElementById("hightab"+i).style.width = "297px";
		//alert('3- showOn');
		document.getElementById(obj).style.display = val;
	}

}

function showOff(obj,val,i) {
	if(document.getElementById("hightab"+i) != null ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#FFFFFF";
		//alert('2- showOff');
		document.getElementById("hightab"+i).style.width = "297px";
		//alert('3- showOff');
		document.getElementById(obj).style.display = val;
	}
	
}

function showOnText(obj,val,i) {
	//alert('1- showOnText');
	if(document.getElementById("hightab"+i) != null ){ 
		document.getElementById("hightab"+i).style.backgroundColor = "#EAEAEA";
		//alert('2- showOnText');
		document.getElementById("hightab"+i).style.width = "160px";
		//alert('3- showOnText');
		document.getElementById(obj).style.display = val;
	}
}

function showOffText(obj,val,i) {
	if(document.getElementById("hightab"+i) != null ){ 
		//alert('1- showOnText');
		document.getElementById("hightab"+i).style.backgroundColor = "#FFFFFF";
		//alert('2- showOnText');
		document.getElementById("hightab"+i).style.width = "160px";
		//alert('3- showOnText');
		document.getElementById(obj).style.display = val;
	}
}*/

function show(obj,val) {
	document.getElementById(obj).style.visibility = val;
}

function setColorOn(obj,val,i) {
	document.getElementById("hightab"+i).style.backgroundColor = "#EAEAEA";
}

function setColorOff(obj,val,i) {
	document.getElementById("hightab"+i).style.backgroundColor = "#FFFFFF";
}



/*---------------------------------------------------------------------------------------------------------*/

function pngCompatible(){
	//alert("111111"+ getElementById('search_box'));

	var arVersion = navigator.appVersion.split("MSIE");
	var version = parseFloat(arVersion[1]);

if ((version >= 5.5) && (document.body.filters))
{
	//alert("2222 in if" + document.images.length);
   for(var i=0; i<document.images.length; i++)
   {


      var img = document.images[i];
      var imgName = img.src.toUpperCase();
//alert("3333 in for" + imgName.substring(imgName.length-3, imgName.length) );

      if (imgName.substring(imgName.length-3, imgName.length) == "PNG")
      {
         var imgID = (img.id) ? "id='" + img.id + "' " : "";
         var imgClass = (img.className) ? "class='" + img.className + "' " : "";
         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' ";
         var imgStyle = "display:inline-block;" + img.style.cssText ;
         if (img.align == "left") imgStyle = "float:left;" + imgStyle;
         if (img.align == "right") imgStyle = "float:right;" + imgStyle;
         if (img.parentElement.href) imgStyle = "cursor:pointer;" + imgStyle;
         var strNewHTML = "<span " + imgID + imgClass + imgTitle
         + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"
         + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"
         + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>" ;
         img.outerHTML = strNewHTML;
         i = i-1;
      }
   }
}

}

/*----------------------------------------------------------------------------------------------------------*/
/*------------------------------Below function is for Text only pages--------------------------------------*/
/*----------------------------------------------------------------------------------------------------------*/

function textOnlyCheckEnter(e){
      	var characterCodeTextonly ;

	if(e && e.which){
	e = e;

	characterCodeTextonly = e.which;
	}
	else{
	e = event;
	characterCodeTextonly = e.keyCode ;
	}

	if(characterCodeTextonly == 13){

		textOnlyGoSearch();
	}
	else{

		textOnlyEnter ='false';
	}
}

function textOnlyGoSearch(){
	//alert('1');
	if(document.searchformtext.q.value == "Enter product name, company or keyword"){
		param = '';
		//alert('1-1');
		alert("Please Enter product name, company or keyword");
		return false;
	}
	if(document.searchformtext.q.value == ""){
			param = '';
			//alert('1-2');
			alert("Please Enter product name, company or keyword");
			return false;
	}
	else {
		
		var str;
  	   	str = escape(document.searchformtext.q.value);
		searchStr = document.searchformtext.q.value;
		featureListPopulateTextOnly();
			 if(str.search('&'))
	 		{
	     		   str = str.replace("&","%26");

	 		}


		var url = TextOnlyShowTimeUrl+'?q='+str;
		

		document.searchformtext.txtHiddenTextonly.value = param2;
		document.searchformtext.featureListTextOnly.value = featureListStringTextOnly ;
		//alert("featureListStringTextOnly :"+featureListStringTextOnly );
		document.searchformtext.action =url ;
		document.searchformtext.submit();

		textOnly = 'true';
		textNew='false';
	}

}


function featureListPopulateTextOnly()
{
	//alert('In featureListPopulateTextOnly');
 	var suggest = '';
		//alert("In searchSuggest");
	
		var var1= searchStr;

				
				//alert(var1);
				if(xmlHttp == null) xmlHttp=getXmlHttpRequestObject();
				//alert("return"+xmlHttp);
				if(xmlHttp)
      				{
					//alert("In If");

					xmlHttp.onreadystatechange = handleSearchSuggestForFeatureListTextOnly;
					var str = escape(var1);
					if(str.search('&'))
	 				{
	     		   			str = str.replace("&","%26");

	 				}


					if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){ 
							
					xmlHttp.open("GET", urlAjax+'&q='+str, false);

					//xmlHttp.open("GET", urlAjax+'&q='+str+'?site=jnjcom_all', false);
					xmlHttp.send(null);
					//alert("urlAjax1=========="+urlAjax);
					if (xmlHttp.onreadystatechange == null) handleSearchSuggestForFeatureListTextOnly();
				
					}
					else{
					//alert("urlAjax2=========="+urlAjax+'&q='+str+'?site=jnjcom_all');
					xmlHttp.open("GET", urlAjax+'&q='+str, false);

					//xmlHttp.open("GET", urlAjax+'&q='+str+'?site=jnjcom_all', false);
					xmlHttp.send(null);
					}
				}

}

function handleSearchSuggestForFeatureListTextOnly()
{
		
	//alert("in if");
	var legal_text = "You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.";
	var textOnlyStr = searchStr;

	if (xmlHttp.readyState == 4 && xmlHttp.status == 200 && textOnlyStr!=null && textOnlyStr!='')
	{
		//
		var ss = document.getElementById('search_suggest_textonly');


		featureListStringTextOnly  = '';
		param = '';
		param2 = '';

		var str = xmlHttp.responseText.split("^");
		var suggest = '';

		if(str.length>2)
		{
			featureListStringTextOnly +='<span id="search_header__textonly">Featured Results</span><br />';
			//rr.innerHTML += '<div id="resultstop">Featured List</div>';
			var counter =0;
			for(i=0; i < str.length-1 ; i=i+6)
			{
				textId= textId+1;
				suggest = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';
				//to show only 8 results per dropdown.Each str array element can be split up into 5 units.
				if(i<=24)
				{
					
						var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
						if(newWindowFlag == '1') {
							suggest += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setFeaturedSearch('+i+');"  ><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						} else {
							suggest += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setSameWindowFeaturedSearch('+i+');"><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						}
						var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

						suggest += '<td><div id="searchtext_textonly" ><span id="title" >';
						suggest += str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td><div id='+i+'  style=" display: none;" class="expand_textonly">'+proddesc+'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.
						


				}



				featureListStringTextOnly  +=  suggest;
				//alert("featureListStringTextOnly 2:"+featureListStringTextOnly );

				var biglogourl = str[i].replace('/product/','/product/biglogos/');
				var dashIndex = biglogourl.indexOf('-');
				var logoImageURL = biglogourl.substr(0,dashIndex)+"-logob.jpg";

				var total_prod_link=str[i+3];
				var prod_link=total_prod_link.split("://");
				var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
				
				
				if( counter % 2 == 0){
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_white" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_white" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';
					
					param += result;
					counter++;
				}
				else {
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_gray" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_gray" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';

					param += result;
					counter++;
				}
			}
			textOnlyStr = searchStr;

				if(textOnlyStr !=null && textOnlyStr !='') {
					param2 = param;
				} else {
					param2 = '';
				}
			featureListStringTextOnly  += '<div id="search_footer_textonly"><div id="search_viewall_textonly" onclick="javascript:showFeatureList()">'+'View all Feature Results'+'</div> </div>';
		}
		else
		{	
			param2 = '';
			var suggest = '<div id="search_footer_textonly"><div id="search_viewnone_textonly">'+'No Feature Results were Found'+'</div> </div>';
			featureListStringTextOnly  = suggest;
		}
		//alert(ss.innerHTML);
		//alert("featureListStringTextOnly 3:"+featureListStringTextOnly );

	}


}

function textOnlyNextSearch(){
		//var url = showTimeUrl+'?q='+document.getElementById('q').value;
		var url = TextOnlyShowTimeUrl;
		document.searchformtext.txtHiddenTextonly.value = param2;
		document.searchformtext.featureListTextOnly.value = featureListStringTextOnly ;
		document.searchformtext.action =url ;
		document.searchformtext.submit();
		textNew = 'true';
}

function callMoreTextOnly()
{
	if(enterResult =='true')
	{
		moreSearchTextOnly();
	}
}

function textOnlySearchSuggest()
{

	//alert('In text only search suggest');

 	var suggest = '';
	var var1=document.searchformtext.q.value;
	

	if(textOnlyEnter =='false')
	{

		if(hasWhiteSpace(var1)&& (var1 != '') && (var1!='Enter product name, company or keyword'))

		{
			searchReq = getXmlHttpRequestObject();
			
			if(searchReq)
      			{	
				//alert("before handle search Suggest");
				searchReq.onreadystatechange = textOnlyHandleSearchSuggest;
				var str = escape(document.searchformtext.q.value);
				searchReq.open("GET", urlAjax+'&q='+str, true);
				searchReq.send(null);

			}
		}
		else
		{
			if(document.getElementById('search_suggest_textonly') != null){
				var ss = document.getElementById('search_suggest_textonly');
				ss.innerHTML = '';
			}
			if(document.getElementById('txtHidden') != null){
				document.getElementById('txtHidden').value = '';
			}
			param='';
		}
	}
}





function textOnlyHandleSearchSuggest()
{
		
		if(document.getElementById("search_textonly")!= null){
			document.getElementById("search_textonly").style.visibility = "visible";
		}
		
		if(document.getElementById("search_suggest_textonly")!= null){
			document.getElementById('search_suggest_textonly').style.visibility = "visible";
		}
		
		if(document.getElementById("search")!= null){
			document.getElementById("search").style.visibility = "visible";
		}


	var legal_text = "You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.";


	var textOnlyStr = document.searchformtext.q.value;

	if (searchReq.readyState == 4 && searchReq.status == 200 && textOnlyStr!=null && textOnlyStr!='')
	{
		//alert("in if");
		var ss = document.getElementById('search_suggest_textonly');


		ss.innerHTML = '';
		param = '';
		param2 = '';

		var str = searchReq.responseText.split("^");
		var suggest = '';
		var ssFeaturelist = '';
		var suggestFeaturelist = '';


		if(str.length>2)
		{
			ss.innerHTML+='<span id="search_header__textonly">Featured List</span><br />';
			ssFeaturelist = '<span id="search_header__textonly">Featured Results</span><br />';
			var counter =0;
			for(i=0; i < str.length-1 ; i=i+6)
			{
				textId= textId+1;
				suggest = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';
				suggest += '<input type="hidden" id="siteproduct'+i+'" value="'+str[i+1]+'"/>';
				
				suggestFeaturelist = '<input type="hidden" id="siteurl'+i+'" value="'+str[i+3]+'"/>';

				//to show only 8 results per dropdown.Each str array element can be split up into 5 units.
				if(i<=42)
				{
					
						var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
						if(newWindowFlag == '1') {
							suggest += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setSearch('+i+');" onmouseenter="scrollDn();" onmouseover="showOnText('+i+',textVisible,'+i+','+str.length+');" onmouseout="showOffText('+i+',textHidden,'+i+','+str.length+')"><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						} else {
							suggest += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setSameWindowSearch('+i+');" onmouseenter="scrollUp();" onmouseover="showOnText('+i+',textVisible,'+i+','+str.length+');" onmouseout="showOffText('+i+',textHidden,'+i+','+str.length+')"><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						}
						var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

						suggest += '<td><div id="searchtext_textonly" ><span id="title" >';
						suggest += str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td><div id='+i+'  style=" display: none;" class="expand_textonly">'+proddesc+'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.
						


					if(i<=24)
					{
					
						if(newWindowFlag == '1') {
							suggestFeaturelist += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setFeaturedSearch('+i+');"  ><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						} else {
							suggestFeaturelist += '<div id="hoverAll" style="width:160px;cursor:pointer;" onclick="javascript:setSameWindowFeaturedSearch('+i+');"><table id="hightab'+i+'" style="background-color: #ffffff;width:160px; border-left:1px solid #e5e5e5; border-right:1px solid #e5e5e5;" align="left"><tr>';
						}
						

						suggestFeaturelist += '<td><div id="searchtext_textonly" ><span id="title" >';
						suggestFeaturelist += str[i+1]+'</span><br>'+str[i+2]+'</div></td></tr><tr><td><div id='+i+'  style=" display: none;" class="expand_textonly">'+proddesc+'</div></td></tr></table></div>';//str[i+4] is the prod long desc column.it was used to hold warning msgs but now not used.

					}


				}

				ss.innerHTML +=  suggest;
				ssFeaturelist += suggestFeaturelist ;
				var biglogourl = str[i].replace('/product/','/product/biglogos/');
				var dashIndex = biglogourl.indexOf('-');
				var logoImageURL = biglogourl.substr(0,dashIndex)+"-logob.jpg";

				var total_prod_link=str[i+3];
				var prod_link=total_prod_link.split("://");
				var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
				
				
				if( counter % 2 == 0){
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_white" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_white" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';
					
					param += result;
					counter++;
				}
				else {
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_gray" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_gray" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';

					param += result;
					counter++;
				}
			}
			textOnlyStr = document.searchformtext.q.value;

				if(textOnlyStr !=null && textOnlyStr !='') {
					param2 = param;
				} else {
					param2 = '';
				}
			ss.innerHTML += '<div id="search_footer_textonly"><div id="search_viewall_textonly" onclick="javascript:textOnlyNextSearch()">'+'View all search results'+'</div> </div>';
			ssFeaturelist += '<div id="search_footer_textonly"><div id="search_viewall_textonly" onclick="javascript:showFeatureList()">'+'View all Feature Results'+'</div> </div>';

		}
		else
		{	
			param2 = '';
			var suggest = '<div id="search_footer_textonly"><div id="search_viewall_textonly" onclick="javascript:textOnlyNextSearch()">View all search results'+'</div> </div>';
			ss.innerHTML = suggest;
			ssFeaturelist += '<div id="search_footer_textonly"><div id="search_viewnone_textonly">'+'No Feature Results were Found'+'</div> </div>';

		}
		//alert(ss.innerHTML);
		featureListStringTextOnly = ssFeaturelist ;
		
	}
}

function handleSearchProductTextOnly(){
	var legal_text = "You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.";

	if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4)
	{
		param2 = '';
		param = '';
		var str = xmlHttp.responseText.split("^");

		if(str.length>2)
		{
			var counter =0;
			for(i=0; i < str.length-1 ; i=i+6)
			{
				textId= textId+1;

				var biglogourl = str[i].replace('/product/','/product/biglogos/');
				var dashIndex = biglogourl.indexOf('-');
				var logoImageURL = biglogourl.substr(0,dashIndex)+"-logob.jpg";
				var total_prod_link=str[i+3];
				var prod_link=total_prod_link.split("://");
				var newWindowFlag = str[i+5].replace(/^\s+|\s+$/g, '') ;
				
				if( counter % 2 == 0){
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_white" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_white" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';
					
					param += result;
					counter++;
				}
				else {
					var result = '';
					if(newWindowFlag == '1') {
						result += '<div id="bg_gray" onclick="javascript:setSmallSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					} else {
						result += '<div id="bg_gray" onclick="javascript:setSmallSameWindowSearch('+i+');" style="cursor:pointer"><input type="hidden" id="sitesmallurl'+i+'" value="'+str[i+3]+'"/>';
					}
					var proddesc = str[i+4].length > 0 ? str[i+4] : legal_text ;

					result += '<div  id="logo_icon" >'+str[i+1]+' logo</div>';
					result += '<div id="logo_desc"><span class="bluetitle">'+ str[i+1]+'</span><br>'+prod_link[1]+'';
					result += '<div id="resulttext">'+proddesc+'</div></div></div>';

					param += result;
					counter++;
				}



			}
			param2 = param;

		}
	}
}


function categoryDisplay(winURL)
{
	//alert(document.getElementById('requestParam').value);
	
	if(document.getElementById("txtOnlyVal").value=="true"){
		categoryDisplayTextOnly(winURL);
	}else {
		categoryDisplayGraphics(winURL);
	}
}

function categoryDisplayGraphics(winURL)
{
	//alert("in categoryDisplayGraphics");
	searchStr = document.getElementById('requestParam').value;
	featureListPopulate();
	textNew = 'true';
	document.searchform.action = winURL;
	
	document.getElementById('txtHidden').value = param;
	document.getElementById('featureList').value = featureListString ;
	document.searchform.submit();
}


function categoryDisplayTextOnly(winURL)
{	
	//alert("in categoryDisplayTextOnly");
	searchStr = document.getElementById('requestParam').value;
	featureListPopulateTextOnly();
	document.searchformtext.txtHiddenTextonly.value = param2;
	document.searchformtext.featureListTextOnly.value = featureListStringTextOnly ;
	document.searchformtext.action = winURL;
	document.searchformtext.submit();

	textOnly = 'true';
	textNew='false';
	
}


/*---------------------------------------------------------------------------------------------------------*/
/*------------------------Below function is for Contact Us page------------------------------*/
/*---------------------------------------------------------------------------------------------------------*/

function bodyLoad()
{
	if(document.getElementById('hddnMessage').value =="true")
	{
		document.getElementById('contactUs').style.display = 'none';
		document.getElementById('successMessageText').innerHTML='Thank you for contacting Johnson & Johnson.';
		document.getElementById('successMessage').style.display = 'block';
	}
	else if(document.getElementById('hddnMessage').value =="false")
	{
		document.getElementById('contactUs').style.display = 'none';
		document.getElementById('successMessageText').innerHTML='Some problem occurs at the time of sending mail. Please try again.';
		document.getElementById('successMessage').style.display = 'block';

	}
	else
	{
		document.getElementById('contactUs').style.display = 'block';
		document.getElementById('successMessage').style.display = 'none';
	}
}


function goHelp()
{
	document.getElementById('tooltip').style.visibility = 'visible';
	tooltip='true';
}

function stateChange()
{
	var state = document.getElementById('State').value;
	if(state !='')
	document.getElementById('Country').value='United States';
}



function goSubmit(ssVal2)
{
	if("printWindow"==self.name) {
		return false;	
	}

	if(contuctUsEnter  != false){

		customSubmit='true';
		//var ssVal2='<%=session.getAttribute("sessionTextOnlyValue")%>';
		if(!ssVal2){
			alertmessage="<img height=10px src='../jsp/images/contactus/icon_error.gif' /> " + "Invalid Entry for ";
			blankmessage="<img height=10px src='../jsp/images/contactus/icon_error.gif' /> " + "Please Enter ";
			selectmessage="<img height=10px src='../jsp/images/contactus/icon_error.gif' /> " + "Please Select ";
                     blankmessageforCnfemail="<img height=10px src='../jsp/images/contactus/icon_error.gif' /> " + "Please ";
  
}
		else{
			alertmessage="Invalid Entry for ";
			blankmessage="Please Enter ";
                     selectmessage="Please Select ";
                     blankmessageforCnfemail="Please "  
			
}

		document.getElementById('errSubject').style.visibility= 'hidden';
		document.getElementById('errFirstName').style.visibility= 'hidden';
		document.getElementById('errLastName').style.visibility= 'hidden';
		document.getElementById('errEmailAddr').style.visibility= 'hidden';
		document.getElementById('errCnfEmailAddr').style.visibility= 'hidden';
		//document.getElementById('errAddress1').style.display = 'none';
		//document.getElementById('errCity').style.display = 'none';
		//document.getElementById('errZip').style.display = 'none';
		//document.getElementById('errHomePhone').style.display = 'none';
		//document.getElementById('errWorkPhone').style.display = 'none';
		//document.getElementById('errGender').style.display = 'none';
		//document.getElementById('errChoicetype').style.display = 'none';
		document.getElementById('errCountry').style.visibility= 'hidden';
		//document.getElementById('errState').style.display = 'none';
		//document.getElementById('success').style.display = 'none';
		document.getElementById('errMessage').style.visibility= 'hidden';
		document.getElementById('successMessage').style.display = 'none';
		document.getElementById('errorMessage').style.display = 'none';


		if(!isRequired("Subject"))
		{
			document.getElementById('errSubject').innerHTML=selectmessage+'Subject';
			document.getElementById('errSubject').style.visibility= 'visible';
			customSubmit='false';
		}

		if (!isRequired("FirstName"))
		{
			document.getElementById('errFirstName').innerHTML=blankmessage+'First Name';
			document.getElementById('errFirstName').style.visibility= 'visible';
			customSubmit='false';
		}
		/*else if (!alphaNeumeric("FirstName"))
		{
			document.getElementById('errFirstName').innerHTML=alertmessage+'First Name';
			document.getElementById('errFirstName').style.visibility= 'visible';
			customSubmit='false';
		}*/


		if(!isRequired('LastName'))
		{
			document.getElementById('errLastName').innerHTML=blankmessage+'Last Name';
			document.getElementById('errLastName').style.visibility= 'visible';
			customSubmit='false';
		}
		/*else if(!alphaNeumeric('LastName'))
		{
			document.getElementById('errLastName').innerHTML=alertmessage+'Last Name';
			document.getElementById('errLastName').style.visibility= 'visible';
			customSubmit='false';
		}*/

		if(!isRequired('CnfEmailAddr'))
		{
                  
			document.getElementById('errCnfEmailAddr').innerHTML=blankmessageforCnfemail+'Confirm Email Address';
			document.getElementById('errCnfEmailAddr').style.visibility= 'visible';
			customSubmit='false';
		}

		if(!isRequired('EmailAddr'))
		{
			document.getElementById('errEmailAddr').innerHTML=blankmessage+'Email Address';
			document.getElementById('errEmailAddr').style.visibility= 'visible';
			customSubmit='false';
		}
		else if(!isEmail('EmailAddr'))
		{
			document.getElementById('errEmailAddr').innerHTML=alertmessage+'Email Address';
			document.getElementById('errEmailAddr').style.visibility= 'visible';
			customSubmit='false';
		}
		else
		{
			if(!isRequired('CnfEmailAddr'))
			{
				document.getElementById('errCnfEmailAddr').innerHTML=blankmessageforCnfemail+'Confirm Email Address';
				document.getElementById('errCnfEmailAddr').style.visibility= 'visible';
				customSubmit='false';
			}
	
			else if(document.getElementById('EmailAddr').value != document.getElementById('CnfEmailAddr').value)
			{
				document.getElementById('errCnfEmailAddr').innerHTML=alertmessage+'Confirm Email Address';
				document.getElementById('errCnfEmailAddr').style.visibility= 'visible';
				customSubmit='false';
			}
		}

		if(!isRequired("Country"))
		{
			document.getElementById('errCountry').innerHTML=selectmessage+'Country';
			document.getElementById('errCountry').style.visibility= 'visible';
			customSubmit='false';
		}

		/*
		if(!isRequired("Address1"))
		{
		document.getElementById('errAddress1').innerHTML=alertmessage+'Address 1';
		document.getElementById('errAddress1').style.display = 'block';
		customSubmit='false';
		}


		if(!alphaNeumeric("City"))
		{
		document.getElementById('errCity').innerHTML=alertmessage+'City';
		document.getElementById('errCity').style.display = 'block';
		customSubmit='false';
		}


		if(!isRequired("Zip"))
		{
		document.getElementById('errZip').innerHTML=alertmessage+'Zip/Postal Code';
		document.getElementById('errZip').style.display = 'block';
		customSubmit='false';
		}
		else if(!isNeumeric("Zip"))
		{
		document.getElementById('errZip').innerHTML=alertmessage+'Zip/Postal Code';
		document.getElementById('errZip').style.display = 'block';
		customSubmit='false';
		}



		if(!isNeumeric("HomePhone"))
		{
		document.getElementById('errHomePhone').innerHTML=alertmessage+'Home Phone';
		document.getElementById('errHomePhone').style.display = 'block';
		customSubmit='false';
		}

		if(!isNeumeric("WorkPhone"))
		{
		document.getElementById('errWorkPhone').innerHTML=alertmessage+'Work Phone';
		document.getElementById('errWorkPhone').style.display = 'block';
		customSubmit='false';
		}

		if(!radioSelected("Gender"))
		{
		document.getElementById('errGender').innerHTML=alertmessage+'Gender';
		document.getElementById('errGender').style.display = 'block';
		customSubmit='false';
		}

		if(!radioSelected("Choicetype"))
		{
		document.getElementById('errChoicetype').innerHTML=alertmessage;
		document.getElementById('errChoicetype').style.display = 'block';
		customSubmit='false';
		}

		chkCountry();

		*/

		if(!isRequired("Message"))
		{
			document.getElementById('errMessage').innerHTML=blankmessage+'Message';
			document.getElementById('errMessage').style.visibility= 'visible';
			customSubmit='false';
		}

		//document.form1.submit();
		if(customSubmit!='false')
		{
			document.getElementById('sendButton').style.display= 'none';
			document.contactform.submit();
		

		}else{
			document.getElementById('errorMessage').style.display = 'block';
			submitCheck = 'false';
		}
	}
}


function checkEnterConTuctUs(e){

	var characterCode ;

	if(e && e.which){

	e = e;
	characterCode = e.which;
	}
	else{

	e = event;
	characterCode = e.keyCode ;
	}

	if(characterCode == 13){

		goSubmit();
	}
	else{

		contuctUsEnter  ='true';
	}
}


function isRequired(objname)
{

	var val= document.getElementById(objname).value;

	val= val.replace(/^\s*|\s*$/g,'');

	if(val== '' || val == null)
	{
		//alertmessage ='Error Message - is Required';
		return false;

	}
	else
	{return true;}
}


function radioSelected(objname)
{

	for (var i=0; i < eval("document.form1."+objname+".length"); i++)
   	{
   		if (eval("document.form1."+objname+"[i].checked"))
		return true;
   	}
	//alertmessage ='Error Message - please select one';
	return false;

}


function alphaNeumeric(objname)
{
	if(isRequired(objname))
	{
		var objValue=document.getElementById(objname).value;

		var charpos = objValue.search("[^A-Za-z ]"); //charecters and white space
		if(objValue.length > 0 &&  charpos >= 0)
		{	//alertmessage ='Error Message - charecter only';
			return false;
		}
		else {return true;}
	}
}


function isEmail(email)
{
	var objValue= document.getElementById(email).value;
	var strArr = new Array();
	if(isRequired(email))
	{
		if(objValue.indexOf(",")>0)
		{
			//alert("1");
			strArr = objValue.split(",");
			//alert("2");
			for(i=0; i<strArr.length;i++)
			{
			 	//alert("3");
				if(!emailCValidate(strArr[i]))
					return false;
			}
			return true;

		}else{
			return emailCValidate(objValue);
		}

	}
	return false;
}

function emailCValidate(objValue){
			//alert("4");
			var emailId= objValue.replace(/\s+$/, '');
			//alert("5");
			emailId = emailId.replace(/^\s+/, '');
			//alert("6");
			if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailId))
			{
				return true;
			}
			else
			{
				//alertmessage ='Error Message - not a valid email id';
				
					return false;
			}
}

function isNeumeric(objname)
{
	var objValue=document.getElementById(objname).value;
	var charpos = objValue.search("[^0-9 ]");
	if(objValue.length > 0 &&  charpos >= 0)
	{
		//alertmessage ='Error Message - should be neumeric';
		return false;
	}
	else {return true;}

}


/*
function chkCountry()
{
	var country=document.getElementById('Country').value;
	var state = document.getElementById('State').value;
	if(isRequired("Country"))
	{
		if(country=='United States' && state=='')
		{
			document.getElementById('errState').innerHTML=alertmessage+'State ';
			document.getElementById('errState').style.display = 'block';
			customSubmit='false';
		}

	}
	else
	{
		document.getElementById('errCountry').innerHTML=alertmessage+'Country';
		document.getElementById('errCountry').style.display = 'block';
		customSubmit='false';
	}
}

*/

function checkDate()
{
	var fld='jan';
	fld=document.getElementById('month').value+'-';
	fld+=document.getElementById('date').value+'-';
	fld+=document.getElementById('year').value;

	var RegExPattern = /^(?=\d)(?:(?:(?:(?:(?:0?[13578]|1[02])(\/|-|\.)31)\1|(?:(?:0?[1,3-9]|1[0-2])(\/|-|\.)(?:29|30)\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})|(?:0?2(\/|-|\.)29\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))|(?:(?:0?[1-9])|(?:1[0-2]))(\/|-|\.)(?:0?[1-9]|1\d|2[0-8])\4(?:(?:1[6-9]|[2-9]\d)?\d{2}))($|\ (?=\d)))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\ [AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
	var errorMessage = 'Date is not a valid date';
	if ((fld.match(RegExPattern)) && (fld !='')) {
		alert('Date is OK');
	} else {
		alert(errorMessage);
	}
}


/*---------------------------------------------------------------------------------------------------------*/
/*------------------------Below function is for Email to Friend page------------------------------*/
/*---------------------------------------------------------------------------------------------------------*/

function emailtoFriend(objvalue){
	//alert("email to friend"+ value);
	var siteurl = "";
	if(objvalue == 'A'){
	siteurl = "/wps/wcm/jsp/emailToFriend.jsp";
	}else{
		siteurl = "/wps/wcm/jsp/textOnlyemailToFriend.jsp";
	}
	
	var mylocation = winDowOpen.parent.location;
	newWindow = winDowOpen.open (siteurl+"?q="+mylocation,"mywindow","height=428px,width=391px,margin=0px,top=180px,left=240px,resizable=no, location=0, directories=no, status=0, title=no, border=0");
	 
	newWindow.focus();

}

/*function emailtoFriendIR(objvalue){
 alert("email to friend"+ objvalue);
 var siteurl = "";
 alert("email to friend11111111"+ siteurl);
 if(objvalue == 'A'){
 alert("A");
 siteurl = "http://stage-webapp01.jnj.datapipe.net/wps/wcm/jsp/emailToFriend.jsp";
 }else{
 alert("B");
  siteurl = "http://stage-webapp01.jnj.datapipe.net/wps/wcm/jsp/emailToFriend.jsp";
 }
 alert("siteurl1111>>>>>>>>>>"+siteurl);
 var mylocation = winDowOpen.parent.location; 
 alert("mylocation >>>>>>>>>>"+mylocation );
 //newWindow = window.open(siteurl+"?q="+mylocation,"mywindow","height=428px,width=391px,margin=0px,top=180px,left=240px,resizable=no, location=0, directories=no, status=0, title=no, border=0");
 newWindow = window.open("www.tcs.com");

 newWindow.focus();

}*/

function sendMail(){
	//alert("sendMail");
	customSubmit='true';
	var alertmessage="<img height=10px src='../jsp/images/contactus/icon_error.gif' /> "+"Invalid "	;

	//alert(emailToFriendEnter )	;
	if(emailToFriendEnter != false){

		if(!isEmail("FriendEmail"))
		{
			document.getElementById('errFriendEmail').innerHTML=alertmessage+'Email Address';
			customSubmit='false';
		}else{
			document.getElementById('errFriendEmail').innerHTML = '';
		}

		//if (!alphaNeumeric("YourName"))
		if (!isRequired("YourName"))
		{

			document.getElementById('errYourName').innerHTML=alertmessage+'Name Entered';
			customSubmit='false';
		}else{
			document.getElementById('errYourName').innerHTML = '';
		}


		if(!isEmail("YourEmail"))
		{
			document.getElementById('errYourEmail').innerHTML=alertmessage+'Email Address';
			customSubmit='false';
		}else{
			document.getElementById('errYourEmail').innerHTML = '';
		}


		if(customSubmit!='false'){
			document.emailtofriend.submit();
		}
		else{
			document.getElementById('errorMessage').style.display = 'block';
		}

	}
}


function checkEnterEmailToFriend(e){

	var characterCodeEmail ;

	if(e && e.which){
   		e = e;
		characterCodeEmail = e.which;
	}else{
  		e = event;
		characterCodeEmail = e.keyCode ;
	}

	if(characterCodeEmail == 13){

		sendMail();
	}
	else{

		emailToFriendEnter ='true';
	}
}





// to close the window
function closeWindow()
{
	window.close();
}

// This function is called at the time of email to friend page load.
function emailPageLoad()
{
	//alert("emailPageLoad");

	if(document.getElementById('hddnMessage').value !="")
	{
		if(document.getElementById('hddnMessage').value =="true")
			document.getElementById('mailsuccess').innerHTML = 'Your email has been sent successfully.';
		else if(document.getElementById('hddnMessage').value =="false")
			document.getElementById('mailsuccess').innerHTML = 'Your email has not been sent due to some error. Please try again.';

		document.getElementById('successMsg').style.display = 'block';

	}
	else
	{
		document.getElementById('email_content').style.display = 'block';
	}


}

function errorCheckFriendEmail(){
	if(document.getElementById('errFriendEmail').innerHTML != '')
		document.getElementById('errFriendEmail').innerHTML='';


}






function errorCheckYourName(){
	if(document.getElementById('errYourName').innerHTML != '')
		document.getElementById('errYourName').innerHTML='';
}

function errorCheckYourEmail(){
	if(document.getElementById('errYourEmail').innerHTML != '')
		document.getElementById('errYourEmail').innerHTML='';
}


function moreSearchTextOnly(){
	//alert("in more search");
	if(xmlHttp ==null) xmlHttp=getXmlHttpRequestObject();
	var str;
	if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4)
	{

		str = document.getElementById('t').value;

	 	if(str.search('&'))
	 	{
	     		str = str.replace("&","%26");

	 	}
			//alert(str);
		xmlHttp.open("GET", urlAjax+'&q='+str, false);
		xmlHttp.onreadystatechange = handleSearchProductTextOnly;  //calling handleSearchProduct function
		xmlHttp.send(null);
	}
	if(str!=''){
		if(document.getElementById('txtHiddenTextonly1')!=null){
			document.getElementById('txtHiddenTextonly1').value = param;
		}
		//alert(document.getElementById('txtHiddenTextonly1').value);

	}

		var queryStr= document.getElementById('t').value;
		if(queryStr.search('&'))
	 	{
	     		queryStr= queryStr.replace("&","%26");

	 	}
	var url = "/wps/wcm/jsp/textOnlyShowData.jsp"+'?j='+queryStr;

	document.searchform1Text.action =url ;

	document.searchform1Text.submit();
}


function errorFirstName(){
	if(document.getElementById('errFirstName').innerHTML != '')
		document.getElementById('errFirstName').innerHTML='';

}

function errorLastName(){
	if(document.getElementById('errLastName').innerHTML != '')
		document.getElementById('errLastName').innerHTML='';

}


function errorEmailAddr(){
	if(document.getElementById('errEmailAddr').innerHTML != '')
		document.getElementById('errEmailAddr').innerHTML='';

}

function errorCnfEmailAddr(){
	if(document.getElementById('CnfEmailAddr').innerHTML != '')
		document.getElementById('CnfEmailAddr').innerHTML='';

}

function cnfErrorEmailAddr(){
	if(document.getElementById('errCnfEmailAddr').innerHTML != '')
		document.getElementById('errCnfEmailAddr').innerHTML='';

}



function errorErrMessage(){

	if(document.getElementById('errMessage').innerHTML != '')
		document.getElementById('errMessage').innerHTML='';

}

function errorSubject(){

	if(document.getElementById('errSubject').innerHTML != '')
		document.getElementById('errSubject').innerHTML='';

}

function errorCountry(){

	if(document.getElementById('errCountry').innerHTML != '')
		document.getElementById('errCountry').innerHTML='';

}



/*-------------------------------exit window ---------------------- */

  	function MyExitMessage(winURL)	
	{	
		var jnjword = winURL.match("jnj.com");
		var careerword = winURL.match("jnj.com/careers");
		
		var siteurl = '/smartsearchresults.jsp';
		var siteproduct= winURL;
		
		//Web Trends Smart Search tracking enabled code
		var keyword = document.getElementById('requestParam').value;
		//alert("product="+siteproduct + " & keyword=" + keyword);
		//dcsMultiTrack('DCS.dcsuri' , siteurl,'WT.ti','Smart Search Results', 'WT.oss',keyword, 'WT.z_searchlink', siteproduct,'WT.z_searchtype','General Search','WT.oss_r','1') ;
		
		var myURL = winURL;
		var width = 768;
		var height = 576;
		var left = parseInt((screen.availWidth/2) - (width/2));
		var top = parseInt((screen.availHeight/2) - (height/2));
		var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;
		
		if(careerword == "jnj.com/careers"){
			window.open(myURL, "", windowFeatures);		
		} else if(jnjword == "jnj.com"){
			window.location.href = winURL;
		} else {
			var legal_text = "<div style='padding:10px;align:justify'>You are now leaving www.jnj.com. The terms-of-use and privacy policies on other sites may differ from those on www.jnj.com.</div>";
			var win = new Window();			
			Dialog.confirm(legal_text, {width:300, height:100, className: "mac_os_x",okLabel: "OK",buttonClass: "myButtonClass", id: "myDialogId", cancel:function(win) { win.setDestroyOnClose();}, ok:function(win) {{var myURL = winURL;var width = 768;var height = 576;var left = parseInt((screen.availWidth/2) - (width/2));var top = parseInt((screen.availHeight/2) - (height/2));var windowFeatures = "width=" + width + ",height=" + height + ",status=1,toolbar=1,location=1,menubar=1,directories=1,scrollbars=1,resizable=yes,left=" + left + ",top=" + top + "screenX=" + left + ",screenY=" + top;window.open(myURL, "", windowFeatures);return true};}});
	
		}
	}

/*-------------------------------END of exit window ---------------------- */


/*----------------Below function is for  for ticket no # HDLABRZ-0963943 
---------------(Text area size for ContactUs)	-- Saswati ------------------*/


function textCounter(field, countfield, maxlimit) 
 {
	 if (field.value.length > maxlimit) // if too long...trim it!
	 field.value = field.value.substring(0, maxlimit);
	 // otherwise, update 'characters left' counter
	 else
	 countfield.value = maxlimit - field.value.length;
 }