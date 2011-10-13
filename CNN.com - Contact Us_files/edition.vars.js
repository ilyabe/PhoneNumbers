//for load in edition config object
var cnn_edtnswtchcnfg = {}
var t_selectededition = '';

function cnn_initeditionhtml(is_f) {

	cnn_edtnisforced = is_f;
	CSIManager.getInstance().call('/.element/ssi/misc/3.0/editionvars.html', '', 'cnn_hdr-promptcntnt', cnn_loadeditionhtml);
	
}

function cnn_loadeditionhtml(obj) {

	cnn_edtnswtchcnfg = obj;
	
	if(cnn_edtnisforced) {

		if(cnn_edtnisforced == 3) {
			
			if(t_selectededition == '') { t_selectededition = allCookies['SelectedEdition']; }
			
			var def_msg = "<span id=\"hdr-prompt-text\"><form>Please select your default edition:<b><input type=\"radio\" name=\"cnn_edselect\" value=\"\" onclick=\"cnn_stedtnckie('edition');\"";
			if(t_selectededition == "edition") { def_msg += " checked"; }
			def_msg += "> International</b><b><input type=\"radio\" name=\"cnn_edselect\" value=\"\" onclick=\"cnn_stedtnckie('www');\"";
			if(t_selectededition == "www") { def_msg += " checked"; }
			def_msg += "> U.S.</b><b><input type=\"radio\" name=\"cnn_edselect\" value=\"\" onclick=\"cnn_stedtnckie('mexico');\"";
			if(t_selectededition == "mexico") { def_msg += " checked"; }
			def_msg += "> Mexico</b></form></span><img id=\"cnn_hdr-arrow\" src=\"http://i.cdn.turner.com/cnn/.element/img/3.0/1px.gif\" width=\"1\" height=\"1\" class=\"hdr-arrow-us2 cnn_dynone\" />";


		}
		else { var def_msg = (cnn_edtnisforced == 1) ? cnn_edtnswtchcnfg[cnn_edtnswtchver].edtn_msgs.def_msg : cnn_edtnswtchcnfg[cnn_edtnswtchver].edtn_msgs.sm_msg; }

		t_html = def_msg + cnn_edtnswtchcnfg['edtn_clshtml'];

	}
	else {
		if(cnn_adcntryckie && cnn_hasCG) {
			t_html = cnn_edtnswtchcnfg[cnn_edtnswtchver].get_cntrymsg(cnn_adcntryckie) + cnn_edtnswtchcnfg['edtn_clshtml'];
		}
		else if(cnn_userbrwsrlng) {
			t_html = cnn_edtnswtchcnfg[cnn_edtnswtchver].edtn_msgs.brwsr_msg + cnn_edtnswtchcnfg['edtn_clshtml'];
		}
	}
	cnn_shweditionhtml();
	return t_html;

}

function cnn_shweditionhtml() {
	if(Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5))==6) {
		$('cnn_hdr-prompt').style.display = "block";
	}
	else {
		Effect.SlideDown('cnn_hdr-prompt', { duration:0.7, afterFinish: function() {
				$('cnn_hdr-arrow').style.display = "block";
			}
		});
	}
}

function cnn_clseditionhtml() {
	if(Prototype.Browser.IE && parseInt(navigator.userAgent.substring(navigator.userAgent.indexOf("MSIE")+5))==6) {
		$('cnn_hdr-prompt').style.display = "none";
	}
	else { Effect.SlideUp('cnn_hdr-prompt', { duration:0.5 } ); }
}

function cnn_delayeditionhtml(is_preloaded, time_length) {
	if(!time_length) { time_length = 720;}
	if((time_length == 168) && !cnn_hasCG) { cnn_stedtnckie('www'); }
	else { CNN_setCookie('delayeditionhtml', 'delayed', time_length, '/', '.cnn.com'); }
	if(!is_preloaded) { cnn_clseditionhtml(); }
}

/*Edition Selection custom link */
function omniSwitchEdition(editionValue) {
	var s=s_gi("cnn3global");
	s.trackingServer="metrics.cnn.com";
	if (editionValue=="edition"){editionValue="intl"}
	if (editionValue=="www"){editionValue="us"}
	editionValue=editionValue+'pref';	
	s.tl(this,'o',editionValue)
}

function cnn_stedtnckie(edtn_value, do_load) {
	CNN_setCookie('SelectedEdition', edtn_value, 854400, '/', '.cnn.com');
	omniSwitchEdition(edtn_value);
	t_selectededition = edtn_value;
	if(do_load) {
		if(edtn_value == 'www') { location.href = 'http://www.cnn.com/'; }
		else { location.href = 'http://edition.cnn.com/'; }
	}
	else { cnn_clseditionhtml(); }
	
}

//vars
var cnn_queryargs = cnn_geturlqargs(); 
var cnn_adcntryckie;
var cnn_edtnisforced = 0;
var cnn_hasCG = false;
var cnn_hasforeignb = false;
var cnn_edtnChoice = allCookies['SelectedEdition'];
var cnn_userbrwsrlng = (navigator.language) ? navigator.language : navigator.userLanguage;

//check ad cookie
if(allCookies['CG']) {
	cnn_adcntryckie = allCookies['CG'];
	cnn_adcntryckie = cnn_adcntryckie.split(':')[0];
	if((cnn_adcntryckie != 'A2') && (cnn_adcntryckie != 'US') && (cnn_adcntryckie != 'A1') && (cnn_adcntryckie != 'O1')) {
		cnn_hasCG = true;
	}
}

//show edition html?
if(cnn_queryargs.cnn_shwEDDH) {
		Event.observe( window, 'load', function() {	cnn_initeditionhtml(1); });
}
else if((allCookies['delayeditionhtml'] != 'delayed') && !cnn_edtnChoice) {

	if(cnn_edtnswtchver == 'www') {
	
		if(cnn_hasCG) {
			Event.observe( window, 'load', function() {	cnn_initeditionhtml(); });
		}
	
		if(!cnn_hasCG && cnn_userbrwsrlng && (cnn_userbrwsrlng.toLowerCase() != "en-us")) {
			cnn_hasforeignb = true;
			Event.observe( window, 'load', function() {	cnn_initeditionhtml(); });
		}
	
		if(!cnn_hasforeignb && !cnn_hasCG) {
			Event.observe( window, 'load', function() {	cnn_initeditionhtml(1); });
		}
		
	}
	else if(cnn_edtnswtchver == 'edition') {
		if(cnn_adcntryckie == 'MX') { Event.observe( window, 'load', function() {	cnn_initeditionhtml(2); }); }
		else { Event.observe( window, 'load', function() {	cnn_initeditionhtml(1); }); }
	}

	CNN_setCookie('SelectedEdition', cnn_edtnswtchver, 48, '/', '.cnn.com');

}
