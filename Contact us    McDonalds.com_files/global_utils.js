

function ie() { 
    return $.browser.msie; 
} 
function ie6() {
    return ie() && /6.0/.test(navigator.userAgent)
}
function show_share() { 
    return ie() ? $('#share_flyout').show() : $('#share_flyout').fadeIn(200) ; 
}

function hide_share() { 
    return ie() ? $('#share_flyout').hide() : $('#share_flyout').fadeOut(200) ; 
}

function killColorBox() {
    try {
        $.fn.colorbox.close();
    } catch ( c_error ) { /* silence */ }
}

$(document).ready(function() {

    /*
        Bind All Text Inputs for default values
    */
    $('input[type=text]').activeTextInput();
    
        
    /*
        Clear 
    */
    $('#main_navigation ul li').mouseenter(function(){
         
        if ($('.is_active', this).length == 0)
        {
            $('#main_navigation input[type=text]').each(function(){
                $(this).val($(this).attr('rel'));
            });
            $('#main_navigation .is_active').each(function(i){
                $('input[type=text]',this).val($('input[type=text]',this).attr('rel'));
                $('input[type=text]',this).blur();
                $(this).removeClass('is_active');
            }); 
        } else {
        }
    });
    
    $('#share_flyout').hide();
    var _left = $('#share').position().left - 74;
    var _left_alt = $('#share').position().left - 145;

    var _dims = {
        'top': '30px',
        'left': _left + 'px'
    }

     var _dims_alt = {
        'top': '30px',
        'left': _left_alt + 'px'
        
    }

    $('#share_flyout').hasClass('alt') ? $('#share_flyout').css(_dims_alt) : $('#share_flyout').css(_dims);
  
    

    $('#share').mouseenter(function() {
        show_share()
    });

    $('#notification').mouseleave(function() {
        hide_share();
    });
    $('#language, #meal_builder').mouseenter(function() {
        hide_share();
    });
    /*
        PNG FIX
    */
    try {  
        if(ie6()) 
        {
            $('img[src$=png]:visible, #logo').ifixpng(); 
            $('#main_navigation ul li').hover(
                function()
                {   
                    $(this).addClass('is_active');
                    $(this).children('div.active_nav_widget').addClass('is_active').ifixpng().children('div').ifixpng();
                    $(this).ifixpng()
                },
                function(){
                    $(this).removeClass('is_active');
                    $(this).children('div.active_nav_widget').removeClass('is_active');
                }
            );
        }
    } catch (_e) {  }
    
    /*
        Share [ email ] exampe 
        ~emcconville
     */
    $("#share_email").mcdColorbox({ iframe: true, innerWidth: 790, innerHeight: 600 });
}).bind('cbox_complete',function(){ 
                    var _height = Math.floor($('#cboxContent').height() / 2);
                    $('#cboxNext').css({top: (_height > 30 ? _height - 30 : 0) + 'px'});
                    $('#cboxPrevious').css({top: (_height > 30 ? _height - 30 : 0) + 'px'});
                });
 