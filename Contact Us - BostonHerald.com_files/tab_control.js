/*-----------------------------------------------------------
    Toggles element's display value
    Input: any number of element id's
    Output: none 
    ---------------------------------------------------------*/
function toggleDisp() {
    for (var i=0;i<arguments.length;i++){
        var d = $(arguments[i]);
        if (d.style.display == 'none')
            d.style.display = 'block';
        else
            d.style.display = 'none';
    }
}
/*-----------------------------------------------------------
    Toggles tabs - Closes any open tabs, and then opens current tab
    Input:     1.The number of the current tab
                    2.The number of tabs
                    3.(optional)The number of the tab to leave open
                    4.(optional)Pass in true or false whether or not to animate the open/close of the tabs
    Output: none 
    ---------------------------------------------------------*/
function toggleTab(pre,css,num,numelems,opennum,animate) {
    document.getElementById(pre+'s').className = css+num;

    if ($(pre+'Content'+num).style.display == 'none'){
        for (var i=1;i<=numelems;i++){
            if ((opennum == null) || (opennum != i)){
                var temph = pre+'Header'+i;
                var h = $(temph);
                if (!h){
                    var h = $(pre+'HeaderActive');
                    h.id = temph;
                }
                var tempc = pre+'Content'+i;
                var c = $(tempc);
                if(c.style.display != 'none'){
                    if (animate || typeof animate == 'undefined')
                        new Effect.toggle(tempc,'blind',{duration:0.5, queue:{scope:'menus', limit: 3}});
                    else
                        toggleDisp(tempc);
                }
            }
        }
        var h = $(pre+'Header'+num);
        if (h)
            h.id = pre+'HeaderActive';
        h.blur();
        var c = $(pre+'Content'+num);
//        c.style.marginTop = '2px';
        if (animate || typeof animate == 'undefined'){
            new Effect.toggle(pre+'Content'+num,'blind',{duration:0.5, queue:{scope:'menus', position:'end', limit: 3}});
        }else{
            toggleDisp(pre+'Content'+num);
        }
    }
}
