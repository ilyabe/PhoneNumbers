// $Id: main.js,v 1.43 2011/06/30 17:26:10 crawls Exp $

var cnnLockToggle = false;
function CNN_getCookies() {
	var hash = new Array;
	if ( document.cookie ) {
		var cookies = document.cookie.split( '; ' );
		for ( var i = 0; i < cookies.length; i++ ) {
			var namevaluePairs = cookies[i].split( '=' );
			hash[namevaluePairs[0]] = unescape( namevaluePairs[1] ) || null;
		}
	}
	return hash;
}

function CNN_parseCookieData( cookieDataString ) {
	var cookieValues = new Object();
	var separatePairs = cookieDataString.split( '&' );
	for ( var i = 0; i < separatePairs.length; i++  ) {
		var separateValues = separatePairs[i].split( ':' );
		cookieValues[separateValues[0]] = separateValues[1] || null;
	}
	return cookieValues;
}

function CNN_setCookie( name, value, hours, path, domain, secure ) {
		var numHours = 0;

		if ( hours) {
			if ( (typeof(hours) == 'string') && Date.parse(hours) ) { // already a Date string
				numHours = hours;
			} else if ( typeof(hours) == 'number' ) { // calculate Date from number of hours
				numHours = ( new Date((new Date()).getTime() + hours*3600000) ).toGMTString();
			}
		}

		document.cookie = name + '=' + escape(value) + ((numHours)?(';expires=' + numHours):'') + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:'') + ((secure && (secure === true))?'; secure':''); // Set the cookie, adding any parameters that were specified.

}


function CNN_removeCookie( name, path, domain ) {
	var allCookies = CNN_getCookies();

	var theValue = allCookies[ name ] || null; // We need the value to kill the cookie
	if ( theValue ) {
		document.cookie = name + '=' + escape(theValue) + '; expires=Fri, 13-Apr-1970 00:00:00 GMT' + ((path)?';path=' + path:'') + ((domain)?';domain=' + domain:''); // set an already-expired cookie
	}
}


var allCookies = CNN_getCookies();
var cnnDomainArray = location.hostname.split( '.' );
var cnnCurrDomain = ( cnnDomainArray.length > 1 ) ? '.' + cnnDomainArray[cnnDomainArray.length-2] + '.' + cnnDomainArray[cnnDomainArray.length-1] : '';



function cnnRenderT1TimeStamp(date) {
	var cnnStoryPublishTime = (date) ? new Date(date) : cnnCurrTime;
	var cnnTimeStampString;
    var cnnTimeStampDiff = cnnCurrTime.getTime() - cnnStoryPublishTime.getTime();

    var daysDifference = Math.floor(cnnTimeStampDiff/1000/60/60/24);
    cnnTimeStampDiff -= daysDifference*1000*60*60*24;

    var hoursDifference = Math.floor(cnnTimeStampDiff/1000/60/60);

    cnnTimeStampDiff -= hoursDifference*1000*60*60;

    var minutesDifference = Math.floor(cnnTimeStampDiff/1000/60);

    cnnTimeStampDiff -= minutesDifference*1000*60;

    var secondsDifference = Math.floor(cnnTimeStampDiff/1000);


	var cnnDays = (daysDifference > 1) ? "days" : "day";
	var cnnHours = (hoursDifference > 1) ? "hours" : "hour";
	var cnnMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnSeconds = (secondsDifference > 1) ? "seconds" : "second";

	cnnTimeStampString = 'updated ';

	if(hoursDifference < 1 && minutesDifference > 0){
		cnnTimeStampString += minutesDifference + " "+cnnMinutes+" ago";
	} else if(hoursDifference < 1 && minutesDifference < 1) {
		cnnTimeStampString += secondsDifference + " "+cnnSeconds+" ago";
	} else if(hoursDifference >= 1) {
		return "";
	}
	return cnnTimeStampString;
}

/* cnn live video popup
===================================================================== */
function cnnLiveVideo( strWhich ) {
	if(!strWhich) {
		strWhich = '1';
	}
	var strVidLoc = '/video/live/live.html?stream=stream' + strWhich;
	if(html5Check) { strVidLoc = '/video/flashLive/live.ipad_nf.html'; }
	CNN_openPopup(strVidLoc,'liveplayer','scrollbars=yes,resizable=yes,width=672,height=540');
}
/* end cnn live video popup
===================================================================== */


function CNN_openPopup( url, name, widgets, openerUrl )
{
	var host = location.hostname;
	if (window == top) { window.top.name = "opener"; }
	var popupWin = window.open( url, name, widgets );
	if(popupWin) {cnnHasOpenPopup = 1;}
	if ( popupWin && popupWin.opener ) {
		if ( openerUrl )
		{
			popupWin.opener.location = openerUrl;
		}
	}
	if ( popupWin) {
		popupWin.focus();
	}
}

/* toggle function for advanced search
========================================================================= */

function cnnToggleUGC(el,lnk) {
	if (cnnLockToggle) {
		return;
	}
	
	cnnLockToggle = true;
	var cnnToggleClass = (lnk.parentNode.className.indexOf('Closed') > -1) ? true : false;
	
		Effect.toggle(el,'blind',
		{
			beforeStart:function(obj) {
				try {
					lnk.blur();
				} catch(e) {};
				if (cnnToggleClass) {
				switch(lnk.parentNode.className) {
					case 'cnnOpinionClosed':
						lnk.parentNode.className = 'cnnOpinion';
					break;
					case 'cnnIReportClosed':
						lnk.parentNode.className = 'cnnIReport';
					break;
					case 'cnnBlogsClosed':
						lnk.parentNode.className = 'cnnBlogs';
						Sphere.Widget.search();
					break;
					default:
				}
				}
			
			},
			afterFinish:function(obj) {
				if (!cnnToggleClass) {
				switch(lnk.parentNode.className) {
					case 'cnnOpinion':
						lnk.parentNode.className = 'cnnOpinionClosed';
					break;
					case 'cnnIReport':
						lnk.parentNode.className = 'cnnIReportClosed';
					break;
					case 'cnnBlogs':
						lnk.parentNode.className = 'cnnBlogsClosed';
					break;
					default:
				}
				}
				cnnLockToggle = false;
			}	
		}
	);
}

/* end toggle function for advanced search
========================================================================= */



/* cnn horizontal slider js
========================================================================= */

var cnnHorizontalSlider = (typeof Class == "object") ? Class.create() : {};
cnnHorizontalSlider.prototype = {
	initialize: function(objName,elContainer,elIdentifier,navContainer,displayWidth) {
	try {
		this.locked = false;
		this.objName = objName;
		this.elIdentifier = elIdentifier;
		this.container = elContainer;
		this.navDiv = navContainer;
		this.viewPort = displayWidth;
		this.sliderWidth = this.findPanels();
		this.numScreens = Math.round(this.sliderWidth/2);
		this.negativeOffSetMax = this.setOffSet();
		this.positiveOffSetMax = 0;
		this.currentPanel = 0;
		this.inactiveDot;
		this.activeDot;
		this.setSliderWidth();
		this.buildNav();
		this.getCurrentOffSet();
	} catch(e) {}
	},
	findPanels: function() {
		var panels = $(this.container).getElementsByTagName('div');
		var panelCount = 0;
		for(var i = 0; i<panels.length;i++) {
			if(panels[i].className == this.elIdentifier+' cnnMar9L' || panels[i].className == this.elIdentifier) {
				panelCount++;
			}
		}
		return panelCount;
	},
	setCurrentPanel: function(val) {
		this.getCurrentOffSet();
		this.currentPanel = (this.currOffSet/this.viewPort) * -1;
		this.updateNav();
	},
	setOffSet: function() {
		return ((this.numScreens * this.viewPort) - this.viewPort) * -1;
	},
	calculateSliderWidth: function() {
		return this.viewPort * this.numScreens;
	},
	setSliderWidth: function() {
		$(this.container).style.width = this.calculateSliderWidth() + "px";
	},
	buildNav: function() { //if there becomes a defacto standard, can live here
	},
	updateNav: function() { //if there becomes a defacto standard, can live here
	},
	getCurrentOffSet: function(val){
		this.currOffSet = (!isNaN(parseInt($(this.container).style.left, 10))) ? parseInt($(this.container).style.left, 10) : 0;
	},
	btnSlide: function(arg) {
		if(!this.locked) {
			this.locked = true;
			var timeOutPointer = this;
			this.timer = setTimeout(function() {
				timeOutPointer.getCurrentOffSet();
				var finalCoord = (arg * timeOutPointer.viewPort) * -1;
				var moveByVal = (finalCoord > timeOutPointer.currOffSet) ? (finalCoord - timeOutPointer.currOffSet): (timeOutPointer.currOffSet - finalCoord) * -1;
				var duration = (moveByVal > 0) ? 2 * (moveByVal/timeOutPointer.viewPort) :  (2 * (moveByVal/timeOutPointer.viewPort)) * -1;
				if(duration < 0) {
					duration = duration * -1;
				}
				if(timeOutPointer.currOffSet > timeOutPointer.negativeOffSetMax || timeOutPointer.currOffSet < timeOutPointer.positiveOffSetMax) {
					new Effect.MoveBy( $(timeOutPointer.container).id, 0, moveByVal, {duration: duration,beforeStart:function() {timeOutPointer.showImages();},afterFinish:function() {timeOutPointer.setCurrentPanel();}} );
				}


				timeOutPointer.locked = false;

			},300);
		}
	}
};

/* cnn horizontal slider js
========================================================================= */

//Extend slider for gallery specific use
var globalSlideCheck = 0;
var globalTabCheck = 0;
var cnn_GallerySlider = (typeof Class === "object") ? Class.create() : {};
cnn_GallerySlider.prototype = Object.extend(new cnnHorizontalSlider(), {
	initialize: function( config ) {
		this.config = config;
		this.defaults = {
			galleryContainerId     : 'cnn_GallerySliderContainer',
			galleryStripClass      : 'cnn_fabcaslab',
			galleryTabContainerId  : 'cnnGalleryTabs',
			nextButtonContainerId  : 'cnn_fabcnext',
			prevButtonContainerId  : 'cnn_fabcprev',
			galleryAdPrefix        : 'gallery_',  // set to gallery2_ for 2nd strip
			displayWidth           : 906
		};
		this.settings = Object.extend( this.defaults, this.config );

		try {  // reading from settings to set value of properties possibly required by cnnHorizontalSlider
			this.elIdentifier   = this.settings.galleryStripClass;
			this.container      = this.settings.galleryContainerId;
			this.navDiv         = this.settings.navContainer;  // unused?
			this.viewPort       = this.settings.displayWidth;
			this.currentTab     = this.settings.currentTab || 0;
		} catch (e) {}

		try {
			this.locked = false;
			this.sliderWidth = this.findPanels();
			this.numScreens = this.sliderWidth;
			this.negativeOffSetMax = this.setOffSet();
			this.positiveOffSetMax = 0;
			this.currentPanel = 0;
			this.inactiveDot = "";
			this.activeDot = "";
			this.setSliderWidth();
			this.buildNav();
			this.getCurrentOffSet();
			this.tabLnks;
			this.numTabs;
			this.requestPanelAd(this.currentTab,this.currentPanel);
			this.numImgsPerPanel = 7;
			this.showImages('init');
		} catch(e) {}
	},
	callOmniture: function(tvalue) {
		//var s=s_gi(s_account);
		//s.linkTrackVars='none';
		//s.linkTrackEvents='none';
		//s.pageName='';
		//s.tl(this,'o',tvalue);
	},
	showImages:function(arg) {
		var whereToLook = arg ? $(this.settings.galleryContainerId).down() : $(this.settings.galleryContainerId);
		whereToLook.select('.cnn_fabcatz img').each(function (n,i) {
			if( n.className == "cnnContentImg" && n.style.display != "block") {
				n.style.display = "block";
			}
		});
	},
	buildTabs:function(curr) {
		tabBtnContainer = $(this.settings.galleryTabContainerId);
		this.tabLnks = tabBtnContainer.getElementsByTagName('a');
		this.numTabs = this.tabLnks.length;
		var activeTab = false;
		var thisPointer = this;
		var i = 0;
		if (typeof(curr)!='undefined') {
			this.callOmniture('HP mid button '+(curr+1));
		}
		if(typeof curr === "undefined") {
			for (i=0,len=this.numTabs;i<len;i++) {
				if(this.tabLnks[i].className == "cnn_fabtabbtn cnn_fabtabbtnon") {  // XXX
					curr = i;
					activeTab = true;
				}
			}
			if(!activeTab) {
				curr = 0;
				this.currentTab = 0;
			}
			this.currentTab = curr;
		} else {
			this.currentTab = curr;
		}
		for (i=0,len=this.numTabs;i<len;i++) {
			if(i != curr) {
				this.tabLnks[i].className = "cnn_fabtabbtn";
				this.tabLnks[i].onclick = function() {
					thisPointer.changeTab(this.href);
					return false;
				};
			} else {
				this.tabLnks[i].className = "cnn_fabtabbtn cnn_fabtabbtnon";
				this.tabLnks[i].onclick = function() {
					return false;
				};
			}
		}
	},
	buildNav: function() {
		this.buildTabs();

		prevBtnContainer = $(this.settings.prevButtonContainerId);
		nextBtnContainer = $(this.settings.nextButtonContainerId);

		prevBtnContainer.className = "cnn_fabcprv_off";
		nextBtnContainer.className = this.sliderWidth > 1 ? "cnn_fabcnxt" : "cnn_fabcnxt_off";

		if ( this.sliderWidth > 1 ) {
			prevBtnContainer.observe( 'click', this.slidePrev.bind( this ) );
			nextBtnContainer.observe( 'click', this.slideNext.bind( this ) );
		}
	},

	slideNext: function ()
	{
		if ( ( this.currentPanel + 1 ) < this.numScreens ) {
			this.btnSlide( this.currentPanel + 1 );
		}
		if (globalSlideCheck != this.currentPanel + 1 || globalTabCheck != 0) {
			globalSlideCheck = this.currentPanel + 1;
			globalTabCheck = 0;
			this.callOmniture('HP mid right arrow');
		}
	},

	slidePrev: function ()
	{
		if ( this.currentPanel > 0 ) {
			this.btnSlide( this.currentPanel - 1 );
		}
		if (globalSlideCheck != this.currentPanel - 1 || globalTabCheck != 0) {
			globalSlideCheck = this.currentPanel - 1;
			globalTabCheck = 0;
			this.callOmniture('HP mid left arrow');
		}
	},

	updateNav: function() {
		this.requestPanelAd(this.currentTab,this.currentPanel);
		if((this.currentPanel+1) < this.numScreens) {
			$(this.settings.nextButtonContainerId).className = 'cnn_fabcnxt';
		} else {
			$(this.settings.nextButtonContainerId).className = 'cnn_fabcnxt_off';
		}

		if(this.currentPanel > 0) {
			$(this.settings.prevButtonContainerId).className = 'cnn_fabcprv';
		} else {
			$(this.settings.prevButtonContainerId).className = 'cnn_fabcprv_off';
		}
		//this.showImages();
	},
	changeTab: function(url,tabNum) {
		var thisPointer = this;
		new Ajax.Request(url, {
 			method: 'get',
			onSuccess: function(transport) {
				thisPointer.resetSlider(transport.responseText);
				for (var i=0,len=thisPointer.numTabs;i<len;i++) {
					if(url == thisPointer.tabLnks[i].href) {
						thisPointer.buildTabs(i);
					}
				}
			}
		});
		globalTabCheck = 1;
	},
	resetSlider: function(resp) {
		var thisPointer = this,
			containerParent = $(thisPointer.settings.galleryContainerId).up();  // going 'up' to parent instead of hard-coding ID

		Effect.Fade(this.container, {
			duration:0.5,
			afterFinish:function() {
				$(thisPointer.container).remove();
				var newContainer = document.createElement('div');
				newContainer.setAttribute('style','display:none');
				newContainer.setAttribute('id',thisPointer.settings.galleryContainerId);
				containerParent.appendChild(newContainer);
				$(thisPointer.container).update(resp);
				thisPointer.initialize(
					Object.extend( thisPointer.settings, { currentTab: thisPointer.currentTab } )  // extending the current settings to include the currentTab
				);
				Effect.Appear(thisPointer.container,{duration:0.5});
			}
		});
	},
	requestPanelAd:function(tab,panel) {
		var thisPointer = this;
		if($(this.settings.galleryAdPrefix+tab+"_ad_"+panel) && ! $(this.settings.galleryAdPrefix+tab+"_ad_"+panel+"Container")) {
			if(this.varDefined("CNN_"+this.settings.galleryAdPrefix+tab+"_ad_"+panel)) {
				//make request for .ad file passing corresponding CNN_gallery_[#]_ad_[#] JS var as arg for url.
				//this.returnVarValue("CNN_gallery_"+tab+"_ad_"+panel);
				var cnnAdDivContainer = document.createElement("div");
				cnnAdDivContainer.setAttribute("id",this.settings.galleryAdPrefix+tab+"_ad_"+panel+"Container");
				$(this.settings.galleryAdPrefix+tab+"_ad_"+panel).appendChild(cnnAdDivContainer);

				new Ajax.Updater(
					{success: $(this.settings.galleryAdPrefix+tab+"_ad_"+panel+"Container")},
					this.returnVarValue("CNN_"+this.settings.galleryAdPrefix+tab+"_ad_"+panel),
					{
						method:'get',
						evalScripts:true,
						asynchronous:true,
						onSuccess:function() {
							if($(thisPointer.settings.galleryAdPrefix+tab+"_ad_"+panel+"_adgif")) {
								$(thisPointer.settings.galleryAdPrefix+tab+"_ad_"+panel+"_adgif").innerHTML = '<img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/advertisement.gif" width="58" height="5" alt="" border="0">';
							}
						}
					}
				);
			}
		}
	},
	varDefined:function(val) {
		var t;
		var expression = "t = (typeof(" + val + ") !== \"undefined\");";
		eval(expression);
		return t;
	},
	returnVarValue:function(val) {
		return eval(val);
	}
});

var cnn_SectionGallery, cnn_SectionGallery2;

Event.observe(window, 'load', function() {
	if ( $('cnn_GallerySliderContainer') && typeof cnn_SectionGallery !== "object") {
		cnn_SectionGallery = new cnn_GallerySlider();
	}
	if ( $('cnn_Gallery2SliderContainer') && typeof cnn_SectionGallery2 !== "object" ) {
		cnn_SectionGallery2 = new cnn_GallerySlider({
			galleryContainerId     : 'cnn_Gallery2SliderContainer',
			galleryTabContainerId  : 'cnnGallery2Tabs',
			nextButtonContainerId  : 'cnn_fabcnext2',
			prevButtonContainerId  : 'cnn_fabcprev2',
			galleryAdPrefix        : 'gallery2_'
		});
	}
	
	cnnInitOverlay(); //legacy overlay init
	
});


// Flipper T1

var CNN_T1Flipper = {	// interface
	prev: function () {},
	next: function () {},
	play: function () {},
	stop: function () {},
	imgClick: function () {}
};

var cnnT1Flipper = CNN_T1Flipper;	// instance


if ( typeof Class === "object" )	// check for Prototype
{
	CNN_T1Flipper = Class.create();

	CNN_T1Flipper.prototype = {

		initialize: function ()
		{
			this.locked = false;
			this.panels = $$('#cnn_maint1lftf .cnn_flpprt1pnl');
			this.navboxes = $$('#cnn_maint1lftf .cnn_flpprt1nvbx');
			this.iterator = 0;
			this.timer;
			this.autoPlay = false;
			for ( var i = 1, end = this.panels.length; i < end; ++i ) {
				this.panels[i].hide();
			}
		},

		navigatePanel: function (dir)
		{
			var num = this.iterator;
			// increment/decrement iterator
			if ( dir === 'prev' ) {
				if ( num <= 0 ) {
					num = this.panels.size() - 1;
				} else {
					num -= 1;
				}
			} else {
				if ( num >= this.panels.size() -1 ) {
					num = 0;
				} else {
					num += 1;
				}
			}
			this.showPanel( num );
		},

		showPanel: function (num)
		{
			var self = this;
			if ( self.panels.size() > 0 && self.navboxes.size() > 0 
				&& typeof num === 'number' && num !== self.iterator
				&& 0 <= num && num <= self.panels.size()
			)
			{
				self.locked = true;
				Effect.Fade(
					self.panels[ self.iterator ],
					{
						duration: 0.25,
						afterFinish: function ()
						{
							// remove 'active' class from panel and navbox
							self.panels[ self.iterator ].removeClassName('cnn_flpprt1pnl_active');
							self.navboxes[ self.iterator ].removeClassName('cnn_flpprt1nvbx_active');

							self.iterator = num;

							// add 'active' class to panel and navbox
							self.panels[ self.iterator ].addClassName('cnn_flpprt1pnl_active');
							self.navboxes[ self.iterator ].addClassName('cnn_flpprt1nvbx_active');

							// make new stuff appear
							Effect.Appear(
								self.panels[ self.iterator ],
								{
									duration: 0.25,
									afterFinish: function ()
									{
										self.locked = false;
										if ( self.autoPlay ) {
											self.play();
										}
									}
								}
							);
						}
					}
				);
			}
		},

		prev: function ()
		{
			this.stop();
			this.navigatePanel( 'prev' );
		},

		next: function ()
		{
			this.stop();
			this.navigatePanel( 'next' );
		},

		play: function ()
		{
			var self = this;
			if ( self.panels.size() > 0 && self.navboxes.size() > 0 )
			{
				self.autoPlay = true;
				self.timer = window.setTimeout( function () { self.navigatePanel( 'next' ); }, 8000 );
			}
		},

		stop: function ()
		{
			this.autoPlay = false;
			window.clearTimeout( this.timer );
		},

		imgClick: function (url)
		{
			if ( url ) {
				window.location.href = url;
			}
		}
	};
}

/* share link functions
=============================================================== */
function cnnSetShareLnks() {
	// mixx
	var mixxURL = 'http://www.mixx.com/submit/story?page_url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'&description='+cnnShareDesc+'&partner=CNN';
	if($('cnnSBtnMixx')) {
		$('cnnSBtnMixx').href = mixxURL;
		$('cnnSBtnMixx').target="_blank";
	}
	if($('cnnSBtnMixxBot')) {
		$('cnnSBtnMixxBot').href = mixxURL;
		$('cnnSBtnMixxBot').target="_blank";
	}
	if($('cnnMixxEmbedTop')) {
		$('cnnMixxEmbedTop').href = mixxURL;
		$('cnnMixxEmbedTop').target="_blank";
	}
	if($('cnnMixxEmbedBot')) {
		$('cnnMixxEmbedBot').href = mixxURL;
		$('cnnMixxEmbedBot').target="_blank";
	}

	// Digg
	var diggURL = 'http://digg.com/submit?phase=2&url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'&bodytext='+cnnShareDesc;
	if($('cnnSBtnDigg')) {
		$('cnnSBtnDigg').href = diggURL;
		$('cnnSBtnDigg').target="_blank";
	}
	if($('cnnSBtnDiggBot')) {
		$('cnnSBtnDiggBot').href = diggURL;
		$('cnnSBtnDiggBot').target="_blank";
	}
	// Facebook
	var facebookURL = 'http://www.facebook.com/share.php?u='+encodeURIComponent(location.href);
	
	
	if($('cnnSBtnFacebook')) {
		$('cnnSBtnFacebook').href = facebookURL;
		$('cnnSBtnFacebook').target="_blank";
	}
	if($('cnnSBtnFacebookBot')) {
		$('cnnSBtnFacebookBot').href = facebookURL;
		$('cnnSBtnFacebookBot').target="_blank";
	}

	if($('cnnSBtnFacebookEmbedTop')) {
		$('cnnSBtnFacebookEmbedTop').href = facebookURL;
		$('cnnSBtnFacebookEmbedTop').target="_blank";
	}
	if($('cnnSBtnFacebookEmbedBot')) {
		$('cnnSBtnFacebookEmbedBot').href = facebookURL;
		$('cnnSBtnFacebookEmbedBot').target="_blank";
	}


	// del.icio.us
	var deliciousURL = 'http://del.icio.us/post?v=4&partner=cnn&noui&jump=close&url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle+'delicious';
	if($('cnnSBtnDelicious')) {
		$('cnnSBtnDelicious').href = deliciousURL;
		$('cnnSBtnDelicious').target="_blank";
	}
	if($('cnnSBtnDeliciousBot')) {
		$('cnnSBtnDeliciousBot').href = deliciousURL;
		$('cnnSBtnDeliciousBot').target="_blank";
	}
	// reddit
	var redditURL = 'http://reddit.com/submit?url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle;
	if($('cnnSBtnReddit')) {
		$('cnnSBtnReddit').href = redditURL;
		$('cnnSBtnReddit').target="_blank";
	}
	if($('cnnSBtnRedditBot')) {
		$('cnnSBtnRedditBot').href = redditURL;
		$('cnnSBtnRedditBot').target="_blank";
	}
	// stumbleupon
	var stumbleuponURL = 'http://www.stumbleupon.com/submit?url='+encodeURIComponent(location.href)+'&title='+cnnShareTitle;
	if($('cnnSBtnStumbleUpon')) {
		$('cnnSBtnStumbleUpon').href = stumbleuponURL;
		$('cnnSBtnStumbleUpon').target="_blank";
	}
	if($('cnnSBtnStumbleUponBot')) {
		$('cnnSBtnStumbleUponBot').href = stumbleuponURL;
		$('cnnSBtnStumbleUponBot').target="_blank";
	}
	// myspace
	var myspaceURL = 'http://www.myspace.com/Modules/PostTo/Pages/?' + 't=' + cnnShareTitle + '&c=' + cnnShareDesc + '&u=' + encodeURIComponent(location.href);
	if($('cnnSBtnMyspace')) {
		$('cnnSBtnMyspace').href = myspaceURL;
		$('cnnSBtnMyspace').target="_blank";
	}
	if($('cnnSBtnMyspaceBot')) {
		$('cnnSBtnMyspaceBot').href = myspaceURL;
		$('cnnSBtnMyspaceBot').target="_blank";
	}
	
	//var twitterURL = 'http://cnntweet.appspot.com/articles/' + encodeURIComponent(location.href) + '/' + cnnShareTitle + '/tweet/';
	var twitterURL = 'https://twitter.com/intent/tweet?url=' + encodeURIComponent(location.href) + '&text=' + cnnShareTitle + '&hashtags=cnn'; 
	
	if($('cnnSBtnTwitter')) {
		$('cnnSBtnTwitter').href = twitterURL;
		$('cnnSBtnTwitter').target="_blank";
	}
	if($('cnnSBtnTwitterBot')) {
		$('cnnSBtnTwitterBot').href = twitterURL;
		$('cnnSBtnTwitterBot').target="_blank";
	}
	if($('cnnSBtnTwitterEmbedTop')) {
		$('cnnSBtnTwitterEmbedTop').href = twitterURL;
		$('cnnSBtnTwitterEmbedTop').target="_blank";
	}
	if($('cnnSBtnTwitterEmbedBot')) {
		$('cnnSBtnTwitterEmbedBot').href = twitterURL;
		$('cnnSBtnTwitterEmbedBot').target="_blank";
	}
	// linkedIn
	var linkedInURL = 'http://www.linkedin.com/shareArticle?mini=true&url=' + encodeURIComponent(location.href) + '&title=' + cnnShareTitle + '&summary=' + cnnShareDesc + '&source=CNN'; 
	if($('cnnSBtnLinkedIn')) {
		$('cnnSBtnLinkedIn').href = linkedInURL;
		$('cnnSBtnLinkedIn').target="_blank";
	}
	if($('cnnSBtnLinkedInBot')) {
		$('cnnSBtnLinkedInBot').href = linkedInURL;
		$('cnnSBtnLinkedInBot').target="_blank";
	}
	// viadeo
	var viadeoURL = 'http://www.viadeo.com/shareit/share/?url=' + encodeURIComponent(location.href) + '&title=' + cnnShareTitle + '&overview=' + cnnShareDesc + '&urllanguage=en&urlaffiliate=40538&encoding=ISO 8859-1'; 
	if($('cnnSBtnViadeo')) {
		$('cnnSBtnViadeo').href = viadeoURL;
		$('cnnSBtnViadeo').target="_blank";
	}
	if($('cnnSBtnViadeoBot')) {
		$('cnnSBtnViadeoBot').href = viadeoURL;
		$('cnnSBtnViadeoBot').target="_blank";
	}	
}

/*_______________________ story image changer ____________________________*/
var cnn_stryichgcrr = 1;
var cnn_stryichgmax = 0;

function cnn_stryichgS(img_id) {

	if(img_id != cnn_stryichgcrr) {
		$('cnn_stryichgnm' + cnn_stryichgcrr).className = 'cnn_stryichgn' + cnn_stryichgcrr;
		$('cnn_stryichgnm' + img_id).className = 'cnn_stryichgn' + img_id + ' cnn_stryichgn' + img_id + 'on';
		
		
		$('cnnImageChangerImg').src = CNN_storyImageGallery[img_id-1].image;
		if($('cnnImageChangerCap')) {
			$('cnnImageChangerCap').update(CNN_storyImageGallery[img_id-1].caption);
			$('cnnImageChangerImg').setAttribute("alt",CNN_storyImageGallery[img_id-1].caption);
		} else {
		$('cnnImageChangerImg').setAttribute("alt",CNN_storyImageGallery[img_id-1].image);
		
		}
		cnn_stryichgcrr = img_id;


	}
}

function cnn_stryichgP() {
	var temp_i = cnn_stryichgcrr;
	if(temp_i == 1) { temp_i = cnn_stryichgmax; }
	else { temp_i--; }
	cnn_stryichgS(temp_i);
}

function cnn_stryichgN() {
	var temp_i = cnn_stryichgcrr;
	if(temp_i == cnn_stryichgmax) { temp_i = 1; }
	else { temp_i++; }
	cnn_stryichgS(temp_i);
}

function cnn_stryichgInit() {
	temp_s = '';
	cnn_stryichgmax = CNN_storyImageGallery.length;
	for(i = 1;i <= cnn_stryichgmax;i++) {
		temp_s += '<a id="cnn_stryichgnm' + i + '" href="javascript:cnn_stryichgS('+ i + ');" class="cnn_stryichgn' + i;
		if(i == 1) { temp_s += ' cnn_stryichgn' + i + 'on'; }	
		temp_s += '"><img src="http://i.cdn.turner.com/cnn/.element/img/3.0/1px.gif" border="0"></a>';
	}
	Element.update('cnn_stryichgnm', temp_s);
}

function CNN_renderRecommend(obj) {
	var assetsLength = obj.assets.length;
	var numResults = 0;

	var retHTML ='<h4>We recommend<\/h4><ul class="cnn_bulletbin">';
	for(var i=0;i<assetsLength;i++) {
				
		var relatedURL = "";
		if(obj.assets[i].site.toLowerCase() !== 'cnn' && obj.assets[i]['site-url'] !== '' && obj.assets[i].siteId.indexOf('http://') === -1) {
			relatedURL += obj.assets[i]['site-url'];
		}
		relatedURL += obj.assets[i].siteId;
		retHTML += '<li><a href="'+relatedURL+'">'+obj.assets[i].headline+'<\/a>';
		if(obj.assets[i].wool != "") {
			retHTML += ' <span>'+obj.assets[i].wool.replace(': ','')+'<\/span>';
		}
		
		retHTML += '<\/li>';
		numResults++;
		if(numResults > 2) {
			break;
		}
	}
	retHTML+='<\/ul>';
	return retHTML;
}

/* global event handlers
=========================================================================== */
function cnnMouseDown(e) {
	if (cnnDropdownOpen) {cnnDD.mouseDownBody(e);}
	if (cnnOverlayMenuOpen) {cnnOverlayMouseDownBody(e);}
	return true;
}
/* end global event handlers
=========================================================================== */


/* styled overlay menus
=========================================================================== */
var cnnOverlayOpenId = "";
var cnnOverlayClickedId = "";
var cnnOverlayMenuOpen = false;

// Map menu id's to button classes, for determining later on if the current menu
// is one with non-default behavior.
var cnnOverlayClass = [];


function cnnInitOverlay() {
	document.body.onmousedown = cnnMouseDown;

	// Overlay menus with default behavior
	cnnAddOverlayEvents("cnnOverlayLnk");

	// Add code here for overlay menus with non-default behavior
}


function cnnShowOverlay(menuId) {
	if ($(menuId)) {
		// If the menu is already open, close it
		if ($(menuId).style.display == "block") {
			$(menuId).style.display = "none";
		}
		else {
			$(menuId).style.display = "block";
			cnnOverlayOpenId = menuId;
		    cnnOverlayMenuOpen = true;
			cnnOverlayClickedId = "";
		}
	}

	// Add code here for overlay menus with non-default behavior
}


function cnnHideOverlay(menuId) {
	if ($(menuId)) {
		$(menuId).style.display = "none";
		cnnOverlayOpenId = '';
	    cnnOverlayMenuOpen = false;
	}

	// Add code here for overlay menus with non-default behavior
}


function cnnGetOverlayMenuId(btn) {
	// Get the id parameter from href="javascript:foo('myId')"
	return btn.href.substring(btn.href.indexOf("'") + 1, btn.href.lastIndexOf("'"));
}


function cnnAddOverlayEvents(btnClass) {
	var btnArray = document.getElementsByClassName(btnClass);
	for (var i = 0; i < btnArray.length; i++) {
		// button
		var btn = btnArray[i];
		btn.onmousedown = cnnOverlayMouseDownBtn;

		// menu
		var menuId = cnnGetOverlayMenuId(btn);
		if ($(menuId)) {
			$(menuId).onmousedown = cnnOverlayMouseDownMenu;
		}

		// Store the button class associated with the menu id
	    cnnOverlayClass[menuId] = btnClass;

		// Mac Safari image-rollover bug
		if ((navigator.userAgent.indexOf("Safari") != -1)
		 && (navigator.userAgent.indexOf("Mac") != -1)) {
			// If cnnImgSwap() is called by the onmouseout event
			if (btn.onmouseout && btn.onmouseout.toString().indexOf("cnnImgSwap") != -1) {
				// Make onclick call the onmouseout event handler
				btn.onclick = function onclick() { this.onmouseout(); return true; };
			}
		}
	}
}


function cnnOverlayMouseDownBtn(e) {
	// Get the menu id
	var menuId = cnnGetOverlayMenuId(this);
	cnnOverlayClickedId = menuId;
	return true;
}


function cnnOverlayMouseDownMenu(e) {
	// Get the menu id
	cnnOverlayClickedId = this.id;
	return true;
}


function cnnOverlayMouseDownBody(e) {
	// Close the open overlay menu, unless the mouse is inside the menu
	// or the menu button.
	if (cnnOverlayOpenId != cnnOverlayClickedId) {
		cnnHideOverlay(cnnOverlayOpenId);
	}
	cnnOverlayClickedId = "";
	return true;
}
/* end styled overlay menus
=========================================================================== */

/* breaking news banner
=========================================================================== */
var cdn_prefix = 'http://i.cdn.turner.com/cnn/';

function cnn_EleObjs(e) 
{ 
	if(typeof(e)=='string') 
	{ 
		if(document.getElementById) 
		{ 
			e=document.getElementById(e); 
		} 
		else if(document.all) 
		{
			e=document.all[e]; 
		} 
		else 
		{ 
			e=null; 
		} 
	} 
	return e; 
}

function cnnRenderTimeStamp(date,timeString) {
	var cnnIsIntl = (location.hostname.indexOf('edition.') > -1) ? true : false;
	cnnStoryPublishTime = (date) ? new Date(date) : cnnStoryPublishTime;
	var days = new Array('Sun','Mon','Tue','Wed','Thur','Fri','Sat');
	var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

    var cnnTimeStampDiff = cnnCurrTime.getTime() - cnnStoryPublishTime.getTime();

    var daysDifference = Math.floor(cnnTimeStampDiff/1000/60/60/24);

    cnnTimeStampDiff -= daysDifference*1000*60*60*24;

    var hoursDifference = Math.floor(cnnTimeStampDiff/1000/60/60);

    cnnTimeStampDiff -= hoursDifference*1000*60*60;

    var minutesDifference = Math.floor(cnnTimeStampDiff/1000/60);

    cnnTimeStampDiff -= minutesDifference*1000*60;

	var cnnDays = (daysDifference > 1) ? "days" : "day";
	var cnnHours = (hoursDifference > 1) ? "hours" : "hour";
	var cnnMinutes = (minutesDifference > 1) ? "minutes" : "minute";
	var cnnHPMinutes = "min";
	var cnnCMSTimeString = '';
	var cnnBlankString = "";

	if (timeString) {
		cnnCMSTimeString = (cnnIsIntl) ? timeString[0] : timeString[1];
	}	else { //for legacy support
		cnnCMSTimeString = "updated " + (!cnnIsIntl ? days[cnnStoryPublishTime.getUTCDay()] : '') + " " + months[cnnStoryPublishTime.getUTCMonth()] + " " + cnnStoryPublishTime.getUTCDate() + ", " + cnnStoryPublishTime.getUTCFullYear();
	}


	if (hoursDifference > 4 && daysDifference >= 0 || daysDifference >= 1) {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				return cnnBlankString;
			break;
			case "mosaic":
				return "<div class=\"cnnGryTmeStmp\">" + cnnCMSTimeString + "<\/div>";
			break;
			case "search_07":
				if (daysDifference < 1) {
					if (minutesDifference > 0) {
						return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
					} else {
						return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
					}
				} else if (daysDifference < 3) {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + daysDifference + " "+cnnDays+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStampGrey\">" + cnnCMSTimeString + "<\/span>";
				}
			break;
			case "sectionSpr10":
				return "";
			case "section":
			default:
				if (pagetypeTS == 'section' && cnnIsIntl) {
					return "<div class=\"cnnGryTmeStmp\">" + cnnCMSTimeString + "<\/div>";
				} else {
					return "<div class=\"cnnGryTmeStmp\">updated " + (!cnnIsIntl ? days[cnnStoryPublishTime.getUTCDay()] : '') + " " + months[cnnStoryPublishTime.getUTCMonth()] + " " + cnnStoryPublishTime.getUTCDate() + ", " + cnnStoryPublishTime.getUTCFullYear() + "<\/div>";
				}
		}
	} else if( hoursDifference <= 4 && hoursDifference >= 1) {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				return cnnBlankString;
			break;
			case "search_07":
				if (minutesDifference > 0) {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
				}
			break;
			case "sectionSpr10":
				if (minutesDifference > 0) {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + "mins ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStampGrey\">updated " + hoursDifference + " "+cnnHours+" ago<\/span>";
				}
			break;
			case "mosaic":
			default:
				if (minutesDifference > 0) {
					return "<div class=\"cnnGryTmeStmp\">updated " + hoursDifference + " "+cnnHours+", " + minutesDifference + " "+cnnMinutes+" ago<\/div>";
				} else {
					return "<div class=\"cnnGryTmeStmp\">updated " + hoursDifference + " "+cnnHours+" ago<\/div>";
				}
		}
	} else {
		switch(pagetypeTS) {
			case "homepage": //t2 formatted
				if(hoursDifference < 1 && minutesDifference > 0){
					return '<span>' + minutesDifference + " min<\/span>";
				} else {
					return "<span>1 min<\/span>";
				}
			break;
			case "sectionSpr10":
				if(hoursDifference < 1 && minutesDifference > 0){
					return '<span>' + minutesDifference + " mins ago<\/span>";
				} else {
					return "<span>1 min<\/span>";
				}
			break;
			case "search_07":
				if(hoursDifference < 1 && minutesDifference > 0){
					return "<span class=\"cnnContentTimeStamp\">updated " + minutesDifference + " "+cnnMinutes+" ago<\/span>";
				} else {
					return "<span class=\"cnnContentTimeStamp\">updated 1 minute ago<\/span>";
				}
			case "mosaic":
			default:
				if(hoursDifference < 1 && minutesDifference > 0){
					return "updated " + minutesDifference + " "+cnnMinutes+" ago";
				} else {
					return "updated 1 minute ago";
				}
		}

	}
}
function cnn_clsbnbnnr(bannerTimestamp) 
{ 
	//cnn_EleObjs('cnn_bnbcntr').className = 'cnn_dynone'; 
	$('cnnBannerContainer').style.display = "none";
	// Insert cookie with timestamp to ensure that Banner isn't shown again until next updated
	document.cookie = "bannerLastClosed=" + bannerTimestamp + "; path=/; domain=cnn.com";
}

function cnnRenderGenericBanner(object, flashURL, leftColor, rightColor, img, imgURL )
{
	// Check cookie to ensure that Banner has been updated since user last closed it
	if( document.cookie.length > 0 )
	{
		cookieName = "bannerLastClosed";
		cookieStart = document.cookie.indexOf( cookieName + "=" );
		if( cookieStart != -1 )
		{
			cookieStart = cookieStart + cookieName.length + 1;
			cookieEnd = document.cookie.indexOf( ";", cookieStart );
			if( cookieEnd == -1 ) {cookieEnd = document.cookie.length;}
			bannerLastClosed = unescape( document.cookie.substring(cookieStart, cookieEnd) );
			currentBannerTimestamp = object.id;
			if( parseInt(bannerLastClosed, 10) >= parseInt(currentBannerTimestamp, 10) ) 
			{
				//alert("<!-- Breaking news banner not updated since " + object.id + " -->");
				return "<!-- Breaking news banner not updated since " + object.id + " -->";
			}
		}
	}
	
	var myHtml = '<div class="cnn_maincntnr" style="margin-top:6px;"><div class="cnn_contentarea"><div class="cnn_sdbx"><div class="cnn_sdbx1"><div class="cnn_sdbx2"><div class="cnn_sdbx3"><div class="cnn_sdbx4"><div class="cnn_sdbx5"><div class="cnn_sdbxcntnt"><div id="cnn_bnbcntr"><div id="cnn_bnblft">';

	//EDB 04/27/11 CNN-15853
	if(img.length > 0)
        {
                if(imgURL.length > 0)
                {
                        myHtml += '<a href="' + imgURL + '">';
                }
                myHtml += '<img border="0" height="52" width="156" src="' + cdn_prefix + '/.element/img/3.0/main/' + img + '">';

                if(imgURL.length > 0)
                {
                        myHtml += '</a>';
                }

        }
    	else if (swfobject.hasFlashPlayerVersion("8.0.0")) 
	{
		myHtml += '<object id="cnnAnimatedBannerTitle" height="52" width="156" data="' + flashURL + '" pluginspage="http://www.macromedia.com/go/getflashplayer" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" type="application/x-shockwave-flash">';
		myHtml += '<param value="' + flashURL + '" name="movie"/>';
		myHtml += '<param value="false" name="menu"/>';
		myHtml += '<param value="high" name="quality"/>';
		myHtml += '<param value="always" name="allowScriptAccess"/>';
		myHtml += '<param value="transparent" name="wmode"/>';
		myHtml += '<embed height="52" width="156" wmode="transparent" allowscriptaccess="always" quality="high" menu="false" src="' + flashURL + '" name="cnnAnimatedBannerTitle" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"/></object>';
	}
	else 
	{
		myHtml += '<img height="52" width="156" src="' + cdn_prefix + '/.element/img/3.0/main/breakingnews.gif">';
	}

	myHtml += '</div><div id="cnn_bnbrgt1"><div>';

        if(imgURL.length > 0) {
                myHtml += '<a style="color: rgb(255, 255, 255)" href="' + imgURL + '">';
        }

        myHtml += object.content + '&nbsp;';

        if(imgURL.length > 0) {
                myHtml += '</a>';
        }


	if( typeof(object.linkTitle) != "undefined" )
	{
		myHtml += '<a id="cnn_bnbrgt3" style="opacity: 1; filter: alpha(opacity = 100);" href="' + object.linkURL + '">' + object.linkTitle + '</a>';
	}
	myHtml += '</div></div>';
	myHtml += '<div id="cnn_bnbrgt2" style="opacity: 1; filter: alpha(opacity = 100);"></div><div id="cnn_bnbrgt4">';
	myHtml += '<a href="javascript:cnn_clsbnbnnr(' + object.id + ');"><img src="' + cdn_prefix + '/.element/img/3.0/1px.gif" border="0"></a></div></div></div></div></div></div></div></div></div></div></div>';
	
	return myHtml;
}

function cnnRenderDomesticBanner(object){
	var flashURL=cdn_prefix + '/.element/swf/3.0/breaking.news/yellowBanner2.swf';
	var leftColor='';
	var rightColor='';
	var img='';
	var imgURL='';
	switch (object.type) {
		case 'Live Breaking News':leftColor='cnnYellow';rightColor='cnnBlack';break;
		case 'Breaking News':leftColor='cnnBlack';rightColor='cnnYellow';break;
		case 'Live Developing Story':leftColor='cnnRed';rightColor='cnnBlack';flashURL='http://i2.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_dev_domestic.swf';break;
		case 'Developing Story':leftColor='cnnBlack';rightColor='cnnRed';break;
		case 'Watch Now':leftColor='cnnBlue';rightColor='cnnBlue';break;
		case 'Live Election Coverage':leftColor='cnnBlackElex';rightColor='cnnDrkBlue';break;
		case 'Live Inauguration Coverage':leftColor='cnnBlackElex';rightColor='cnnDrkGry';break;
		case 'Connect with CNN':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i2.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_connectWithCNN.swf';break;
		case 'Live Now (sponsored)':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i2.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		case 'Live Now':leftColor='cnnBlue';rightColor='cnnBlack';flashURL='http://i2.cdn.turner.com/cnn/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		// EDB 4/27/11
        	case 'Royal Wedding':
			img='RW_live_banner.jpg';
                        imgURL='http://www.cnn.com/SPECIALS/2011/royal.wedding/live/';
                	//dont show royal banner on home page
                	if(document.location.pathname == '/' || document.location.pathname == '/index.html' || document.location.pathname == '/SPECIALS/2011/royal.wedding/live/')
                	{
                        	return '';
                	}
                	break;
		default:return '';
	}
	//new Effect.Appear('cnn_bnbrgt2',{duration:2});
	return cnnRenderGenericBanner(object,flashURL,leftColor,rightColor, img, imgURL);
}

function cnnRenderInternationalBanner(object){
	var flashURL=cdn_prefix + '/.element/swf/3.0/breaking.news/yellowBanner2.swf';
	var leftColor='';
	var rightColor='';
	var img='';
	var imgURL='';
	switch (object.type) {
		case 'Live Breaking News':leftColor='cnnYellow';rightColor='cnnBlack';break;
		case 'Breaking News':leftColor='cnnBlack';rightColor='cnnYellow';break;
		case 'Live Developing Story':leftColor='cnnYellow';rightColor='cnnBlack';flashURL=cdn_prefix+'/.element/swf/2.0/breaking_news/bn_dev.swf';break;
		case 'Developing Story':leftColor='cnnBlack';rightColor='cnnYellow';break;
		case 'Watch Now':leftColor='cnnBlue';rightColor='cnnBlue';break;
		case 'Connect with CNN':leftColor='cnnBlue';rightColor='cnnBlack';flashURL=cdn_prefix+'/.element/swf/2.0/breaking_news/bn_connectWithCNN.swf';break;
		case 'Live Now (sponsored)':leftColor='cnnBlue';rightColor='cnnBlack';flashURL=cdn_prefix+'/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		case 'Live Now':leftColor='cnnBlue';rightColor='cnnBlack';flashURL=cdn_prefix+'/.element/swf/2.0/breaking_news/bn_liveNow.swf';break;
		// EDB 4/27/11
        	case 'Royal Wedding':
			img='RW_live_banner.jpg';
                        imgURL='http://www.cnn.com/SPECIALS/2011/royal.wedding/live/';
                	//dont show royal banner on home page
                	if(document.location.pathname == '/' || document.location.pathname == '/index.html' || document.location.pathname == '/SPECIALS/2011/royal.wedding/live/')
                	{
                        	return '';
                	}
                	break;
		default:return '';
	}
	//new Effect.Appear('cnn_bnbrgt2',{duration:2});
	return cnnRenderGenericBanner(object,flashURL,leftColor,rightColor, img, imgURL);
}
/* end breaking news banner
=========================================================================== */


/*

Flash Detect and Render
=======================

The CNN_FlashObject takes a few required arguments...

	name ......... the id/name of the object/embed
	src .......... the URL of the swf
	width ........ (i think this should be required)
	height ....... (i think this should be required)

...and some optional arguments...

	parameters ... this is a "hash" of keys and values
		{ menu: "true", play: "false", loop: "false" }
		(or set this to null or an empty string to skip)

	flashVars .... this is a hash or a string
		{ cs_url: "/football/nfl/scoreboards/today/" }
		- or -
		"cs_url=/football/nfl/scoreboards/today/"


Sample Usage:
if ( new CNN_FlashDetect().detectVersion( 6 ) ) {

	var cnn_Scoreboard = new CNN_FlashObject( "cnnScoreboard",
		"/.element/img/2.0/swf/nfl_scoreboard.swf",
		420, 85, null, "cs_url=/football/nfl/scoreboards/today/" );

	cnn_Scoreboard.writeHtml();

} else {
	document.write( 'alternate html' );
}

Of course, if you plan to have Flash in lots of places on a page,
it might make more sense to make a global variable for the detection.
You could go as far as creating a session-based cookie...

*/

var VBS_Result = false;

function CNN_FlashDetect() { }

CNN_FlashDetect.prototype.maxVersionToDetect = 10;
CNN_FlashDetect.prototype.minVersionToDetect = 3;

CNN_FlashDetect.prototype.hasPlugin = ( navigator.mimeTypes &&
		navigator.mimeTypes.length &&
		navigator.mimeTypes["application/x-shockwave-flash"] &&
		navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin );

CNN_FlashDetect.prototype.hasActiveX = window.ActiveXObject;

CNN_FlashDetect.prototype.hasWinIE = ( navigator.userAgent &&
		( navigator.userAgent.indexOf( "MSIE" ) != -1 ) &&
		navigator.appVersion &&
		( navigator.appVersion.indexOf( "Win" ) != -1 ) );

CNN_FlashDetect.prototype.getVersion = function () {
	var versionNum = 0;
	var i = 0;

	if ( this.hasActiveX ) {
		var activeXObject = false;
		for ( i = this.maxVersionToDetect; i >= this.minVersionToDetect && !activeXObject; versionNum = ( activeXObject ? i : versionNum ), i-- ) {
			try {
				activeXObject = new ActiveXObject( "ShockwaveFlash.ShockwaveFlash." + i );
			} catch( e ) {
				// do nothing
			}
		}
	} else if ( this.hasWinIE ) {
		VBS_Result = false;
		for ( i = this.maxVersionToDetect; i >= this.minVersionToDetect && !VBS_Result; versionNum = ( VBS_Result ? i : versionNum ), i-- ) {
			execScript( 'on error resume next: VBS_Result = IsObject( CreateObject( "ShockwaveFlash.ShockwaveFlash.' + i + '" ) )', 'VBScript' );
		}
	} else if ( this.hasPlugin ) {
		if ( navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"] ) {
			var words = navigator.plugins["Shockwave Flash"].description.split( " " );
			for ( i = 0; i < words.length; ++i ) {
				var wordAsNum = parseInt( words[i], 10 ); 
				if ( isNaN( wordAsNum ) ) { 
					continue; 
				}
				else { 
					versionNum = wordAsNum; 
					break; // assume first number we get is version number 
				} 
			}
		}
	}

	return ( versionNum );
};

CNN_FlashDetect.prototype.detectVersion = function ( num ) {
	var isVersionSupported = false;

	if ( ! isNaN( num ) ) {
		isVersionSupported = ( parseInt( this.getVersion(), 10 ) >= parseInt( num, 10 ) ); 
	}

	return ( isVersionSupported );
};


function CNN_FlashObject( p_name, p_src, p_width, p_height, p_parameters, p_flashVars ) {
	this.m_name			= p_name;
	this.m_src			= p_src;
	this.m_width		= p_width;
	this.m_height		= p_height;
	this.m_flashVars	= p_flashVars;

// constructor
	if ( p_parameters )
	{
		this.setParams( p_parameters );
	}
}

// Declare member properties
CNN_FlashObject.prototype.m_name = '';
CNN_FlashObject.prototype.m_src = '';
CNN_FlashObject.prototype.m_width = '';
CNN_FlashObject.prototype.m_height = '';
CNN_FlashObject.prototype.m_flashVars = '';

CNN_FlashObject.prototype.m_params = {
	menu:		"false",
	quality:	"high",
	allowScriptAccess:		"always",
	wmode:		"transparent"

};

CNN_FlashObject.prototype.setParam = function ( p_name, p_value ) {
	this.m_params[ p_name ] = p_value;
};

CNN_FlashObject.prototype.setParams = function ( p_paramHash ) {
	if ( typeof p_paramHash == "object" ) {
		for ( var param in p_paramHash ) {
			if ( p_paramHash[param] ) {
				this.setParam( param, p_paramHash[param] );
			}
		}
	}
};

CNN_FlashObject.prototype.getParam = function ( p_name ) {
	return ( this.m_params[ p_name ] );
};

CNN_FlashObject.prototype.getParams = function () {
	return ( this.m_params );
};

CNN_FlashObject.prototype.getFlashVarsString = function () {
	var flashVarsString = '';

	if ( typeof this.m_flashVars == "string" ) {
		flashVarsString = this.m_flashVars;
	} else if ( typeof this.m_flashVars == "object" ) {
		for ( var flashVar in this.m_flashVars ) {
			if ( flashVarsString != '' ) {
				flashVarsString += "&";
			}
			flashVarsString += flashVar + "=" + escape( this.m_flashVars[flashVar] );
		}
	}

	return ( flashVarsString );
};

CNN_FlashObject.prototype.getAttributeString = function ( p_attr, p_value ) {
	return ( p_value ? ' ' + p_attr + '="' + p_value + '"' : '' );
};

CNN_FlashObject.prototype.getParamTag = function ( p_name, p_value ) {
	return ( p_value ? '<param name="' + p_name + '" value="' + p_value + '">' : '' );
};

CNN_FlashObject.prototype.getHtml = function () {
	var htmlString = '';
	var eachParam = '';
	var flashUrl = 'http://www.macromedia.com/go/getflashplayer';

// open object
	htmlString += '<object type="application/x-shockwave-flash" \
					classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
	htmlString += this.getAttributeString( 'pluginspage', flashUrl );
	htmlString += this.getAttributeString( 'id', this.m_name );
	htmlString += this.getAttributeString( 'data', this.m_src );
	htmlString += this.getAttributeString( 'width', this.m_width );
	htmlString += this.getAttributeString( 'height', this.m_height );
	htmlString += '>';
	htmlString += this.getParamTag( 'movie', this.m_src );
	for ( eachParam in this.getParams() ) {
		htmlString += this.getParamTag( eachParam, this.getParam( eachParam ) );
	}
	htmlString += this.getParamTag( 'flashVars', this.getFlashVarsString() );

// open embed
	htmlString += '<embed type="application/x-shockwave-flash"';
	htmlString += this.getAttributeString( 'pluginspage', flashUrl );
	htmlString += this.getAttributeString( 'name', this.m_name );
	htmlString += this.getAttributeString( 'src', this.m_src );
	htmlString += this.getAttributeString( 'width', this.m_width );
	htmlString += this.getAttributeString( 'height', this.m_height );
	for ( eachParam in this.getParams() ) {
		htmlString += this.getAttributeString( eachParam, this.getParam( eachParam ) );
	}
	htmlString += this.getAttributeString( 'flashVars', this.getFlashVarsString() );
	htmlString += '>';

// close embed
	htmlString += '<\/embed>';

// close object
	htmlString += '<\/object>';

	return ( htmlString );
};

CNN_FlashObject.prototype.writeHtml = function () {
	document.write( this.getHtml() );
};

CNN_FlashObject.prototype.writeMosaicHtml = function (id) {
	document.getElementById(id).innerHTML =  this.getHtml();
};


var cnnDropdownOpen = false;





var cnnDocDomain='';
if(location.hostname.indexOf('cnn.com')>0) { cnnDocDomain='cnn.com'; }
if(location.hostname.indexOf('turner.com')>0) { cnnDocDomain='turner.com'; }
if(cnnDocDomain) { document.domain = cnnDocDomain; }

/* search functions
===================================================================== */

var cnnStrInvalidSrchMsg = 'Please enter a valid search term and try again.'+"\n"+'HTML, URLs, and Scripts are not allowed.';

function cnnSearch( frm ) {
	if($('hdr-search-box').value != '') {
		if(!cnnVerifySearchString($('hdr-search-box').value)) {alert(cnnStrInvalidSrchMsg);}
		else {
			var strSearchLoc = cnnGetSearchLoc();
			strSearchLoc += 'query=' + cnnLeftTrim($('hdr-search-box').value);

			strSearchLoc += '&';
			strSearchLoc += 'primaryType=' + $('cnnHeadSrchType').value;
			strSearchLoc += '&';
			strSearchLoc += 'sortBy=date';
			if(location.hostname.indexOf('edition') < 0) {
				strSearchLoc += '&';
				strSearchLoc += 'intl=false';
			} else {
				strSearchLoc += '&';
				strSearchLoc += 'intl=true';
			}
			location.href = strSearchLoc;
		}
	}
	return false;
}

function cnnVerifySearchString( srchTerm ) {
	var htmlRegEx = new RegExp('[\w*|\W*]*<[[\w*|\W*]*|/[\w*|\W*]]>[\w*|\W*]*');

	if(htmlRegEx.exec(srchTerm) || (srchTerm == null) || (cnnLeftTrim(srchTerm).length == 0) || (srchTerm.indexOf(">") >= 0) || (srchTerm.indexOf(";") >= 0) ){
		return false;
	}
	else {return true;}
}

function cnnGetSearchLoc() {
	var strSearchLoc = 'http://www.cnn.com/search/?'; // default

	if((location.hostname.indexOf('qai') != -1) || (location.hostname.indexOf('dev') != -1) || (location.hostname.indexOf('localhost') != -1)) {
		strSearchLoc = 'http://q' + 'a' + 'i' + '.' + 'c' + 'n' + 'n' + '.' + 'c' + 'o' + 'm' + '/search/?';
	}
	return strSearchLoc;
}

function cnnLeftTrim(sString) {
	while (sString.substring(0,1) == ' ') {
		sString = sString.substring(1, sString.length);
	}
	return sString;
}

function cnnFootSearch( frm ) {
	if($('ftr-search-box').value != '') {
		if(!cnnVerifySearchString($('ftr-search-box').value)) {alert(cnnStrInvalidSrchMsg);}
		else {

			var strSearchLoc = cnnGetSearchLoc();
			strSearchLoc += 'query=' + cnnLeftTrim($('ftr-search-box').value);
			strSearchLoc += '&';
			strSearchLoc += 'primaryType=' + $('cnnFtrSrchType').value;
			strSearchLoc += '&';
			strSearchLoc += 'sortBy=date';
			if(location.hostname.indexOf('edition') < 0) {
				strSearchLoc += '&';
				strSearchLoc += 'intl=false';
			} else {
				strSearchLoc += '&';
				strSearchLoc += 'intl=true';
			}
			location.href = strSearchLoc;
		}
	}
	return false;
}

/* partner box global variable omniture tracking
=========================================================================== */
var cnnPSproducts="";
var cnnProducts = new Array();
/* end partner box output
=========================================================================== */


/*
function cnnUpdateSrchType( searchType ) {
	if($('cnnHeadSrchType')) {
		$('cnnHeadSrchType').value = searchType;
	}
	cnnUpdateSrchTypeLnks( searchType );
}

function cnnUpdateSrchTypeLnks( searchType ) {
	if($('cnnHeadSrchTypeArea')) {
		switch(searchType) {
			case 'web':
				$('cnnHeadSrchTypeArea').innerHTML = '<span class="cnnSearchLabel">Web</span> | <a href="javascript:cnnUpdateSrchType(\'news\');">CNN News</a> | <a href="javascript:cnnUpdateSrchType(\'video\');">CNN Videos</a>';
				break;
			case 'news':
				$('cnnHeadSrchTypeArea').innerHTML = '<a href="javascript:cnnUpdateSrchType(\'web\');">Web</a> | <span class="cnnSearchLabel">CNN News</span> | <a href="javascript:cnnUpdateSrchType(\'video\');">CNN Videos</a>';
				break;
			case 'video':
				$('cnnHeadSrchTypeArea').innerHTML = '<a href="javascript:cnnUpdateSrchType(\'web\');">Web</a> | <a href="javascript:cnnUpdateSrchType(\'news\');">CNN News</a> | <span class="cnnSearchLabel">CNN Videos</span>';
				break;
			default:
				break;
		}
	}
}
*/
/* end search functions
===================================================================== */

/* evaluate url query string into object
=========================================================================== */

function cnn_geturlqargs() { 
	var args = new Object(); 
	var query = location.search.substring(1); 
	var pairs = query.split("&"); 
	for(var i = 0; i < pairs.length; i++) { 
		var pos = pairs[i].indexOf('='); 
		if (pos == -1) continue; 
		var argname = pairs[i].substring(0,pos); 
		var value = pairs[i].substring(pos+1); 
		args[argname] = unescape(value); 
	} 
	return args; 
}

/* #### SlideShow ############################################### */

var html5Check = /\b(iPad|iPod|iPhone)\b/.test(window.navigator.userAgent);

var CNN_SlideShowManager = (function () {
	// slideshow object
	var CNN_SlideShow = function (settings) {
		this.index = -1;
		this.id = settings.id;
		this.xmlurl = settings.xmlurl;
		this.width = settings.width || 640;
		this.height = settings.height || 360;
		this.xmldoc = settings.xmldoc;
		this.imageUrlRoot = settings.imageUrlRoot || this.xmldoc.querySelector( 'gallery:root > dir' ).firstChild.nodeValue || '';
		this.images = [];
		
		this.inited = false;
		this.wrapper = null;
		this.media = null;
		this.title = null;
		this.caption = null;
		this.pager = null;
		this.pages = null;
		
		var getFirstXmlValue = function (xml, query) {
			var result = '';
			try {
				result = xml.querySelector( query ).firstChild.nodeValue;
			} catch (e) {
			}
			return result;
		};
		
		for ( var i = 0, xmlimages = this.xmldoc.querySelectorAll( 'gallery:root > imgs > img' ), end = xmlimages.length, xmlimage = null, image = {}; i < end; i++ ) {
			xmlimage = xmlimages.item(i);
			image = {};
			// caption
			image['caption'] = getFirstXmlValue( xmlimage, 'caption' );
			// title
			image['title'] = getFirstXmlValue( xmlimage, 'title' );
			// lgUrl
			image['lgUrl'] = '' + this.imageUrlRoot + getFirstXmlValue( xmlimage, 'lgUrl' );
			// source?
			image['source'] = getFirstXmlValue( xmlimage, 'source' );
			if ( image['lgUrl'] ) {  // don't add if there's no image url
				this.images.push( image );
			}
		}
		
	};
	CNN_SlideShow.prototype = {
		slideshowTemplate: (function () {
			var template;
			template = new Element( 'div', { 'class': 'cnn_html_slideshow' } ).update( ''
				+ '<div class="cnn_html_slideshow_media">'
				+ 	'<div class="cnn_html_media">'
				+ 	'</div>'
				+ 	'<div class="cnn_html_slideshow_media_overlay">'
				+ 		'<div class="cnn_html_slideshow_media_caption"></div>'
				+ 	'</div>'
				+ '</div>'
				+ '<div class="cnn_html_slideshow_metadata">'
//				+ 	'<span class="cnn_html_media_utility">Hide caption</span>'
				+ 	'<div class="cnn_html_media_title"></div>'
				+ '</div>'
			);
			return template;
		})(),
		pagerTemplate: (function () {
			var template;
			template = new Element( 'div', { 'class': 'cnn_html_slideshow_controls' } ).update( ''
				+ '<span class="prev_slide">&lt;</span>'
				+ '<span class="next_slide">&gt;</span>'
				+ '<div class="cnn_html_slideshow_pager_container">'
				+ 	'<ul class="cnn_html_slideshow_pager">'
				+ 	'</ul>'
				+ '</div>'
			);
			
			return template;
		})(),
		init: function () {
			if ( this.inited ) {
				console.log( 'already inited slideshow "' + this.id + '"' );
			} else {
				this.inited = true;

				if ( this.images.length === 0 ) {  // problem?
					$(this.id).update( '<img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/640x360_ns_ipad.gif" width="' + this.width + '" height="' + this.height + '" alt="" border="0">' );
				} else {
					// create wrapper
					this.wrapper = this.slideshowTemplate.cloneNode(true);
					this.media = this.wrapper.select('.cnn_html_media')[0];
					this.media.setStyle({
						width: this.width,
						height: this.height
					});
					this.title = this.wrapper.select('.cnn_html_media_title')[0];
					this.caption = this.wrapper.select('.cnn_html_slideshow_media_caption')[0];
					
					// if we have more than one item
					if ( this.images.length > 1 ) {
						// create pager
						this.pager = this.pagerTemplate.cloneNode(true);
						this.pages = this.pager.select('.cnn_html_slideshow_pager')[0];
						
						// link up pager
						this.pager.select('.prev_slide')[0].observe('click', this.showPrev.bind(this) );
						this.pager.select('.next_slide')[0].observe('click', this.showNext.bind(this) );
						for ( var i = 0, end = this.images.length; i < end; i++ ) {
							this.pages.insert( new Element('li').update( '' + (i+1) ).observe('click', this.show.bind(this, i)) );
						}
						
						// attach pager
						this.wrapper.insert( this.pager );
					}
					
					// attach wrapper
					$(this.id).update( this.wrapper );
					
					this.show(0);
				}
			}
		},
		showPrev: function () {
			var num = this.index;
			if ( num <= 0 ) {
				num = this.images.length - 1;
			} else {
				num -= 1;
			}
			this.show( num );
		},
		showNext: function () {
			var num = this.index;
			if ( num >= this.images.length - 1 ) {
				num = 0;
			} else {
				num += 1;
			}
			this.show( num );
		},
		show: function (index) {
			var image;
			if ( this.media !== null && index !== this.index ) {
				image = this.images[index];
				// swap media URL
				this.media.setStyle({
					backgroundImage: "url('" + image['lgUrl'] + "')",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center center",
					backgroundSize: "auto auto"
				});
				// swap titles
				this.title.update( image['title'] );
				// swap captions
				this.caption.update( image['caption'] );
				// swap classes
				if ( this.index !== -1 ) {
					this.pages.childElements()[this.index].removeClassName('selected');
				}
				if ( index !== -1 ) {
					this.pages.childElements()[index].addClassName('selected');
				}
				// slide pager
				if ( index !== -1 && this.index !== -1 ) {
					var container = this.pages.parentElement,
						containerWidth = container.offsetWidth,
						pagesWidth = this.pages.offsetWidth,
						numberWidth = pagesWidth / this.images.length,
						leftOffset = -1 * index * numberWidth + ( (containerWidth - numberWidth) / 2 );
					if ( pagesWidth > containerWidth ) {
						if ( leftOffset > 0 ) {
							leftOffset = 0;
						}
						if ( leftOffset < containerWidth - pagesWidth ) {
							leftOffset = containerWidth - pagesWidth;
						}
						this.pages.style.left = '' + leftOffset + 'px';
					}
				}
				// assign new index
				this.index = index;
			}
		}
	};

	var slideshowIndex = [],
		slideshowHash = {},
		register = function (id, xmlurl, params) {
			var slideshow = params ? params : {};
			if ( typeof slideshow.width !== 'undefined' && slideshow.width === 416 ) {
				slideshow.height = 234;  // correcting SWF vs image ratio
			}
			if ( slideshowIndex.indexOf( id ) !== -1 ) {
				console.log( 'slideshow id "' + id + '" was already registered' );
			} else {
				// slideshow info
				slideshow.id = id;
				slideshow.xmlurl = xmlurl;
				new Ajax.Request( xmlurl, {
					onSuccess: function (response) {
						slideshow.xmldoc = response.responseXML;

						// register
						slideshowIndex.push( id );
						slideshowHash[ id ] = new CNN_SlideShow( slideshow );
						
						slideshowHash[ id ].init();
					},
					onFailure: function (response) {
						$(id).update( '<img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/640x360_ns_ipad.gif" width="' + this.width + '" height="' + this.height + '" alt="" border="0">' );
					}
				});
			}
		},
		getIds = function () {
			return slideshowIndex;
		},
		getSlideShows = function () {
			var array = [];
			slideshowIndex.each( function (slideshowId) {
				array.push( slideshowHash[slideshowId] );
			});
			return array;
		},
		getSlideShow = function (id) {
			if ( slideshowIndex.indexOf( id ) === -1 ) {
				console.log( 'There is no slideshow with id "' + id + '"' );
			} else {
				return slideshowHash[id];
			}
		}
	;
	
	return ({
		register: register,
		getIds: getIds,
		getSlideShows: getSlideShows,
		getSlideShow: getSlideShow
	});
})();

/* ### /SlideShow ############################################### */



/* Empty function that's triggered if and when a user is signed into MSIB and connected to FB  */
function cnn_onMemFBinit() { }



/* #### Alternate SlideShow (HTML version) ############################################### */

var CNN_SlideShowManagerAlt = (function () {
	// slideshow object
	var CNN_SlideShow = function (settings) {
		this.index = -1;
		this.id = settings.id;
		this.xmlurl = settings.xmlurl;
		this.width = settings.width || 640;
		this.height = settings.height || 360;
		this.xmldoc = settings.xmldoc;
		this.explainer = (this.xmlurl.indexOf( 'explainer.' ) > -1) ? 1 : 0;
		//console.log("this.explainer = "+this.explainer);
		if ( this.explainer === 1) {
			this.imageUrlRoot = this.xmlurl.split('data.xml')[0] + 'media/';
			//console.log("this.imageUrlRoot = "+this.imageUrlRoot);	
		}
		else { this.imageUrlRoot = settings.imageUrlRoot || this.xmldoc.querySelector( 'gallery:root > dir' ).firstChild.nodeValue || '' ; }		
		
		this.images = [];
		
		this.inited = false;
		this.wrapper = null;
		this.media = null;
		this.title = null;
		this.caption = null;
		this.pager = null;
		this.pages = null;
		
		var getFirstXmlValue = function (xml, query) {
			var result = '';
			try {
				result = xml.querySelector( query ).firstChild.nodeValue;
			} catch (e) {
			}
			return result;
		};		
		
		var xmlimagenodes = this.explainer ? 'data:root > tabs > tab' : 'gallery:root > imgs > img';
		
		for ( var i = 0, xmlimages = this.xmldoc.querySelectorAll( xmlimagenodes ), end = xmlimages.length, xmlimage = null, image = {}; i < end; i++ ) {
			xmlimage = xmlimages.item(i);
			
			image = {};
			// caption
			image['caption'] = getFirstXmlValue( xmlimage, 'caption' );
			
			if ( this.explainer ) {
				// headline
				image['headline'] = getFirstXmlValue( xmlimage, 'headline' );
				// title
				
				//image['title'] = getFirstXmlValue( 'data:root > headline', 'headline' );
				var title = this.xmldoc.getElementsByTagName( 'headline' )[0].firstChild.nodeValue;
				console.log("title = " + title);
				image['label'] = getFirstXmlValue( xmlimage, 'label' );
				// image file
				image['file'] = '' + this.imageUrlRoot + xmlimage.querySelector( 'content' ).getAttribute( 'file' );
				//append headline to caption
				image['caption'] = '<h4>'+getFirstXmlValue( xmlimage, 'headline' ) + '</h4>' + image['caption'];
				image['lgUrl']=image['file'];
			
			}
			
			else {
				// title
				image['title'] = getFirstXmlValue( xmlimage, 'title' );
				// lgUrl
				image['lgUrl'] = '' + this.imageUrlRoot + getFirstXmlValue( xmlimage, 'lgUrl' );
				// source?
				image['source'] = getFirstXmlValue( xmlimage, 'source' );
			}			
			
			if ( image['lgUrl'] ) {  // don't add if there's no image url
				this.images.push( image );
			}
		}
		
	};
	CNN_SlideShow.prototype = {
		slideshowTemplate: (function () {
			var template;
			template = new Element( 'div', { 'class': 'cnnExplainer cnn_html_slideshow' } ).update( ''
				+ '<div class="cnn_html_slideshow_media">'
				+ 	'<div class="cnn_html_media">'
				+ 	'</div>'
				+ 	'<div class="cnn_html_slideshow_media_overlay">'
				+ 		'<div class="cnn_html_slideshow_media_caption"></div>'
				+ 	'</div>'
				+ '</div>'
				+ '<div class="cnn_html_slideshow_metadata">'
//				+ 	'<span class="cnn_html_media_utility">Hide caption</span>'
				+ 	'<div class="cnn_html_media_title"></div>'
				+ '</div>'
			);
			return template;
		}()),
		pagerTemplate: (function () {
			var template;
			template = new Element( 'div', { 'class': 'cnn_html_slideshow_controls' } ).update( ''
				+ '<span class="prev_slide">&lt;</span>'
				+ '<span class="next_slide">&gt;</span>'
				+ '<div class="cnn_html_slideshow_pager_container">'
				+ 	'<ul class="cnn_html_slideshow_pager">'
				+ 	'</ul>'
				+ '</div>'
			);
			
			return template;
		}()),
		init: function () {
			if ( this.inited ) {
				console.log( 'already inited slideshow "' + this.id + '"' );
			} else {
				this.inited = true;

				if ( this.images.length === 0 ) {  // problem?
					$(this.id).update( '<img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/640x360_ns_ipad.gif" width="' + this.width + '" height="' + this.height + '" alt="" border="0">' );
				} else {
					// create wrapper
					this.wrapper = this.slideshowTemplate.cloneNode(true);
					this.media = this.wrapper.select('.cnn_html_media')[0];
					this.media.setStyle({
						width: this.width,
						height: this.height
					});
					this.title = this.wrapper.select('.cnn_html_media_title')[0];
					console.log("this.title = "+this.title);
					
					this.caption = this.wrapper.select('.cnn_html_slideshow_media_caption')[0];
					
					// if we have more than one item
					if ( this.images.length > 1 ) {
						// create pager
						this.pager = this.pagerTemplate.cloneNode(true);
						this.pages = this.pager.select('.cnn_html_slideshow_pager')[0];
						
						// link up pager
						this.pager.select('.prev_slide')[0].observe('click', this.showPrev.bind(this) );
						this.pager.select('.next_slide')[0].observe('click', this.showNext.bind(this) );
						for ( var i = 0, end = this.images.length; i < end; i++ ) {
							
							var pager_item = ( this.explainer === 1) ? this.images[i]['label'] : ('' + (i+1));
							this.pages.insert( new Element('li').update( pager_item ).observe('click', this.show.bind(this, i)) );
						}
						
						// attach pager
						this.wrapper.insert( this.pager );
					}
					
					// attach wrapper
					$(this.id).update( this.wrapper );
					
					this.show(0);
				}
			}
		},
		showPrev: function () {
			var num = this.index;
			if ( num <= 0 ) {
				num = this.images.length - 1;
			} else {
				num -= 1;
			}
			this.show( num );
		},
		showNext: function () {
			var num = this.index;
			if ( num >= this.images.length - 1 ) {
				num = 0;
			} else {
				num += 1;
			}
			this.show( num );
		},
		show: function (index) {
			var image;
			if ( this.media !== null && index !== this.index ) {
				image = this.images[index];
				// swap media URL
				this.media.setStyle({
					backgroundImage: "url('" + image['lgUrl'] + "')",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center center",
					backgroundSize: "auto auto"
				});
				
				// swap titles
				this.title.update( image['title'] );
				//this.title.update( image['headline'] );
				// swap captions
				this.caption.update( image['caption'] );
				// swap classes
				if ( this.index !== -1 ) {
					this.pages.childElements()[this.index].removeClassName('selected');
				}
				if ( index !== -1 ) {
					this.pages.childElements()[index].addClassName('selected');
				}
				// slide pager
				if ( index !== -1 && this.index !== -1 ) {
					var container = this.pages.parentNode,//******* $$('.cnn_html_slideshow_pager_container')[0],
						containerWidth = container.offsetWidth,
						pagesWidth = this.pages.offsetWidth,
						numberWidth = pagesWidth / this.images.length,
						leftOffset = -1 * index * numberWidth + ( (containerWidth - numberWidth) / 2 );
					//console.log('container = '+container);
					
					if ( pagesWidth > containerWidth ) {
						if ( leftOffset > 0 ) {
							leftOffset = 0;
						}
						if ( leftOffset < containerWidth - pagesWidth ) {
							leftOffset = containerWidth - pagesWidth;
						}
						this.pages.style.left = '' + leftOffset + 'px';
					}
				}
				// assign new index
				this.index = index;
			}
		}
	};

	var slideshowIndex = [],
		slideshowHash = {},
		register = function (id, xmlurl, params) {
			var slideshow = params ? params : {};
			if ( typeof slideshow.width !== 'undefined' && slideshow.width === 416 ) {
				slideshow.height = 234;  // correcting SWF vs image ratio
			}
			if ( slideshowIndex.indexOf( id ) !== -1 ) {
				console.log( 'slideshow id "' + id + '" was already registered' );
			} else {
				// slideshow info
				slideshow.id = id;
				slideshow.xmlurl = xmlurl;
				
				new Ajax.Request( xmlurl, {
					onSuccess: function (response) {
						slideshow.xmldoc = response.responseXML;

						// register
						slideshowIndex.push( id );
						slideshowHash[ id ] = new CNN_SlideShow( slideshow );
						
						slideshowHash[ id ].init();
					},
					onFailure: function (response) {
						$(id).update( '<img src="http://i.cdn.turner.com/cnn/.element/img/3.0/global/misc/640x360_ns_ipad.gif" width="' + this.width + '" height="' + this.height + '" alt="" border="0">' );
					}
				});
			}
		},
		getIds = function () {
			return slideshowIndex;
		},
		getSlideShows = function () {
			var array = [];
			slideshowIndex.each( function (slideshowId) {
				array.push( slideshowHash[slideshowId] );
			});
			return array;
		},
		getSlideShow = function (id) {
			if ( slideshowIndex.indexOf( id ) === -1 ) {
				console.log( 'There is no slideshow with id "' + id + '"' );
			} else {
				return slideshowHash[id];
			}
		}
	;
	
	return ({
		register: register,
		getIds: getIds,
		getSlideShows: getSlideShows,
		getSlideShow: getSlideShow
	});
}());

/* ### /Alternate SlideShow (HTML version) ############################################### */

/*
 * Initializes an awesomebar on the page
 * id -- the ID of the awesomebar to show
 * state -- (expanded|collapsed) a string value as to what state the awesomebar should be in when displayed
 * An awesomebar MUST have an element with the classname of "cnn_short_headlines"
 */
cnn_setup_awesomebar = function (id, state) {
	var awesomebar = $(id),
		awsmbr;

	if ( null == awesomebar || ! awesomebar.hasClassName( 'cnn_awsmbr' ) ) {
		return; // could not find the awesomebar
	}
	
	if ( awesomebar.hasClassName( 'cnn_awsmbr_expanded' ) ) { // the awesomebar needs to start as collapsed
		awesomebar.removeClassName( 'cnn_awsmbr_expanded' );
	}
	
	cnn_truncateTextInElements('.cnn_short_headlines a', 35);

	/* Set up the toggle control actions */
	awesomebar.select('.cnn_controls', '.cnn_more').each(function (elmnt) {
		elmnt.observe('click', function (event) {
			event.stop();

			awsmbr = elmnt.up('.cnn_awsmbr');
			cnn_awsmbr_trigger_animation(awsmbr);
		});
	});

	Effect.Appear(awesomebar);

	if ('expanded' === state) {
		cnn_awsmbr_trigger_animation(awesomebar);
	} else {
		new Effect.Morph(awesomebar.select('.cnn_short_headlines')[0], { 'style' : 'left:0px;', 'transition' : Effect.Transitions.full });
		new Effect.Morph(awesomebar, { 'style' : 'height: 28px;' });
	}
};

/*
 * Causes the awesomebar to open or close depending on the state it is currently in.
 */
cnn_awsmbr_trigger_animation = function (abar) {
	var awsmbr_queue = { 'position' : 'end', 'scope' : abar.id },
		p_events;

	if (abar.hasClassName('cnn_animation_lock')) { /* animation already in progress */
		return;
	}

	abar.addClassName('cnn_animation_lock');
	if (abar.hasClassName('cnn_awsmbr_expanded')) {	/* close the awesomebar */
		abar.removeClassName('cnn_awsmbr_expanded');

		Effect.multiple(abar.select('.cnn_column').reverse(), Effect.Move, { 'duration' : 0.4, 'y' : 115, 'mode' : 'relative', 'queue' : awsmbr_queue });
		p_events = new Effect.Parallel([
			new Effect.Morph(abar.select('.cnn_short_headlines')[0], { 'sync' : true, 'style' : 'left:0px;', 'queue' : awsmbr_queue }),
			new Effect.Morph(abar, { 'sync' : true, 'style' : 'height: 28px;', 'queue' : awsmbr_queue })
		], { 'delay' : 0.8, 'afterFinish' : function () { abar.removeClassName('cnn_animation_lock'); } });
	} else {	/* open the awesomebar */
		p_events = new Effect.Parallel([
			new Effect.Morph(abar, { 'sync' : true, 'style' : 'height: 123px;', 'queue' : awsmbr_queue }),
			new Effect.Morph(abar.select('.cnn_short_headlines')[0], { 'sync' : true, 'style' : 'left:-770px;', 'queue' : awsmbr_queue })
		], {});
		Effect.multiple(abar.select('.cnn_column'), Effect.Move, { 'duration' : 0.4, 'delay' : 0.2, 'y' : -115, 'mode' : 'relative', 'queue' : awsmbr_queue, 'afterFinish' : function (e) { if (e.element.hasClassName('cnn_last_column')) { abar.removeClassName('cnn_animation_lock'); } } });
		abar.addClassName('cnn_awsmbr_expanded');
	}
};

/*
 * Limits the text length that an element node can hold
 * selector -- A CSS selector decribing the HTML nodes to find
 * length -- The max amount of characters allowed in the HTML nodes found by selector
 */
cnn_truncateTextInElements = function (selector, length) {
	var elmnts = $$(selector),
	elmnt;

	for (elmnt in elmnts) {
		if (elmnts.hasOwnProperty(elmnt)) {
			if (elmnts[elmnt].innerHTML.length > (length + 1)) {
				elmnts[elmnt].innerHTML = elmnts[elmnt].innerHTML.substring(0, length) + '&hellip;';
			}
		}
	}
};

/* Load the Awesomebar */
Event.observe(window, 'load', function () {
	var get_banner = new Ajax.Request('/.element/ssi/www/breaking_news/3.0/banner.html', {
		'method': 'get',
		'onSuccess': function(response) {
			var bar_status = ( response && response.responseText && response.responseText.indexOf( 'id="jsCode"' ) != -1 ) ? 'collapsed' : 'expanded';
			cnn_setup_awesomebar( 'cnn_awsmbr_1', bar_status );
		}
	});
});


/* definte default metadata object */
if (Object.isUndefined(cnn_metadata)) {
	var cnn_metadata = {
	
		'section' : [],
		'friendly_name' : '',
		'template_type' : '',
		'template_type_content' : '',
		'business' : {
			'cnn' : {
				'page' : {
				
					'broadcast_franchise' : ''
					
				},
				'video' : {}
			}
		},
		'user' : {
		
			'authenticated' : '',
			'segment' : {
				
				'age' : '',
				'zip' : '',
				'gender' : ''
				
			}
			
		}
	};
}

if(allCookies['CNN_memberID']) { cnn_metadata.user.authenticated = 1; }