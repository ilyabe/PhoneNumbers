/********************************************************
  Text Resize
  Date:12/Dec/2007
  File: textresize.js 
  Location: /apps/merck/docroot/scripts/
  Author: Hemant Bellani
  Description: FONT SIZER OBJECT FOR TEXT-RESIZING 

***********************************************************/


//BEGIN FONT SIZER

/***********************************************************
    creates the cookie with the currrent font-size values
************************************************************/

function setCookie(name, value, days, path, domain, secure) {
    
    var expires = "";
    if ((typeof days == "number") && (days != -1)) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = date.toGMTString();
    }
    
    document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

/*************************************************
    gets the cookie with the font-size values 
**************************************************/

function getCookie(name) {
    
    var nameq = name + "=";
    var c_ar = document.cookie.split(';');
    for (var i=0; i < c_ar.length; i++) {
        var c = c_ar[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameq) == 0) {
            return unescape(c.substring(nameq.length, c.length));
        }
    }
    return null;
}

/*************************************************
    deletes the cookie with the font-size values
**************************************************/

function deleteCookie(name, path, domain) {
    
    if (getCookie(name)) {
        cookie_expiredate = new Date();
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=" + cookie_expiredate.toGMTString();
    }
}

var dw_fontSizerDX = {
    /* setting default values for 
        font-size unit,
        default font-size, 
        max font-size,
        min font size,
        tag-list for font-size adjustment
    */

    sizeUnit:    "px",
    defaultSize: 12,
    maxSize:     24,
    minSize:     9,
    adjustList: [], 

    
/******************************************************************
    Set Default-values for html elements included for text-resizing
*******************************************************************/
    setDefaults: function(unit, dflt, mn, mx, sels,check, change) {
        this.sizeUnit = unit;       this.defaultSize = dflt;
        this.maxSize = mx;          this.minSize = mn;
        this.check=check;           this.change = change;
        if (sels) this.set(dflt, mn, mx, sels);
    },

/*******************************************************************
    Set font-size values for the tag-List to be included for resizing
*********************************************************************/
    set: function (dflt, mn, mx, sels, chg) { 

        var ln = this.adjustList.length;  
              
        for (var i=0; sels[i]; i++) {
            
            this.adjustList[ln+i] = [];
            this.adjustList[ln+i]["sel"]  = sels[i];
            this.adjustList[ln+i]["dflt"] = dflt ;
            this.adjustList[ln+i]["min"]   = mn || this.minSize;
            this.adjustList[ln+i]["max"]   = mx || this.maxSize;
            this.adjustList[ln+i]["ratio"] = this.adjustList[ln+i]["dflt"] / this.defaultSize;
            this.adjustList[ln+i]["check"] = 0;
            this.adjustList[ln+i]["change"] = chg;
        }
    },

/***********************************
    init sets up the font-resizing 
************************************/

    init: function(normalSize, minSize, maxSize, tagList, check, change) {


        if ( !document.getElementById || !document.getElementsByTagName ) return;
        var size, sizerEl, i;
        size=normalSize;
       
        size = !isNaN( parseFloat(size) )? parseFloat(size): normalSize;
        
        if ( size > this.maxSize || size < this.minSize ) size = normalSize;
        this.curSize = normalSize;  // create curSize property to use in calculations 
         sizerEl = document.getElementById('sizer');
        if (sizerEl) sizerEl.style.display = "block";
        // if neither set nor setDefaults populates adjustList, apply sizes to body and td's
        if (this.adjustList && this.adjustList.length == 0) {
            
            this.setDefaults('px', normalSize, minSize, maxSize, tagList,check, change);
        }
        if ( size != this.defaultSize ) {
                
                this.adjust( size - this.defaultSize );
        }
    },


/*********************************************************************
adjusts the font-size for the html elements included for text-resize:
    - a positive value of n would increase the size of text by n units
    - a negative value of n would increase the size of text by n units
***********************************************************************/
    adjust: function(n) {
        
    
        var viewTextSize = document.getElementById('viewTextSize');
        
        //MAT: MODIFIED
        if (ctaID != -1) clearTimeout(ctaID);
        //MAT: end
        if ( !this.curSize ) return; // set in init
        var alist, size, list, i, j;
        // check against max/minSize
        if ( n > 0 ) {

            if ( this.curSize + n > this.maxSize ) n = this.maxSize - this.curSize;
        } else if ( n < 0 ) {
            
 if ( this.curSize + n < this.minSize )
{
 n = this.minSize - this.curSize;

} 
       }
        if ( n == 0 ) 
{
return;
 }       

           this.curSize += n;

        // loop through adjustList, calculating size, checking max/min
        alist = this.adjustList;
       
        
        for (i=0; alist[i]; i++) {
            
           
            if(n < 0) 
            {
                
                if(this.check==0)
                {
                        var avg=(this.minSize+this.curSize)/2;
                        size = avg * alist[i]['ratio']; // maintain proportion 
                                                        
                }
                else{
                    size = this.curSize * alist[i]['ratio']; // maintain proportion 
                    }
            }
            if(n > 0) 
                    {
                    this.check=this.check+1;

                    size = this.curSize * alist[i]['ratio']; // maintain proportion 
                    }
            
            size = Math.max(alist[i]['min'], size);
            size = Math.min(alist[i]['max'], size);
        
            list = dw_getElementsBySelector( alist[i]['sel'] );
            
            for (j=0; list[j]; j++) {
                if(alist[i]['change']==0)
                {
                    list[j].style.fontSize = '';
                }
                else
                {
                    list[j].style.fontSize = size + this.sizeUnit;
                }
            }
        }
        
        setCookie( "fontSize", this.curSize, 180, "/" ,"","");
        viewTextSize.style.fontSize = "medium";
        currTextSize = viewTextSize.offsetHeight;

        if (ctaID != -1) checkTextAdjust();
    },

/*********************************************************************
    reset the font-size to default font-size values
***********************************************************************/

    reset: function() {
    
        this.check=0;

        var alist = this.adjustList, list, i, j;
        for (i=0; alist[i]; i++) {
            list = dw_getElementsBySelector( alist[i]['sel'] );
            for (j=0; list[j]; j++) { 
                // Reset adjustList elements to their default size
            list[j].style.fontSize = '';  // restores original font size
            } 
        }
        this.curSize = this.defaultSize;
        
        deleteCookie("fontSize", "/", "");
    }

}

function dw_getElementsBySelector(selector) {
    
   

    if (!document.getElementsByTagName) return [];
    var nodeList = [document], tokens, bits, list, col, els, i, j, k;

    selector = selector.normalize();

    tokens = selector.split(' ');

    for (i=0; tokens[i]; i++) {
        
        if ( tokens[i].indexOf('#') != -1 ) {  // id
          //  alert("resize6");
            bits = tokens[i].split('#'); 

            var el = document.getElementById( bits[1] );
            
            if (!el) return []; 
            if ( bits[0] ) {  // check tag
                if ( el.tagName.toLowerCase() != bits[0].toLowerCase() ) return [];
            }
            for (j=0; nodeList[j]; j++) {  // check containment

                if ( nodeList[j] == document || dw_contained(el, nodeList[j]) ) 
                    nodeList = [el];
                else return [];

            }
            continue; 
        }
        else if ( tokens[i].indexOf('.') != -1 ) {  // class
             //alert("resize7");
            bits = tokens[i].split('.'); col = [];
            for (j=0; nodeList[j]; j++) {
                els = dw_getElementsByClassName( bits[1], bits[0], nodeList[j] );
                for (k=0; els[k]; k++) { col[col.length] = els[k]; }
            }
            nodeList = [];
            for (j=0; col[j]; j++) { nodeList.push(col[j]); }
            continue; 
        }
        else {  // element 
            //alert("resize8");
            els = []; 
            for (j = 0; nodeList[j]; j++) {

                list = nodeList[j].getElementsByTagName(tokens[i]);

                for (k = 0; list[k]; k++) { 
                   
                   els.push(list[k]);
                   

}
            }
            nodeList = els;
        }
    }
    
    return nodeList;
}

function dw_getElementsByClassName(sClass, sTag, oCont) {
//alert("resize5");
    var result = [], list, i;
    var re = new RegExp("\\b" + sClass + "\\b", "i");
    oCont = oCont? oCont: document;
    if (document.getElementsByTagName) {
        if ( !sTag || sTag == "*" ) {
            list = oCont.all ? oCont.all : oCont.getElementsByTagName("*");
        }
        else {
            list = oCont.getElementsByTagName(sTag);
        }
        for (i=0; list[i]; i++) {
            if ( re.test( list[i].className ) ) {
                result.push( list[i] );
            }
        }
    }
    return result;
}

// returns true of oNode is contained by oCont (container)
function dw_contained(oNode, oCont) {
    if (!oNode) {
        return; // in case alt-tab away while hovering (prevent error)
    }
    while ( oNode = oNode.parentNode ) {
        if ( oNode == oCont ) {
            return true;
        }
    }
    return false;
}

if (!Array.prototype.push) {  // ie5.0
    Array.prototype.push =  function() {
        for (var i=0; arguments[i]; i++) {
            this[this.length] = arguments[i];
        }
        return this[this.length-1]; // return last value appended
    }
}

String.prototype.normalize = function() {
    var re = /\s\s+/g;
    return this.trim().replace(re, " ");
}

String.prototype.trim = function() {
    var re = /^\s+|\s+$/;
    return this.replace(re, "");
}

//save to a cookie for page to page
var ctaID = -1;
var vtsStyle = "font-size: medium; visibility: hidden; position: absolute; left: -50px; top: -50px;";
document.write('<DIV ID="viewTextSize" style="'+vtsStyle+'">M</DIV>');


function checkTextAdjust() {
//alert("check");
    var viewTextSize = document.getElementById('viewTextSize');
    if ((viewTextSize.offsetHeight < currTextSize-1) || (viewTextSize.offsetHeight > currTextSize+1)) {
        MM_showHideLayers('sizer', '', 'hide');
        dw_fontSizerDX.reset();
    }
    else {
        ctaID = setTimeout('checkTextAdjust()',1000);   
    }
}


function mouseOverImage(imageId)

{

            var imageObj = document.getElementById(imageId);

            imageObj.style.backgroundPosition ="0px -21px";

}

function mouseOutImage(imageId)

{

            var imageObj = document.getElementById(imageId);

            imageObj.style.backgroundPosition ="0px 0px";

}



//END FONT SIZER
