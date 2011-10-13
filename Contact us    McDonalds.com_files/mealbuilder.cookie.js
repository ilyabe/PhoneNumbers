    var cookieName='itemsAdded';
    var cookie_value;
    var compList_cookieName='compList';
    var exist_session_length=0;
    var items_to_add=null;
    
    /* function to add item(s) to cookie   */  
    
    function addItemstoSession(id,countryLabel)
    {
    
       // alert("======addItemstoSession==2==id=>"+id);
        get_cookie(cookieName+'_'+countryLabel);
        var items_session=null;
        if(cookie_value !=null)
        {
            items_session=cookie_value.split("|");                        
            exist_session_length=items_session.length; 
            items_to_add =cookie_value; 
        }                        
        
        var pids=id.split("|");
        for ( i = 0; i < pids.length; i++ )
        {
        
            var pid=pids[i];
            exist_session_length+=1;
            var itemId=pid+"_"+exist_session_length;
            if(items_session!=null){
                if($.inArray(itemId, items_session)>-1)
                {
                     //alert("Exist");
                     exist_session_length+=1;
                     //alert("Before====>"+itemId);
                     itemId=pid+"_"+exist_session_length;
                    //alert("After====>"+itemId);
                    
                }
            }
            if(items_to_add==null)
            {
                items_to_add=itemId;
            }
            else
            {
                items_to_add+='|'+itemId;
            }
        
        } // for end  
        //alert(cookie_value);
        //alert("items_to_add================>"+items_to_add);
        set_cookie(cookieName+'_'+countryLabel, items_to_add,countryLabel);    
        changevalue(cookieName+'_'+countryLabel);
    
    }
    
    
    /* function to update meal builder items count   */   
    
    function changevalue(cookieName)
    {
        // alert("=====changevalue=========");
        var length=0;   
        get_cookie(cookieName);
        if(cookie_value !=null)
        {
            var pids=cookie_value.split("|")
            length=pids.length;
        }
    
        document.getElementById("viewBuilder").innerHTML = length;
    
    }
    
    
    
    /* function to get cookie value by providing name   */  
    
    function get_cookie(cookieName)
    {
    
        cookie_value=$.cookie(cookieName);
    
    }
    
    
    /* function to clear all the cookie information regarding meal builder   */  
    
    function deleteAllItemsFromSession(countryLabel)
    {
        get_cookie(cookieName + "_" + countryLabel);
        if(cookie_value!=null)
        {
        
            var items_session=cookie_value.split("|");
            for ( i = 0; i < items_session.length; i++ )
            {
                set_cookie('compList'+items_session[i]+'_'+countryLabel, null); 
                set_cookie('revCompList'+items_session[i]+'_'+countryLabel, null);
                set_cookie('optionalList'+items_session[i]+'_'+countryLabel, null);
                set_cookie('reverseItem'+items_session[i]+'_'+countryLabel, null);
            }  
        
        }
        set_cookie(cookieName + "_" + countryLabel, null); 
        changevalue(cookieName + "_" + countryLabel);
        $('#meal_builder_data').hide();
        window.location.reload();
    
    
    }
    
    
    /* function to delete one itemId from  cookie and update   */   
    function deleteItemFromSession(idTodelete,countryLabel)
    {
        var newValue=null;  
        get_cookie(cookieName + "_" + countryLabel);         
        var items_session=cookie_value.split("|");
        if(items_session.length==1)
        {
            //alert("====Only One Value===========");
            deleteAllItemsFromSession(countryLabel);
            return false; 
                  
        }          
        else
        {
            items_session = $.grep(items_session, function(value) {
            return value != idTodelete;
            });
            
            set_cookie('compList'+idTodelete+'_'+countryLabel, null);
            set_cookie('revCompList'+idTodelete+'_'+countryLabel, null);
            set_cookie('optionalList'+idTodelete+'_'+countryLabel,null);
            set_cookie('reverseItem'+idTodelete+'_'+countryLabel,null);
            
            for ( i = 0; i < items_session.length; i++ )            
            {
                if(i==0){
                    newValue=items_session[i];
                
                }else
                
                    newValue+="|"+items_session[i];
                
            } // for end
            
            //alert(newValue);
            set_cookie(cookieName + "_" + countryLabel, newValue);  
            changevalue(cookieName + "_" + countryLabel);  
            return true;  
        
        }// else end
        
    } // function end
    
    
    
    /* function to create cookie   */  
    
    function set_cookie(cookieName,value)
    {
    
        $.cookie(cookieName, value, {path:'/'});
        //$.cookie(cookieName, value, {expires: 1}); 
    
    
    }
    
    
    /* function to add itemid to cookie  */  
    
    function  addItemtoSession(productId,compList,countryLabel)
    { 
    
        addItemstoSession(productId,countryLabel); 
        if(compList!=null && compList!='') 
        { 
            var compListCookie = 'compList';                       
            compListCookie += productId+'_'+exist_session_length+'_'+countryLabel;
            set_cookie(compListCookie, compList,countryLabel);
        }
    
    } 
      
    function addRevItemtoSession(productId,compList,revCompList,countryLabel)
    { 
        addItemtoSession(productId,compList,countryLabel); 
        
        if(revCompList!=null && revCompList!='') 
        { 
            var revListCookie = 'revCompList';                       
            revListCookie += productId+'_'+exist_session_length+'_'+countryLabel;
            set_cookie(revListCookie, revCompList,countryLabel);
        }
    
    }
    
    function addReverseItemtoSession(productId,compList,revCompList,selOptionalItems,masterItemId,countryLabel)
    { 
        //alert("Product Id :: " + productId + " Master Id :: " + masterItemId);
        var revTrackedItemId = productId;
        if(masterItemId!=null && masterItemId!='')
        {
            productId = masterItemId;
            addItemtoSession(masterItemId,compList,countryLabel);
            var reverseItemCookie = 'reverseItem'+productId+'_'+exist_session_length+'_'+countryLabel;
            set_cookie(reverseItemCookie,revTrackedItemId);
        }
        else
            addItemtoSession(productId,compList,countryLabel); 
        
        if(revCompList!=null && revCompList!='') 
        { 
            var revListCookie = 'revCompList';                       
            revListCookie += productId+'_'+exist_session_length+'_'+countryLabel;
            set_cookie(revListCookie, revCompList);
            var optionalListCookie = 'optionalList';
            optionalListCookie += productId+'_'+exist_session_length+'_'+countryLabel;
            set_cookie(optionalListCookie, selOptionalItems);
        }
    
    }
    /* function to update oldId with newId  */   
    
    function updateCookie(oldId,newId,countryLabel)
    {  
        //alert("=====updateCookie=======");
        var newValue=null;
        get_cookie(cookieName+'_'+countryLabel);
        //alert("oldValue=====>"+cookie_value);
        var items_session=cookie_value.split("|");
        var position=$.inArray(oldId, items_session);
        //alert(position);
        items_session[position]=newId;
        
        for ( i = 0; i < items_session.length; i++ )            
        {        
            if(i==0){
            newValue=items_session[i];
            
            }else                    
            newValue+="|"+items_session[i];        
        }
        //alert("newValue=====>"+newValue);
        set_cookie('compList'+oldId+'_'+countryLabel, null); 
        set_cookie('revCompList'+oldId+'_'+countryLabel, null);
        set_cookie('optionalList'+oldId+'_'+countryLabel,null);        
        set_cookie('reverseItem'+oldId+'_'+countryLabel,null);
        set_cookie(cookieName+'_'+countryLabel, newValue); 
    
    }  
    
    
    /* function to get current meal builder size  */  
      
    function getExistMealbuilderLength(countryLabel) 
    {
    
        var exist_builder_length=0;
        get_cookie(cookieName+'_'+countryLabel);
        if(cookie_value !=null)
        {
            var items_session=cookie_value.split("|");                        
            exist_builder_length=items_session.length;
        }
        
        return exist_builder_length;
    }
    
