    var loaderHtmlSummary = '<span id="loaderImage" style="position:absolute;#margin-left:6px;"><object width="20" height="20" align="absmiddle"><param name="movie" value="/swf/loader.swf" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#0000ffff"><embed src="/swf/loader.swf" width="20" height="20" wmode="transparent" bgcolor="#0000ffff" style="padding-left:6px;#padding-left:6px;"></embed></object></span>';  
    
    function deleteMeals(countryLabel)
    {                   
     deleteAllItemsFromSession(countryLabel); 
     //alert("Delete Meals");
    }
    /*
    function getProductList(selComponent, selOptionalItem, mealItemId, changeValue)
    {
        var itemList = $.cookie('itemsAdded');
        var itemListTotal = $.cookie('meal_total_url');
        var pids=itemList.split("|");
        var pidsTotal;
        if(itemListTotal!=null) 
            pidsTotal = itemListTotal.split("|");
        var productList = '';
        var separator = '';
                        
        for ( i = 0; i < pids.length; i++ )
        {
            var pid=pids[i];
            var pidTotal = '';
            if(pidsTotal!=null)
                pidTotal = pidsTotal[i];
            
            if(pid!=null && pid!='')
            {
                var ItemInfo=pid.split("_");
                var itemId=ItemInfo[0];
                var complist=$.cookie('compList'+pid); // Unselected Component List
                var selCompList = '';
                var selOptionalItemList = '';
                alert(pid+'=='+mealItemId);
                if(pid==mealItemId || (changeValue=='multi' && pid==mealItemId))
                {
                    if(complist!=null && complist!='')
                    {
                        if(selComponent!='')
                        {
                        // Selected Component List without Optional Items
                        selCompList = '$' + selComponent;
                        // Selected Optional Items List
                        selOptionalItemList = '$' + selOptionalItem;
                        }
                        // Item Id and Unselected Component List
                        itemId = itemId + ',' + complist;
                    }
                    
                    productList = productList + separator + itemId + selCompList + selOptionalItemList;
                    if(separator=='') separator='|';
                }
                else if(changeValue!='delete')
                {
                    if(pidsTotal==null || pidsTotal[i]=='')
                    {
                        pidTotal = itemId;
                        if(complist!=null && complist=='')
                            pidTotal = pidTotal + ',' + complist;
                    }
                    productList = productList + separator + pidTotal;
                    if(separator=='') separator='|'; 
                }
                
            }
        }
        
        $.cookie('meal_total_url', productList, {path:'/'});
        return productList;
    }*/
    
    function getProductList(countryLabel)
    {
        var itemList = $.cookie('itemsAdded_'+countryLabel);
        var pids=itemList.split("|");
        var productList = '';
        var separator = '';
        for ( i = 0; i < pids.length; i++ )
        {
            var pid=pids[i];
            if(pid!=null && pid!='')
            {
                var itemDetail = '';
                var ItemInfo=pid.split("_");
                itemDetail =ItemInfo[0];
                var compList=$.cookie('compList'+pid+'_'+countryLabel);
                var revCompList=$.cookie('revCompList'+pid+'_'+countryLabel);
                var optionalList=$.cookie('optionalList'+pid+'_'+countryLabel);
                var reverseItemId=$.cookie('reverseItem'+pid+'_'+countryLabel);
                if(compList!=null && compList!='')
                {
                    itemDetail = itemDetail + ',' + compList;
                    if(revCompList!=null && revCompList!='')
                    {
                        itemDetail += '$' + revCompList;
                        if(optionalList!=null && optionalList!='')
                            itemDetail += '$' + optionalList;
                    } 
                }
                else if(reverseItemId!=null && reverseItemId!='')
                {
                    itemDetail = reverseItemId;
                }
                
                productList += separator + pid + ":" + itemDetail;
                if(separator=='') separator='|';
            }
        }
        
        return productList;
    }
    
    var callCounter = 1;
    var country = 'US';
    var mealAjaxObj = null;
    function getTotalVal(countryCode, countryLabel, showItems)
    {
        var productList = getProductList(countryLabel);
        country = countryCode;
        url = '/getnutrition/mealBuilderInfo.do?products='+productList+'&countryCode='+countryCode+'&liveData=true&mealBuilderItemDetail='+showItems; 
        //alert("url :: " + url);
        if(mealAjaxObj != null) mealAjaxObj.abort();
        mealAjaxObj = $.ajax({
            url: url,
            type: 'GET',
            data: '',                                                                    
            cache: false,
            timeout : '60000',                                                                                                 
            error: function()
            {
                if(callCounter<=3)
                {
                    getTotalVal(countryCode, countryLabel, showItems);
                    callCounter ++;
                }
                return false;   
            },
            success: function(html)
            {
                //alert(html); 
                var startIndex =html.indexOf("<!--mealbuilderstart-->"); 
                var endIndex = html.indexOf("<!--mealbuilderend-->");
                var flyOut = html.substring(startIndex,endIndex);
                if(flyOut!=null && flyOut!='') 
                {   
                    $('#meal_builder_calc').html(flyOut);
                }
                // to display the list of added items on the Meal builder page
                if(showItems=='true') {
                    var startIndex =html.indexOf("<!-- itemDetailStart -->"); 
                    var endIndex = html.indexOf("<!-- itemDetailEnd -->");
                    var itemData = html.substring(startIndex,endIndex);
                    if(itemData!=null && itemData!='') 
                    {   
                        $('#calc_list').html(itemData);
                    }
                }
                callCounter = 1;
                // to display the meal builder data
                $('#calc_total h1 #loaderImage').remove();
                $('#loadingSwf').remove();
                $('#meal_builder_data').css("display","block");
                $('#calc_total').show(); // show summary 
                $('#calc_divide').show(); 
            } 
         });
               
    }
         
    function showSummmary(productId) 
    {
           
        
         //alert("showSummmary==========>"+productId); 
        
        $('#nutrition_wrappers'+productId+' .percent').each(function(){
              
                var id = this.id;
                if(id !='')
                {
                
                    //alert("id====>"+id);
                    var sub=$(this).html().trim(); 
                    //alert("sub====>"+sub+"========length=======>"+sub.length);
                    var value =0;
                    var index = sub.trim().indexOf('%'); 
                   
                    if(index>-1)
                    {
                        
                        value= parseFloat(sub.substring(1, index));
                   
                    } 
                    var tableValue=$('#summary tbody tr #'+id).text();                      
                    var index2 = tableValue.indexOf('%'); 
                    if(index2>-1)
                    {
                    tableValue= parseFloat(tableValue.substring(1,index2)); 
                    //alert("tableValue==percent===>"+tableValue); 
                    
                    }  
                   
                    var sumValue=tableValue;
                    if(!isNaN(value))
                    sumValue=parseFloat(sumValue+value);
                                    
                    $('#summary tbody tr #'+id).html('('+sumValue+'%)');
                
                }
                
                //$('#meal_builder_data').css("display","block"); 
               // $('#calc_total').show(); // show summary
                
       
        }); 
        
        
              
        $('#nutrition_wrappers'+productId+' .large_number').each(function() 
        { 
                       
                var id = this.id;
                //alert("id====>"+id);
                //alert($(this).children().html());
                var sub=$(this).children().html();                        
                var value = parseFloat($(this).text());                
                //alert("value===>"+value);
                if(id !='')
                {
                    
                    var percentValue=$('#summary tbody tr #'+id).children();
                    /*
                    if(percentValue.html()==0 || percentValue.html()==null){
                    
                       percentValue.html('(0%)');
                    } */
                    var sumValue=parseFloat($('#summary tbody tr #'+id).text());
                    if(!isNaN(value))
                     sumValue+=value;
                     
                    
                    
                    $('#summary tbody tr #'+id).html(sumValue+sub).append(percentValue);  
                                     
                }
        
        }); 
        
        $('#loadingSwf').remove();
        $('#meal_builder_data').css("display","block");
        $('#calc_total').show(); // show summary 
        $('#calc_divide').show();  
    
    
    }
    
    
    
    function getItems(cookie_value,countryCode,appStyle,countryLabel)
    {
        
        if(cookie_value!=null && cookie_value!=''){
            getTotalVal(countryCode,countryLabel,'true'); 
        } 
        else
        {
            $('#loadingSwf').remove();
            $('#meal_builder_data').css("display","none"); 
            $('#mealbuilder_css').attr('href','/themes/'+appStyle+'/css/emptymealbuilder.css');
            $('#empty_meal_builder').css("display","block"); 
        }
    
    }  
     
    var counter = 1;
    //var prevItem = '';
    
    function getProductDetails(pid,countryCode,countryLabel)             
    {               
            var pars='';
            var ItemInfo=pid.split("_");                                       
            var itemId=ItemInfo[0];
            var complist=$.cookie('compList'+pid+'_'+countryLabel);
            var revCompList = $.cookie('revCompList'+pid+'_'+countryLabel);
            var selOptionalList = $.cookie('optionalList'+pid+'_'+countryLabel);
            var reverseItemId = $.cookie('reverseItem'+pid+'_'+countryLabel);
            if(complist!=null && complist!='')
            {                      
                mode='Recalculate';
                pars+= 'mode='+mode+'&complist='+complist;
                if(revCompList!=null && revCompList!='')
                {
                    pars += '&reverseItem='+revCompList;
                }
                if(selOptionalList!=null && selOptionalList!='')
                {
                    pars += '&selectedOptionalComponents='+selOptionalList;
                }
            }
            else if(reverseItemId!=null && reverseItemId!='')
            {
                pars = 'mode=recalculate&reverseTrackedItemId='+reverseItemId; 
            }
              
            var _html_str  = '<div  style="margin-top:20px;margin-left:200px;"><object width="50" height="50"><param name="movie" value="/swf/loader.swf" />';
                                   _html_str += '<param name="wmode" value="transparent" /><param name="bgcolor" value="#0000ffff">';
                                   _html_str += '<embed src="/swf/loader.swf" width="50" height="50" wmode="transparent" bgcolor="#0000ffff"></embed></object></div>';
            $('#item_body'+pid).html(_html_str);
              
            url ='/getnutrition/itemDetailInfo.do?item='+itemId+'&liveData=true&showFlyOut=no&mealBuilder=yes&countryCode='+countryCode+'&divId='+pid;
            
            $.ajax({
            
                        url: url,
                        type: 'GET',
                        data: pars,                                                                    
                        cache: false,                                                                                                      
                        error: function(){
                                
                            if(counter<=3)
                            {
                                //alert("Trying for==="+pid+"===>"+counter); 
                                getProductDetails(pid,countryCode,countryLabel);
                                counter++;
                            }                            
                        },
                        success: function(html){
                            // alert(html);
                            var startIndex =html.indexOf("<!--maelbuilderbodystart-->"); 
                            var endIndex = html.indexOf("<!--maelbuilderbodyend-->");
                            
                            var flyOut = html.substring(startIndex,endIndex);
                            //alert("Test");
                            //$('#loadingSwf').show();
                               
                            if(flyOut!=null && flyOut!='')
                            {
                                $('#item_body'+pid).html(flyOut);
                            }
                            
                            counter = 1;
                            //prevItem = '';
                        } 
            });
    
    
    }
                
 
 /* getProductDetails method end */
  
        function show(id)
        {
            $('#item_head'+id).each(function()
            { 
             
                    var  _a = $(this).next('.calc_item_body'); 
                    if ($(_a).is(':visible'))
                    { 
                        $(_a).hide();
                        //$(_a).remove(); 
                        $(this).removeClass('active');
                    } 
                    else 
                    { 
                        //alert("Test");
                        //$('#loadingSwf').show();
                        /*var _html_str  = '<div  style="#m argin-top:41px;mar gin-left:20px;"><object width="50" height="50"><param name="movie" value="/swf/loader.swf" />';
                               _html_str += '<param name="wmode" value="transparent" /><param name="bgcolor" value="#0000ffff">';
                               _html_str += '<embed src="/swf/loader.swf" width="50" height="50" wmode="transparent" bgcolor="#0000ffff"></embed></object></div>';
                        $('#calc_list #mealLoader').html(_html_str);*/
          
                        getProductDetails(id,'US','us_en');
                        if(!_a) {
                            _a = $(this).next('.calc_item_body');
                        }
                        $(_a).slideDown(); 
                        $(this).addClass('active');
                        
                        var mutexClasses = []; 
                        var mutexId = '';
                        var count = 0;
                         
                        $('dd',_a).each(function(i){
                           var classList = $(this).attr('class').split(' ');
                           
                           if(classList.length>1)
                           {
                               if(!(mutexId==classList[1] || classList[1]==''))
                               {
                                   mutexId = classList[1];
                                   mutexClasses[count] = mutexId;
                                   count++;
                                   //alert("MutexId :: " + mutexId + " Count:: " + count);
                               }
                           }
                        }); 
                        
                        for(var i=0; i<mutexClasses.length; i++) {
                            if(!($('dd:first').hasClass(mutexClasses[i])))
                                $('dd.'+mutexClasses[i]+':first').css("margin-top","8px");
                            $('dd.'+mutexClasses[i]+':last').css("padding-bottom","20px");
                        }
                    }
                    // enable_buttons();
                    return false; 
            
            }); 
        }  
       
    
        function getRecalculateDetails(itemId,url,selComp,selOptionalItem,countryLabel)
        { 
                currentItem = itemId;
               // $('#item_body'+itemId+' dd#'+selComp).css("background-image","url('/themes/Default/images/loader.gif')");
               
               var _html_str  = '<span style="position:absolute;margin-left:-5px;#margin-left:0px;"><object id="loaderImage" width="12" height="12" align="absmiddle"><param name="movie" value="/swf/loader.swf" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#0000ffff"><embed src="/swf/loader.swf" width="12" height="12" wmode="transparent" bgcolor="#0000ffff" style="padding-left:6px;#padding-left:10px;"></embed></object></span>';                                
                $('#item_body'+itemId+' dd#'+selComp).css("background-image","none");
                var currentHtml = $('#item_body'+itemId+' dd#'+selComp).html();
                $('#item_body'+itemId+' dd#'+selComp).html(_html_str + currentHtml);
                
                $('#calc_total').css("z-index","10");
                //$('#item_body'+itemId+' dl').html('<div style="position: absolute; z-index:1; width: '+$('#item_body'+itemId+' dl').width()+'px; height: '+$('#item_body'+itemId+' dl').height()+'px; background-image:url(/themes/Default/images/white_screen.png)"></div>' + $('#item_body'+itemId+' dl').html()); 
                $('#item_body'+itemId+' .ingredient_list').html('<div style="position: absolute; z-index:1; width: '+$('#item_body'+itemId+' .ingredient_list').width()+'px; height: '+$('#item_body'+itemId+' .ingredient_list').height()+'px; background-image:url(/themes/Default/images/white_screen.png)"></div>' + $('#item_body'+itemId+' .ingredient_list').html()); 
                if($('#calc_total h1 #loaderImage').length==0)
                    $('#calc_total h1').append(loaderHtmlSummary);   
                  
                $.ajax({
                
                        url: url,
                        type: 'GET',
                        data: '',                                                                    
                        cache: false,
                        timeout : '20000',                                                                                                 
                        error: function()
                        {
                            if(counter<=3)
                            {
                                //alert("RE country label :: " + countryLabel);
                                getRecalculateDetails(itemId,url,selComp,selOptionalItem,countryLabel);
                                counter++;
                            }
                            //alert("Total countryLabel 1 :: " + countryLabel);
                            return false;   
                        },
                        success: function(html)
                        {
                                //alert("Total countryLabel 2:: " + countryLabel); 
                                var startIndex =html.indexOf("<!--maelbuilderbodystart-->"); 
                                var endIndex = html.indexOf("<!--maelbuilderbodyend-->");
                                var flyOut = html.substring(startIndex,endIndex);
                                //alert("flyOut===>"+flyOut);
                                if(flyOut!=null && flyOut!='') 
                                {   
                                    $('#item_body'+itemId).html(flyOut);
                                    getTotalVal(country,countryLabel,'false');
                                }
                                
                                var _a = $('#item_body'+itemId);
                                var mutexClasses = []; 
                                var mutexId = '';
                                var count = 0;
                                 
                                $('dd',_a).each(function(i){
                                   var classList = $(this).attr('class').split(' ');
                                   
                                   if(classList.length>1)
                                   {
                                       if(!(mutexId==classList[1] || classList[1]==''))
                                       {
                                           mutexId = classList[1];
                                           mutexClasses[count] = mutexId;
                                           count++;
                                           //alert("MutexId :: " + mutexId + " Count:: " + count);
                                       }
                                   }
                                }); 
                                
                                for(var i=0; i<mutexClasses.length; i++) {
                                    if(!($('dd:first').hasClass(mutexClasses[i])))
                                        $('dd.'+mutexClasses[i]+':first').css("margin-top","8px");
                                    $('dd.'+mutexClasses[i]+':last').css("padding-bottom","20px");
                                }
                                
                                counter = 1;
                        } 
                
                });  
        }  
    
    


        function updateSummary()
        {
        
                //alert("=====Update table====");
                $('#calc_total table td span.sub ').each(function() 
                
                {  
                
                    var nutritionData = $('#calc_list');
                    var id = this.id;
                         
                    var value=0;
                    if(id!='' && id!=null) 
                    {
                       //alert("id===>"+id); 
                        $('.nutrition_wrapper #'+id,nutritionData).each(function()
                        {  
                        
                            //alert("detail=====>"+$(this).html()); 
                            var sub=$(this).html().trim();
                            var index = sub.indexOf('%');
                            if(index>-1)
                            {
                                if(!isNaN(parseFloat(sub.substring(1,index))))
                                value+=parseFloat(sub.substring(1,index));
                            }
                        
                        
                        });
                        
                       
                    
                    }  
                    $(this).html('('+value+'%)')
                    
                });
                
                
                $('#calc_total table td.data ').each(function() 
                { 
                    var nutritionData = $('#calc_list');
                    var id = this.id;
                    //alert("id===>"+id); 
                    var sub='';                        
                    var value = 0;
                    var percentValue=$(this).children();  
                    
                    $('.nutrition_wrapper #'+id, nutritionData).each(function() 
                    { 
                    
                        //alert("detail=====>"+$(this).html());
                        if(!isNaN(parseFloat($(this).html())))
                        value += parseFloat($(this).html());
                        sub=$(this).children().html();
                        //alert("value 2========>"+value);
                    
                    });
                    
                    
                    $(this).html(value+sub).append(percentValue); 
                    
                
                }); 
        }
        


        function getRecalculateMultiDetails(oldItemId,itemId,url,countryLabel)
        { 
            //alert("=========getRecalculateDetails()==========");
            //currentItem = itemId;
            updateCookie(oldItemId,itemId,countryLabel); 
            var loaderHtml ='<span style="position:absolute"><object id="loaderImage" width="20" height="20" align="absmiddle" ><param name="movie" value="/swf/loader.swf" /><param name="wmode" value="transparent" /><param name="bgcolor" value="#0000ffff"><embed src="/swf/loader.swf" width="20" height="20" wmode="transparent" bgcolor="#0000ffff" style="padding-left:4px"></embed></object></span>'; 
            $('#item_body'+oldItemId+' #product_detail_name .product_detail_name').append(loaderHtml);
            $('#calc_total h1').append(loaderHtmlSummary);
            
            $.ajax(
            {
            
                url: url,
                type: 'GET',
                data: '',                                                                    
                cache: false,
                timeout : '20000',                                                                                                 
                error: function()
                {
                    if(counter <= 3)
                    {
                        getRecalculateMultiDetails(oldItemId,itemId,url,countryLabel);
                        counter++;
                    }  
                    return false;   
                },
                success: function(html)
                {
                    //alert(html); 
                    var bodyStartIndex =html.indexOf("<!--maelbuilderbodystart-->"); 
                    var bodyEndIndex = html.indexOf("<!--maelbuilderbodyend-->");
                    var headStartIndex =html.indexOf("<!--maelbuilderstart-->"); 
                    var headEndIndex = html.indexOf("<!--maelbuilderheadend-->");
                    
                    var headHtml = html.substring(headStartIndex,headEndIndex);
                    var bodyHtml = html.substring(bodyStartIndex,bodyEndIndex);
                   
                    if(bodyHtml!='' && headHtml !='')
                    {
                        $('#item_head'+oldItemId).replaceWith(headHtml);                    
                        $('#item_body'+oldItemId).html(bodyHtml);
                        $('#item_body'+oldItemId).attr('id','item_body'+itemId);                    
                        getTotalVal(country,countryLabel,'false');                     
                    }           
                
                    counter = 1;
                    
                } 
            
            });
        
        }  
        