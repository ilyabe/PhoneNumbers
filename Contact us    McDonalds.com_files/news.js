function content_resize() {
         var w = $( window );
         var H = w.height();
         $('#overlay').css( {height: H-200} );
    }
$(document).ready(function() {
    $( window ).resize( content_resize );
    content_resize();
}); 
    
    
/*
    *   JavaScript function that retrieves the values for News Title and News Overlay Description 
    *   from other HTML page through ajax call.
    */
    
    function showNewsOverlay(newsPagePath,currentPagePath,currentNodePath,dateFormat)            
    {  
     
       /* var pagePath = document.getElementById("pagePath");
        var newsPageUrl = document.getElementById("newsPageUrl");
        var printDateFormat = document.getElementById("dateFormat");
        var printDateText = document.getElementById("dateText");
        var printPageEncoding = document.getElementById("pageEncoding");
        
        if(pagePath != null)
            pagePath.value = currentPagePath;
            
        if(newsPageUrl != null)
            newsPageUrl.value = newsPagePath;
                 
        if(printDateFormat != null)
            printDateFormat.value = dateFormat;
        else
            printDateFormat.value = 'dd/MM/yyyy';*/
            
        var newsPageUrl = document.getElementById("newsPageUrl"); 
        
         if(newsPageUrl != null)
            newsPageUrl.value = newsPagePath;    
                        
        url =  currentPagePath + '.newsoverlay.html';
        
          
        var pars = 'newsPageUrl=' + newsPagePath + '&dateFormat='+ dateFormat + '&currentNodePath=' + currentNodePath;
        
        $.ajax({
            url: url,
            type: 'GET',    
            timeout: 120000,
            data: pars, 
            cache: false,   
            error: function(){
                  //alert("Error1:Loading XML Retrieve");   
            },
            success: function(xml){
                
                if(document.getElementById("newsHeader")!=null){
                    document.getElementById("newsHeader").innerHTML = xml;                  
                    getContent(newsPagePath);
                    
                    $("#news_share_options #news_email").mcdColorbox({ iframe: true, innerWidth: 790, innerHeight: 600 });
                }
                
            }
        });
   
    } 

    /*
    *   JavaScript function that reads the data from a HTML page through AJAX call.
    */
    
    function getContent(pageUrl)            
    {  
     
        // URL for testing
        
        url = pageUrl+".html";
        
        var pars = '';
    
        $.ajax({
            url: url,
            type: 'GET',    
            timeout: 120000,
            data: pars, 
            cache: false,   
            error: function(){
                    //alert("Error2:Loading XML Retrieve"); 
            },
            success: function(xml){
                
                var data = getBody(xml);
                

                if(document.getElementById("overlay")!=null){
                    document.getElementById("overlay").innerHTML = data;
                content_resize(); // resizing the height of div..
                grayOut('basicModalContent',true); return false;                    
                    
                }
            }
        });
   
    } 

    /*
    *   JavaScript function to get the data from a HTML page
    *   within the specified (<startnews> & </startnews>) tags
    */
    
    function getBody(content) 
    { 
       var x = content.indexOf("<startnews");
       x = content.indexOf(">", x);    
       var y = content.lastIndexOf("</startnews>"); 
       return content.slice(x + 1, y);
    }     
    

            function NewWindow(mypage, myname, w, h, scroll) 
            {
            //alert("My Page : " + mypage);
                var winl = (screen.width - w) / 2;
                var wint = (screen.height - h) / 2;
                winprops = 'height='+h+',width='+w+',top='+wint+',left='+winl+',scrollbars='+scroll+',resizable';
                win = window.open(mypage, myname, winprops);
                if (parseInt(navigator.appVersion) >= 4) { win.window.focus(); }
            }
            function printerFriendly(currentPagePath,currentNodePath,dateFormat)
            {
                
                var newsPageUrl = document.getElementById("newsPageUrl");
                      
                var formActionn = currentPagePath +".printnews.html?pagePath=" + currentPagePath + "&newsPageUrl=" + newsPageUrl.value + "&dateFormat=" + dateFormat + "&currentNodePath=" + currentNodePath;
                NewWindow(formActionn,'name','700','620','yes');  
            }
      
 
    