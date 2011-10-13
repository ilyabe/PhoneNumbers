(function($) {
    $.fn.ancestor = function(selector) {
        
        var $elem = $( this ).parent();
        while( $elem.size() > 0 ) {
            if( $elem.is( selector ) ) 
            {
                return $elem;
            } else {
                $elem = $elem.parent();
            }
        }
        return null;
    }


    $.fn.activeTextInput = function(options, colorboxoptions) {
        return this.each(function() {
            // Use REL attribute as reference
            $(this).attr('rel',$(this).val());
            // Bind FOCUS event
            $(this).bind('focus',function(){
                var _parent = $(this).ancestor('.active_nav_widget');
                if (_parent != null)
                {
                    _parent.parent('li').addClass('is_active');
                    _parent.addClass('is_active');
                }
                if ($(this).val() == $(this).attr('rel'))
                {
                    $(this).val('');
                }
            });
            // Bind BLUR event
            $(this).bind('blur',function(){
                var _parent = $(this).ancestor('.active_nav_widget');
                if (_parent != null)
                {
                    _parent.parent('li').removeClass('is_active');
                    _parent.removeClass('is_active');
                }
                var _val = $(this).val().replace(/^\s+/,'').replace(/\s+$/,'');
                if(_val == null || _val == '' )
                {
                    $(this).val($(this).attr('rel'));
                } else {
                    $(this).val(_val);
                }
            });
        });
    }
    
})(jQuery);