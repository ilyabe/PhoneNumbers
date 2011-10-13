$(window).load(function() {

    var timer, leftflyout, topflyout, context;
    
    // hide all the flyouts
    $('.submenu, .submenu-tab-left, .submenu-tab-middle, .submenu-tab-right').css('display', 'none');

    // display the flyouts of the Topics/Forums tab
    $('#topics-devshed, #topics-devarticles, #topics-aspfree, #topics-seochat, #topics-devhardware, #topics-scripts, #topics-webhosters, #topics-codewalkers, #topics-tutorialized, #topics-devmechanic, #forums-devshed, #forums-devarticles, #forums-aspfree, #forums-seochat, #forums-devhardware, #forums-scripts, #forums-webhosters, #forums-codewalkers, #forums-tutorialized, #forums-devmechanic').hover(
        function() {
            var file = '/developershed_navbar/'+$(this).attr('id') + '.htm';
            leftflyout = $(this).find('.submenu');
                        // populate the left flyout via Ajax
                        leftflyout.load(file).show();
        }, 
        function() {
            clearTimeout(timer);
            leftflyout.fadeOut('slow');
        }
    );
    
    // display the flyouts of the web sites
    $('#devshed, #devarticles, #aspfree, #seochat, #devhardware, #tutorialized, #scripts, #webhosters, #codewalkers, #devmechanics').hover(
        function() {
            // reset the hover state of the menu tab
            var bgpos = $(this).getBackgroundPosition();
            $(this).setBackgroundPosition(bgpos.split(' ')[0], '-46px');
            /* 
            if the mouseover was triggered in the main navbar, 
            wait for 1 sec, load contents from the (sitename).htm file and show them in the navbar flyouts
            */
            if ($(this).siblings('#devshed-network').size() === 1) {
                var file = '/developershed_navbar/'+$(this).attr('id') + '.htm';
                topflyout = $('.submenu-' + $(this).attr('class'));
                context = $(this);
                        // display the third state of the menu tab
                        var bgpos = context.getBackgroundPosition();
                        context.setBackgroundPosition(bgpos.split(' ')[0], '-92px');
                        // populate the top flyout via Ajax
                        topflyout.load(file).show();
            }
            /*
            otherwise, the mouseover was triggered in the devshed network bar; 
            so flyout contents (if any ) must be loaded from the (sitename)_small.htm file 
            and shown in the side flyouts with no delay
            */
            else {
                var rightflyout = $(this).find('.submenu');
                if (rightflyout.size() !== 0) {
                   var file = '/developershed_navbar/' +$(this).attr('id') + '_small.htm';
                   // display the third state of the menu tab
                   var bgpos = $(this).getBackgroundPosition();
                    $(this).setBackgroundPosition(bgpos.split(' ')[0], '-92px');
                   // populate the right flyout via Ajax
                   rightflyout.load(file).show();
                }
            }
        }, 
        function() {
            // reset the state of the mouseovers triggered in the main navbar
            if ($(this).siblings('#devshed-network').size() === 1) {
                // clear the timer, hide the flyouts & reset the state of the menu tab
                clearTimeout(timer);
                topflyout.hide();
                var bgpos = $(this).getBackgroundPosition();
                $(this).setBackgroundPosition(bgpos.split(' ')[0], 0);
            }
            else {
                // reset the state of the mouseovers triggered in the devshed network bar
                var bgpos = $(this).getBackgroundPosition();
                $(this).setBackgroundPosition(bgpos.split(' ')[0], 0);
                var rightflyout = $(this).find('.submenu');
                if (rightflyout.size() !== 0) {rightflyout.hide()};
            }
        }
    );
    // change the background color of the login form fields when focusing/blurring on them
    $('#username, #password')
    .focus(function() {
        $(this).css('background-color', '#f1f7fd');
    })
    .blur(function() {
        $(this).css('background-color', '#fff');
    });
});
