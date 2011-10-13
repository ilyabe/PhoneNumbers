var navsubtimer=null;
var navhovertimer=null;
var slideTimer=null;
jQuery.noConflict();

	jQuery(document).ready(function(){
	       var prevhoverobj=null;
		     var currthoverobj=null;
          

			jQuery(".show-sub-menu").mouseover(function(event){



				 jQuery(".nav_sub").not(jQuery(this).children("div")).slideUp(100);

				 currthoverobj=this;

				     clearNavTimer();



				navhovertimer=setTimeout(function(){

				if(!jQuery(currthoverobj).children("div").is(":visible")){


					if(jQuery(".nav").outerHeight() ==101 || jQuery(".nav").outerHeight() >=200){

				 jQuery(".nav_sub").slideUp(100);
				  prevhoverobj=currthoverobj;

				  jQuery(prevhoverobj).children("div").find("li").css("opacity","0");
				 jQuery(prevhoverobj).children("div").find("li").css("padding-bottom","8px");
				

				   if(jQuery(".nav").outerHeight()==101){
				 	  
					   jQuery(".nav").animate({height:240},400,'linear',function(){
                                              
                                           });
                                            jQuery(prevhoverobj).children("div").find("li").animate({paddingBottom:3,opacity:1},300);
                                             jQuery(prevhoverobj).children("div").slideDown(500);
                                            jQuery(".nav").animate({height:250},40);
				   }  if(jQuery(".nav").outerHeight()==250){
                                              jQuery(prevhoverobj).children("div").find("li").animate({paddingBottom:3,opacity:1},300);
                                                jQuery(prevhoverobj).children("div").slideDown(50);
                               
                                       }
				      



				   jQuery(".show-sub-menu >a").removeClass("nav-hover");
				   jQuery(prevhoverobj).children("a").addClass("nav-hover");

					}
				}
												  },200);


			}).mouseout(function(){

			  var navsubobj=jQuery(this);

				 clearNavTimer();


				  navsubtimer=setTimeout(function(){
                                              jQuery(".nav").animate({height:240},40);
                                              clearTimeout(slideTimer);
                                              slideTimer=null;
                                                 jQuery(".nav_sub").slideUp(1);
						 
						 jQuery(".nav").animate({height:101},400);

					   jQuery(".show-sub-menu >a").removeClass("nav-hover");
					prevhoverobj=null;

				  },300);

			 	 return false;

			});
			

	});

	function clearNavTimer(){
		       clearTimeout(navsubtimer);
				navsubtimer=null;
				clearTimeout(navhovertimer);
				navhovertimer=null;

	}