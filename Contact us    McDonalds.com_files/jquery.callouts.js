/*
    Animate Callouts 
*/
;(function($){
    $.fn.callouts = function(system_options, args){
        defaults = { 
            background_start_top : '0px',
            background_start_left : '0px',
            background_top  :   '-12px',
            background_left :   '0px',
            background_rate :   300,
            background_selector : 'a img:first',
            message_selector : 'a div.msg',
            message_1_top   :   '133px',
            message_1_left  :   '0px',
            message_1_rate  :   100,
            message_2_top   :   '88px',
            message_2_left  :   '0px',
            message_2_rate  :   200
        }
        /*
         * Extend arguments
         */
        var options = $.extend( defaults, args );
        
        
       /*
        * Loop through elements matched by selector 
        */
        return $(this).each(function(i) {
            /*
             * Bind Hover
             */
            $(this).hover(
                function(){
                    $(options.background_selector, $(this))
                        .stop()
                        .animate({ 
                            top: options.background_top, 
                            left: options.background_left 
                        }, options.background_rate);
                        
                    $(options.message_selector, $(this))
                        .stop()
                        .animate({ 
                            top: options.message_1_top,
                            left: options.message_1_left
                         }, options.message_1_rate)
                        .animate({ 
                            top: options.message_2_top,
                            left: options.message_2_left
                         }, options.message_2_rate);
                },
                function(){
                    $(options.message_selector, $(this))
                        .stop()
                        .animate({
                            top: options.message_1_top,
                            left: options.message_1_left
                        }, Math.floor(options.message_1_rate / 2));
                    
                    $(options.background_selector, $(this))
                        .stop()
                        .animate({
                            top: options.background_start_top,
                            left: options.background_start_left
                        },Math.floor(options.background_rate / 2));
                }
            );
        });
    }
})(jQuery);