
function OpenRSSPage()
{
 
 var value=location.href;
 var urlValue="";
 var serverContext=value;
 if(serverContext.indexOf("/wps")!=-1)
 serverContext=serverContext.substring(0,serverContext.indexOf("/wps"));
 var siteAreas=null;
 if(value.indexOf("/")!=-1)
 {
  siteAreas=new Array();
  siteAreas=value.split("/");
  if(siteAreas.length>0)
  {
   value=siteAreas[siteAreas.length-2];
   if(value=="all" || value=="corporate" || value=="financial" || value=="product" || value=="events-speeches")
   urlValue="/wps/wcm/connect/jnj.com development/Development/rss-feed/?feedUrl="+value;
   else 
   urlValue="/wps/wcm/connect/jnj.com development/Development/rss-feed/?feedUrl=all";
   location.href=urlValue;
  }
  
 } 
}
