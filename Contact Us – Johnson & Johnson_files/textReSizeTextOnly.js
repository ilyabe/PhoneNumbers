
var midContainer_ciclickCount=0;

function performTextReSizeForTextOnly()
{
  increaseTextSizeByIdForTextOnly('midcontainer_ci_text',midContainer_ciclickCount);
}

function increaseTextSizeByIdForTextOnly(divId,clickCount)
{
  if(document.getElementById(divId))
 { 
   clickCount=midContainer_ciclickCount;
   clickCount=clickCount+1;
   var bodyElement = document.getElementById(divId);
   if(clickCount==1)
   {
    bodyElement.style.fontSize="1.5em" ;
    /*if(document.getElementById("results_textonly"))
    document.getElementById("results_textonly").style.fontSize="1.5 em" ;*/
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="1.5em";

     
   
   }
   else if(clickCount==2)
   {
    bodyElement.style.fontSize="2em" ;
    /*if(document.getElementById("results_textonly"))
    document.getElementById("results_textonly").style.fontSize="2 em" ;*/
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="2em";


    
   }
   else if(clickCount==3)
   {
    bodyElement.style.fontSize="1em" ; 
    /*if(document.getElementById("results_textonly"))
    document.getElementById("results_textonly").style.fontSize="1 em" ;*/
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="1em";


    
   }
   if(clickCount==3)
   clickCount=0;	
   midContainer_ciclickCount=clickCount;
     
 }
}

