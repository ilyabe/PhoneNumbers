// JavaScript Document
// JavaScript Document

function grayOut(divelem,vis, options) {

  // Pass true to gray out screen, false to ungray
  // options are optional.  This is a JSON object with the following (optional) properties
  // opacity:0-100         // Lower number = less grayout higher = more of a blackout 
  // zindex: #             // HTML elements with a higher zindex appear on top of the gray out
  // bgcolor: (#xxxxxx)    // Standard RGB Hex color code
  // grayOut(true, {'zindex':'50', 'bgcolor':'#0000FF', 'opacity':'70'});
  // Because options is JSON opacity/zindex/bgcolor are all optional and can appear
  // in any order.  Pass only the properties you need to set.   
  var gspMain = document.getElementById('document_wrapper'); 
  var centerColumn = document.getElementById('content_section');

    
  
  var dlg = document.getElementById(divelem)  
  var options = options || {}; 
  var zindex = options.zindex || 50;
  var opacity = options.opacity || 60;
  var opaque = (opacity / 100);
  var bgcolor = options.bgcolor || '#000';
  var dark=document.getElementById('darkenScreenObject');
  if (!dark) {
    // The dark layer doesn't exist, it's never been created.  So we'll
    // create it here and apply some basic styles.
    // If you are getting errors in IE see: http://support.microsoft.com/default.aspx/kb/927917
    var tbody = document.getElementsByTagName("body")[0];
    var tnode = document.createElement('div');           // Create the layer.
        tnode.style.position='absolute';                 // Position absolutely
        tnode.style.top='0px';                           // In the top
        tnode.style.left='0px';                          // Left corner of the page
        tnode.style.overflow='hidden';                   // Try to avoid making scroll bars            
        tnode.style.display='none';                      // Start out Hidden
        tnode.id='darkenScreenObject';                   // Name it so we can find it later
    tbody.appendChild(tnode);                            // Add it to the web page
    dark=document.getElementById('darkenScreenObject');  // Get the object.
    dlg.style.display = "block"
  }
  if (vis) {
    //gspMain.style.overflow='visible';
    //centerColumn.style.overflow='visible';
    // Calculate the page width and height 

    var pageHeight = '';
    var pageWidth = '';
    if (window.innerHeight && window.scrollMaxY) {// Firefox

        pageHeight = window.innerHeight + window.scrollMaxY;
        pageWidth = window.innerWidth + window.scrollMaxX - 17;
        //alert("pageHeight-F :"+pageHeight );
        //alert("pageWidth-F :"+pageWidth );

    } else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
        pageHeight = document.body.scrollHeight;
        pageWidth = document.body.scrollWidth;
        //alert("pageHeight-I :"+pageHeight );
        //alert("pageWidth-I :"+pageWidth );
    } else { // works in Explorer 6 Strict, Mozilla (not FF) and Safari
        pageHeight = document.body.offsetHeight;
        pageWidth = document.body.offsetWidth;
        //alert("pageHeight-N :"+pageHeight );
        //alert("pageWidth-N :"+pageWidth );
    }
   
    //var pageWidth='100%';
    //var pageHeight='100%'; 
    var pageHeight1 =document.body.scrollHeight;
    var pageHeight2 =document.body.offsetHeight
    //set the shader to cover the entire page and make it visible.
    dark.style.opacity=opaque;                      
    dark.style.MozOpacity=opaque;                   
    dark.style.filter='alpha(opacity='+opacity+')'; 
    //alert("zindex : " + zindex);
    dark.style.zIndex=zindex;        
    dark.style.backgroundColor=bgcolor; 
    if( pageHeight1 < pageHeight2 ) 
    {
        dark.style.width= pageWidth + 'px';
        dark.style.height= pageHeight2 + 10 + 'px';
    }
    else
    {
        dark.style.width= pageWidth + 'px';
        dark.style.height= pageHeight + 'px';
    }
    dark.style.display='block';
    dlg.style.display = "block";                 
  } else {

        //gspMain.style.overflow='hidden';
        //centerColumn.style.overflow='hidden';
     dark.style.display='none';
     dlg.style.display = "none";
  }
}
