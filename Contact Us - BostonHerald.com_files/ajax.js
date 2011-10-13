var http = false;
var i = false;
var image = ''; 

if (navigator.appName == "Microsoft Internet Explorer") {
  http = new ActiveXObject("Microsoft.XMLHTTP");
} else {
  http = new XMLHttpRequest();
}
//window.onload = function() { initImage(); }

//---------------------------------------------------------------------------------------
function ajaxRequest(url,params,onSuccessCB,onFailureCB) {
//---------------------------------------------------------------------------------------
  new Ajax.Request(url, {
    parameters: params,
    onSuccess: function(transport) {  eval(onSuccessCB+'('+transport.responseText+');'); },
    onFailure: function(transport) {  eval(onFailureCB+'('+transport.responseText+');'); }
  });
}


if(typeof Effect_scoped != 'function') {
	function Effect_scoped(method,div) {
		
		eval('new Effect.'+method+'("'+div+'");');	
	}
}


function photoBox(page,lid,term,div,par) {
  if (i === false) { 
    http.abort();
    
	
    http.open("GET", "/js/index/photo_box.bg?page="+page+"&listingType="+lid+"&term="+term, true);
    http.onreadystatechange=function() {
      if(http.readyState == 4) {
        var html = http.responseText;
        if (html.length > 0) {
          document.getElementById(par).innerHTML = html;
          Effect_scoped('Appear',div);
          i = false;
        } else {
          i = true;
          window.setTimeout(function(){i=false;}, 600);
        }
      }
    }
    http.send(null);
  }
  i = true;
  window.setTimeout(function(){i=false;}, 600);
}

function replaceImage(page,id,div,par) {

  if (i === false) { 
    http.abort();
  
    http.open("GET", "/js/articles/photo_box.bg?photopage="+page+"&articleid="+id, true);
    http.onreadystatechange=function() {
      if(http.readyState == 4) {
        var html = http.responseText;
        if (html.length > 0) {
          document.getElementById(par).innerHTML = html;
           Effect_scoped('Appear',div);
          i = false;
        } else {
          i = true;
          window.setTimeout(function(){i=false;}, 600);
        }
      }
    }
    http.send(null);
  }
  i = true;
  window.setTimeout(function(){i=false;}, 600);
}

function page(type,page,format,cat,articleid) {
	
	// article_id can also equal the search topic/keyword(s)
	
  if (i === false) { 
    http.abort();
  
	if (type == 'article') {
      http.open("GET", '/js/articles/nextPage.bg?articleid='+articleid+'&page='+page+'&format='+format+'&listingType='+cat, true);
      http.onreadystatechange=function() {
        if(http.readyState == 4) {
          var html = http.responseText;
          var parts = html.split('|||')
          if (html.length < 1) {
            window.location='./view.bg?articleid='+articleid+'&page='+page+'&format='+format;
          } else {
            document.getElementById('pageNumberContainer').innerHTML = parts[3];
            document.getElementById('nextArticleTease').style.display = parts[4];
            document.getElementById('articleSidebar').style.display = parts[4];
            document.getElementById('articleTagline').style.display = parts[4];
            document.getElementById('commentsTeaseContainer').style.display = parts[4];
            document.getElementById('articleFull').innerHTML = parts[2];

            i = false;
          }
        }
      }
      http.send(null);

	} else {
	  if (type == 'topics' || type == 'search' || type == 'byline' ) {
        http.open("GET", '/js/search/nextPage.bg?type='+type+'&page='+page+'&topic='+articleid+'&listingType='+cat, true);
	  } else {
        http.open("GET", '/js/'+type+'/nextPage.bg?type='+type+'&page='+page+'&listingType='+cat+'&order='+format, true);
	  }
      http.onreadystatechange=function() {
        if(http.readyState == 4) {
          var html = http.responseText;
          if (html.length < 1) {
            window.location='./index.bg?topic='+articleid+'&page='+page+'&type='+cat+'&listingType='+cat+'&order='+format;
						// OLD: window.location='./index.bg?page='+page+'&format=alt';
          } else {
            document.getElementById('contentAreaSubRignt').innerHTML = html;
            i = false;
          }
        }
      }
      http.send(null);
    }
  }
  var ads = new Array('top','right','right1','middle','middle1','bottom');
  
  for (k=0; k<ads.length; k++) {
    var a = document.getElementById('i_'+ads[k]);
    if (a) { a.contentWindow.location.reload(true); }
  }

  i = true;
  window.setTimeout(function(){i=false;}, 600);
}

function rating(val) {
  if (i === false) { 
    http.abort();
  
    http.open("GET", val, true);
    http.onreadystatechange=function() {
      if(http.readyState == 4) {
        	alert('Thank you for your vote');
//        document.getElementById('ratingDiv').innerHTML = http.responseText;
        i = false;
      }
    }
    http.send(null);
  }
  i = true;
  window.setTimeout(function(){i=false;}, 600);
}

function recent(key,val) {
  if (i === false) { 
    http.abort();
  
    if (key == 'bylineBlog') {
      var url = '/js/articles/recent_blogs.bg?url='+val;
    } else if (key == 'bylineRecent') {
      var url = '/js/articles/recent_articles.bg?byline='+val;
    }
      
    if (url) {
      http.open("GET", url, true);
      http.onreadystatechange=function() {
        if(http.readyState == 4) {
          document.getElementById(key).innerHTML = http.responseText;
          //new Effect.SlideDown(key);
		  Effect_scoped('SlideDown',key);
          i = false;
        }
      }
      http.send(null);
    }
  }
  i = true;
  window.setTimeout(function(){i=false;}, 600);
}

