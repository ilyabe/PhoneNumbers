// text resizing
var currentTextSize = 12;
var currentLineHeight = null;
var mainArticleId = 0;
var breakingFlag = false;
initText();


// Phony pageTracker object to spoof the calls to the real deal before it has been instantiated on the page.
// Author: Adam Friedman 2/19/2010
// Purpose: to avoid JS errors when Google Analytics methods are called BEFORE the GA code is included
// just before the closing body tag.

var pageTracker = {
    type: "some_value",
    color: "red_or_other_value",
    _trackPageview: function (url) {
        return true;
    }
}



function initBreaking() {
	if (document.getElementById('breakingNews')) {
        new Effect.toggle('breakingNews','blind',{duration:1.5, queue:{scope:'menus', position:'end', limit: 3}});
	}
}

// check for cookie
function initText() {
  if (get_text_cookie("bhfont")) {
    currentTextSize = parseInt(get_text_cookie("bhfont"));
    document.writeln('<style type="text/css">#mainContent{font-size:'+currentTextSize+'px;}</style>');
  } else {
    put_text_cookie("bhfont",currentTextSize,1000);
  }
}

function textsize(dir) {
    if (dir == 'up') {
        if (currentTextSize <= 18) {
            currentTextSize += 2;
        }
    } else if (dir == 'down') {
        if (currentTextSize >= 10) {
            currentTextSize -= 2;
        }
    }
    currentLineHeight = currentTextSize + 6;
    document.getElementById('mainContent').style.fontSize = currentTextSize + 'px';
    document.getElementById('mainContent').style.lineHeight = currentLineHeight + 'px';

    // write/rewrite cookie
    put_text_cookie("bhfont",currentTextSize,1000);
}

function get_text_cookie ( cookie_name ) {
  var results = document.cookie.match ( cookie_name + '=(.*?)(;|$)' );

  if ( results ) {
    return ( unescape ( results[1] ) );
  } else { return null; }
}

function put_text_cookie(name,value,days){
	if (days){
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

function toggleRecent(key,val,ajax) {
  var elems = new Array('bylineBlog','bylineRecent','bylineBio');
  var state = document.getElementById(key).style.display;

  if (state == 'none') {
    for (j=0; j<elems.length; j++) {
      document.getElementById(elems[j]).style.display = 'none';
    }
    if (ajax === true) { return recent(key,val); } else { new Effect.SlideDown(key); }
  } else {
    document.getElementById(key).style.display = 'none';
  }
}

var iix = new Array('idx_head_summ','idx_head_only');
function smToggle(state) {

  for(b=0;b<iix.length;b++) {
    if (state == iix[b]) { // idx_head_only == idx_head_only || idx_head_only == idx_head_summ
//      alert('Match: ' + state + ' = ' + iix[b]);

      document.getElementById(iix[b]).style.fontWeight='bold';
      put_text_cookie('bh_idx_summ',iix[b]);
    } else {
      var spn = $$('div.'+iix[b]);

//      alert('Mismatch: ' + state + ' != ' + iix[b]);
      for(c=0;c<spn.length;c++) {
        spn[c].className=state; 
      }
      document.getElementById(iix[b]).style.fontWeight='normal';
    }
  }
}
