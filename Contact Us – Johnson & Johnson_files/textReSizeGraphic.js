
var midContainerclickCount=0;
var midContainer_ciclickCount=0;
var resultsclickCount=0;
var midContainer_smclickCount=0;
var faqContainerclickcount=0;
var accessibilityclickcount=0;

function performTextReSize()
{
  
  increaseTextSizeById('midcontainer',midContainerclickCount);
  increaseTextSizeById('midcontainer_ci',midContainer_ciclickCount);
  //increaseTextSizeById('results',resultsclickCount);
  increaseTextSizeById('midContainer_sm',midContainer_smclickCount);
  increaseTextSizeById('faqContainer',faqContainerclickcount);
  
  
}

function increaseTextSizeById(divId,clickCount)
{
  if(document.getElementById(divId))
 { 
   
   if(divId=='midcontainer')
   clickCount=midContainerclickCount;
   else if (divId=='midcontainer_ci')
   clickCount=midContainer_ciclickCount;
   else if(divId=='results')
   clickCount=resultsclickCount;
   else if(divId=='midContainer_sm')
   clickCount=midContainer_smclickCount;
   else if(divId=='faqContainer')
   clickCount=faqContainerclickcount;
  
   clickCount=clickCount+1;
   var bodyElement="";
   if(document.getElementById(divId))
   bodyElement = document.getElementById(divId);
   if(clickCount==1)
   {
    
    bodyElement.style.fontSize="1.5em" ;
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="1.5em";
   }
   else if(clickCount==2)
   {
    bodyElement.style.fontSize="2em" ;
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="2em";

    
   }
   else if(clickCount==3)
   {
    bodyElement.style.fontSize="1em" ; 
    if(document.getElementById("textReSizeClick"))
    document.getElementById("textReSizeClick").innerHTML="1em";

   }
   if(clickCount==3)
   clickCount=0;	
   if(divId=='midcontainer')
   midContainerclickCount=clickCount;
   else if (divId=='midcontainer_ci')
   midContainer_ciclickCount=clickCount;
   else if(divId=='results')
   resultsclickCount=clickCount;
   else if(divId=='midContainer_sm')
   midContainer_smclickCount=clickCount;
   else if(divId=='faqContainer')
   faqContainerclickcount=clickCount;
  
      
 }
}

