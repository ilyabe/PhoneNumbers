function swapPafWidgetsCallback(inForm,inMode,hiddenFieldName,md5TempName) {
	if (inMode == 'addedit' && myAutoCompIndices) {
		var acndx = myAutoCompIndices['dnf_class_values_communication__primary_constituent___pick__0_'];
		if (myAutoComp[acndx]) {
			var name = myAutoComp[acndx].dataSource.last_query;
			if (name) {
				var pafname = hiddenFieldName.replace(/\[dnf_pick_and_form\]/, '');
				if (inForm[pafname + '[fname]']) {
					var nameparts = name.split(/%20/);
					if (inForm[pafname + '[fname]'].value == '') {
						inForm[pafname + '[fname]'].value = decodeURIComponent(nameparts[0]);
						if (nameparts.length > 2) {
							inForm[pafname + '[miname]'].value = decodeURIComponent(nameparts[1]);
							inForm[pafname + '[lname]'].value = decodeURIComponent(nameparts[2]);
						} else if (nameparts.length > 1) {
							inForm[pafname + '[lname]'].value = decodeURIComponent(nameparts[1]);
						}
					}
				}
			}
		}
	}
}

function toggleDisplay(id,dt) {
  document.getElementById(id).style.display = dt;
}

var cur_hl_arrow = null;

function hlArrow(img, hi){
	if (cur_hl_arrow) {
		cur_hl_arrow.src = cur_hl_arrow.src.replace(/o_/, '');
		cur_hl_arrow = null;
	}
	if (hi) {
		img.src = img.src.replace(/o_/, '');
	} else if(img.src.indexOf('/hp/o_') == -1) {
		cur_hl_arrow = img;
		img.src = img.src.replace(/\/hp\//, '/hp/o_');
	}
}

function moveSubform(img, field, step){
	var order_fld = document.forms[0][field];
	var subform = img.parentNode.parentNode.parentNode;
	var parent = subform.parentNode;
	var index = subform.id.substring(subform.id.indexOf('_leftbracket_') + 13, subform.id.lastIndexOf('_'));
	if (isNaN(parseInt(order_fld.value))) {
		order_fld.value = index;
	}
	var swap_index = parseInt(index) + step;
	if (swap_index >= 0) {
		var swap_id = subform.id.replace(/_leftbracket_(\d+)_/, '_leftbracket_' + swap_index + '_');
		var swap_subform = document.getElementById(swap_id);
		if (swap_subform) {
			subform.style.backgroundColor = '#ffccaa';
			setTimeout(function (){
				subform.style.backgroundColor = '#ffddbb';
				var swap_flds = swap_subform.getElementsByTagName('input');
				var swap_order_fld = false;
				for (var i = 0; i < swap_flds.length; i++) {
					if (swap_flds[i].name.indexOf('orderby') > 0) {
						swap_order_fld = swap_flds[i];
						break;
					}
				}
				if (swap_order_fld) {
					if (isNaN(parseInt(swap_order_fld.value))) {
						swap_order_fld.value = swap_index;
					}
					var tmp = swap_order_fld.value;
					swap_order_fld.value = order_fld.value;
					order_fld.value = tmp;
				}
				var swap_parent = swap_subform.parentNode;
				parent.removeChild(subform);
				swap_parent.removeChild(swap_subform);
				swap_subform.id = subform.id;
				subform.id = swap_id;
				parent.appendChild(swap_subform);
				swap_parent.appendChild(subform);
				setTimeout("unHighlight('" + subform.id + "', '#eeeeee')", 200);
			}, 200);
		}
	}
}

function unHighlight(id, color){
	document.getElementById(id).style.backgroundColor = color;
	if (cur_hl_arrow) {
		cur_hl_arrow.src = cur_hl_arrow.src.replace(/o_/, '');
		cur_hl_arrow = null;
	}
}

function hierCheck(elem,num_digits) {
  var checks = elem.form[elem.name];
  var chkd_val = elem.value;
  var chkd_len = chkd_val.length;
  var checks_size = checks.length;

  var new_id;

  do {
    chkd_len -= num_digits;
    new_id = chkd_val.substr(0,chkd_len);
    for (i=0; i<checks_size; i++) {
      if (new_id == checks[i].value && elem.checked==true) {
        checks[i].checked = true;
      }
    }
  } while (chkd_len > num_digits+1); //plus 1 for the 0 they start with.
}

function getRealLeft(el) {
    xPos = el.offsetLeft;
    tempEl = el.offsetParent;
    while (tempEl != null) {
        xPos += tempEl.offsetLeft;
        tempEl = tempEl.offsetParent;
    }
    return xPos;
}

function getRealTop(el) {
    yPos = el.offsetTop;
    tempEl = el.offsetParent;
    while (tempEl != null) {
        yPos += tempEl.offsetTop;
        tempEl = tempEl.offsetParent;
    }
    return yPos;
}

function getAbsolutePos(el) {
	var SL = 0, ST = 0;
	var is_div = /^div$/i.test(el.tagName);
	if (is_div && el.scrollLeft)
		SL = el.scrollLeft;
	if (is_div && el.scrollTop)
		ST = el.scrollTop;
	var r = { x: el.offsetLeft - SL, y: el.offsetTop - ST };
	if (el.offsetParent) {
		var tmp = this.getAbsolutePos(el.offsetParent);
		r.x += tmp.x;
		r.y += tmp.y;
	}
	return r;
}

function validatePassw(id1,id2) {
  if (document.getElementById(id1) && document.getElementById(id2)) {
    var pass1 = document.getElementById(id1).value;
    var pass2 = document.getElementById(id2).value;

    if (pass1 != '' && pass2 != '') {
      if (pass1 == pass2) {
	return true;
      }
      else {
		alert('The desired password and confirm password are not the same. Please re-enter the same desired password in both fields.');
	document.getElementById(id1).focus();
	return false;
      }
    }
  }
}

function getHistoricalDataHTML() {
  var rep = document.getElementById('_historical_data');
  return rep.innerHTML;
}

function addInputField (form, fieldType, fieldName, fieldValue) {
	var input = document.createElement("INPUT");
	input.setAttribute('type', fieldType);
	input.setAttribute('name', fieldName);
	input.setAttribute('value', fieldValue);
	form.appendChild(input);
}

function getPicklistGroupSelection(thisElement) {
  var selected = new Array();
  for (var i=0; i<thisElement.options.length; i++) {
    if (thisElement.options[i].selected) selected.push(thisElement[i].value);
  }
  return selected;
}

function setOnClickHref(id,href) {
	document.getElementById(id).onclick = function() { location.href = href }
}

function killOnClick(id) {
  document.getElementById(id).onclick = function() { void(0) }
}

function setOnClick(id,func) {
	document.getElementById(id).onclick = function() { eval(func) }
}

function Hilite(c, r) {
    if (document.getElementById(c).checked) {
      document.getElementById(r).style.backgroundColor = 'FFFFFF';
    } else {
      document.getElementById(r).style.backgroundColor = 'DAE2EB';
    }
}

function setHilites(inForm,inField) {
  if (inForm == null) {
    var i = 0;
    while (document.forms[i]) {
      if (document.forms[i][inField]) {
        inForm = document.forms[i]
        break;
      }
      ++i;
    }
  }
  if (inForm) {
    for( var i=0; i<inForm.elements.length; i++) {
      if (inForm.elements[i].name==inField) {
        if (inForm.elements[i].checked) {
          document.getElementById('row_'+inForm.elements[i].value).style.backgroundColor = 'DAE2EB';
        }
      }
    }
  }
}

var page_check = 0;

function updatePageCountonSuccess(o){
	frameCall("?util=set_check&id=DONONE&sesskey="+escape(o.argument["sesskey"]));
}

function setChecked(inForm,inField,val,class_pkey,doHilite,sesskey) {
  var checkVal = (val >= 1 ? 1 : 0);
  var page_ids = new Array();
  for( var i=0; i<inForm.elements.length; i++) {
    if (inForm.elements[i].name==inField) {
	  page_ids[page_ids.length] = inForm.elements[i].value;
      inForm.elements[i].checked=checkVal;
      if (doHilite) {
          document.getElementById('row_'+inForm.elements[i].value).style.backgroundColor = (checkVal ? 'DAE2EB' : 'FFFFFF');
      }
    }
  }
  if(val == false || page_check == 1){
	  frameCall("?util=set_check&sesskey="+escape(sesskey)+"&id=ALL&state="+checkVal+"&class_pkey="+class_pkey);
  }else if(val == true && page_check == 0){
	url = "?util=set_check";
	post = "sesskey="+escape(sesskey)+"&id=PAGE&state="+checkVal+"&class_pkey="+class_pkey+"&idlist="+page_ids;
	args = new Array();
	args["sesskey"] = sesskey;
	request = YAHOO.util.Connect.asyncRequest('POST', url,{success:updatePageCountonSuccess, argument:args}, post);
	page_check = 1;
  }
  if(val == false && page_check == 1){
	page_check = 0;
  }
}

function setCheck(value,state,sesskey) {
  if(state == false){
	page_check = 0;
  }
  var inForm = window.document._list_form;
  var last_checked = false;
  var first_unchecked = '';
  for( var i=0; i<inForm.elements.length; i++) {
    if (inForm.elements[i].id.indexOf('checkbox_') == 0) {
		if (inForm.elements[i].checked) {
			last_checked = inForm.elements[i].id;
			first_unchecked = '';
		} else if (last_checked && !first_unchecked) {
			first_unchecked = inForm.elements[i].id;
		}
	}
  }

  if (first_unchecked != '') {
	first_unchecked = '&unchecked=' + first_unchecked;
  }
  frameCall("?util=set_check&sesskey=" + escape(sesskey) + "&id=" + escape(value) + "&state=" + (state ? "1" : "0") + first_unchecked);
}

function showHideListChildren(img,action,rowkey,header) {
  var listtable = document.getElementById(table_id);
  var datadisplay = '';
  var img_src = '/images/selectall.gif';
  if(action=='hide'){
    img.onclick = new Function("showHideListChildren(this,'show','"+rowkey+"','"+header+"')");
    datadisplay = 'none';
  }else{
    img.onclick = new Function("showHideListChildren(this,'hide','"+rowkey+"','"+header+"')");
    img_src = '/images/clearall.gif';
  }
  TRs = listtable.getElementsByTagName('TR');
  for (var i=0;i<TRs.length;i++) {
    if (TRs[i].className.indexOf(header) != -1) {
      TRs[i].style.display = datadisplay;
    }
  }
  img.src = img_src;
}

function in_array(needle,haystack) {
	var found = false;
	if (typeof(needle) == 'string') {
		for (i=0; i<haystack.length; i++) {
			if (typeof(haystack[i]) == 'object') {
				found = in_array(needle,haystack[i]);
			} else if (haystack[i] == needle) {
				found = true;
			}
			if (found) {
				break;
			}
		}
	}
	return found;
}

var frameidx=1;
function nextFrame() {
  if(frameidx == 1){
	frameidx = 2;
  }else{
	frameidx = 1;
  }
  return '__hiddenframe'+frameidx;
}

function frameCall(url) {
	var frame_id = nextFrame();
	var frame = document.getElementById(frame_id);
	if (!frame) {
		frame = top.document.getElementById(frame_id);
	}
	if (frame) {
		frame.src = url;
	}
}

function showhideHelpDIV(action){
  var helpdiv = document.getElementById('helpdiv');
  if (action=='hide'){
    helpdiv.style.display = 'none';
  }else {
    helpdiv.style.display = 'block';
    if (YAHOO.util.DDProxy) {
	    var dd = new YAHOO.util.DDProxy(helpdiv);
    }
  }
}

var preload_arrow = false;
function fillForm(id, other_id) {
	if (!preload_arrow) {
		preload_arrow = true;
		var arrowd = new Image();
		arrowd.src= '/images/arrowd.gif';
		var arrows = new Image();
		arrows.src = '/images/arrows.gif';
	}

	var divsection = document.getElementById(id);
	var other_div = false;
	if (divsection) {
		var twistie = document.getElementById(id+'_twistie');
		if (divsection.style.display == 'none') {
			divsection.style.display = 'block';
			if (twistie) {
				twistie.src = '/images/arrowd.gif';
			}
		} else {
			divsection.style.display = 'none';
			if (twistie) {
				twistie.src = '/images/arrows.gif';
			}
		}
		if (other_id) {
			var other_div = document.getElementById(other_id);
			if (other_div) {
				other_div.style.display = divsection.style.display;
			}
		}
	}
}

function showNoticePlaceholder(elem, text, cssclass, width) {
	var div = document.getElementById('notice_placeholder');

	if (text.length > 0) {
	  if (cssclass && !YAHOO.util.Dom.hasClass(div, cssclass)) {
	    YAHOO.util.Dom.addClass(div, cssclass);
	  }
		div.innerHTML = text;
		div.style.left = YAHOO.util.Dom.getX(elem) + elem.offsetWidth + 10 + 'px';
		div.style.top = YAHOO.util.Dom.getY(elem) + 'px';
		if (width) {
		  div.style.width = width;
		}
		div.style.display = 'block';
	} else {
		div.style.display = 'none';
	  if (cssclass && YAHOO.util.Dom.hasClass(div, cssclass)) {
	    YAHOO.util.Dom.removeClass(div, cssclass);
	  }
	}
}

function showPopdivPlaceholder(header, text) {
	yuipopdiv.setHeader(header);
	yuipopdiv.setBody(text);
	yuipopdiv.render();
	yuipopdiv.show();
	yuipopdiv.cfg.setProperty('width', yuipopdiv.body.firstChild.offsetWidth + 30 + 'px');
	var newwidth = yuipopdiv.body.firstChild.offsetWidth + 17;
	var newheight = yuipopdiv.body.firstChild.offsetHeight + 10;
	if (newheight > 600) {
		newheight = 600;
	}

	var browser=navigator.appName;
	if(browser.indexOf("Internet Explorer")!=-1) {
		yuipopdiv.body.style.width=800 + 'px';
		yuipopdiv.body.style.height =  newheight + 'px';
		yuipopdiv.cfg.setProperty('height',newheight+'px');
		yuipopdiv.cfg.setProperty('width',799+'px');
	} else {
		yuipopdiv.body.style.width = newwidth + 'px';
		yuipopdiv.cfg.setProperty('height', newheight + 40 + 'px');
		yuipopdiv.cfg.setProperty('width', newwidth + 20 + 'px');
	}
}

function showFilePreview(file, file_name) {
	if (file) {
		showPopdivPlaceholder(file_name, "<iframe src='/utils/view.php?inline=1&id=" + file + "' width='100%' height='100%' style='border:1px solid #ccc'></iframe>");
		yuipopdiv.cfg.setProperty('fixedcenter', false);
		yuipopdiv.cfg.setProperty('xy', getCenterXY(yuipopdiv.element, 200));
		YAHOO.util.Event.on(window, "scroll", function(){
			yuipopdiv.cfg.setProperty('y', getCenterXY(yuipopdiv.element)[1]);
		});
	}
}

function getCenterXY(elem, xoffset, yoffset) {

		var elementWidth = elem.offsetWidth,
				elementHeight = elem.offsetHeight,
				viewPortWidth = YAHOO.util.Dom.getViewportWidth(),
				viewPortHeight = YAHOO.util.Dom.getViewportHeight(),
				x,
				y;

		if (elementWidth < viewPortWidth) {
				x = (viewPortWidth / 2) - (elementWidth / 2) + YAHOO.util.Dom.getDocumentScrollLeft();
		} else {
				x = YAHOO.util.Dom.getDocumentScrollLeft();
		}

		if (elementHeight < viewPortHeight) {
				y = (viewPortHeight / 2) - (elementHeight / 2) + YAHOO.util.Dom.getDocumentScrollTop();
		} else {
				y = YAHOO.util.Dom.getDocumentScrollTop();
		}
		if (!xoffset) {
			xoffset = 0;
		}
		if (!yoffset) {
			yoffset = 0;
		}
		return [parseInt(x, 10) + xoffset, parseInt(y, 10) + yoffset];
}


function updateFilterTooltip(type, args) {
	var context = args[0];
	if (this.cfg.getProperty("text").indexOf('Loading preview...') > -1) {
		callYUIConnect('prevfiltshort', 'id=' + context.getAttribute('name'), true);
	}
}

var tt_cache = {};
var last_preview_id = '';
function updateTooltipText(o) {
	tt_cache[o.argument.id] = o.responseText;
	if (o.argument.id == last_preview_id) {
		o.argument.tooltip.cfg.setProperty('text', o.responseText);
	}
}

function updateCommTooltip(type, args) {
	var context = args[0];
	last_preview_id = context.id;
	this.cfg.setProperty("text", "Loading preview...");
	if (typeof tt_cache[context.id] == 'undefined') {
		YAHOO.util.Connect.asyncRequest('GET','?util=prevcommshort&id=' + context.getAttribute('name') + '&ndx=' + context.id.replace(/comm_link_/, ''), {
			success: updateTooltipText,
			argument: { tooltip: this, id: context.id }
		});
	} else {
		this.cfg.setProperty("text", tt_cache[context.id]);
	}
	this.align();
}

function updateConstTooltip(type, args) {
	var context = args[0];
	last_preview_id = context.id;
	this.cfg.setProperty("text","Loading preview...");
	if (typeof tt_cache[context.id] == 'undefined') {
		YAHOO.util.Connect.asyncRequest('GET','?util=prevconstshort&id=' + context.getAttribute('name') + '&ndx=' + context.id.replace(/const_link_/, ''), {
			success: updateTooltipText,
			argument: { tooltip: this, id: context.id }
		});
	} else {
		this.cfg.setProperty("text", tt_cache[context.id]);
	}
	this.align();
}

function updateLibItemTooltip(type, args) {
	var context = args[0];
	last_preview_id = context.id;
	this.cfg.setProperty("text", "Loading preview...");
	if (typeof tt_cache[context.id] == 'undefined') {
		YAHOO.util.Connect.asyncRequest('GET', '?util=prevlibitemshort&id=' + context.getAttribute('name') + '&ndx=' + context.id.replace(/comm_link_/, ''), {
			success: updateTooltipText,
			argument: { tooltip: this, id: context.id }
		});
	} else {
		this.cfg.setProperty("text", tt_cache[context.id]);
	}
	this.align();
}

function updateNoteTooltip(type, args) {
	var context = args[0];
	if (this.cfg.getProperty("text").indexOf('Loading preview...') > -1) {
		callYUIConnect('prevnoteshort', 'id=' + context.getAttribute('name') + '&ndx=' + context.id.replace(/note_link_/, ''), true);
	}
}

function handleYUIConnectionSuccess(o) {
	if (o.argument.evalScripts) {
		var response = o.responseText;
		o.responseText = Ajax.stripScripts(o.responseText);
	}
	if (o.argument.js) {
		eval(o.responseText);
	} else if (o.argument.elem) {
		showNoticePlaceholder(o.argument.elem, o.responseText, 'notice', '200px');
	} else if (o.argument.updater) {
		if (typeof o.argument.updater == 'string') {
			o.argument.updater = document.getElementById(o.argument.updater);
		}
		if (o.argument.updater.tagName == 'TABLE') {
			var p = o.argument.updater.parentNode;
			p.removeChild(o.argument.updater);
			p.innerHTML = o.responseText;
		} else {
			o.argument.updater.innerHTML = o.responseText;
		}
	} else {
		showPopdivPlaceholder("&nbsp;", o.responseText);
	}
	if (o.argument.evalScripts) {
		Ajax.evalScripts(response);
	}
	if (o.argument.onComplete) {
		o.argument.onComplete(o);
	}
}

function handleYUIConnectionFailure(o){
	return;
}

function callYUIConnect(util, pars, js, elem, updater, onComplete, post){
	if (js && js == 'evalScripts') {
		js = false;
		evalScripts = true;
	} else {
		evalScripts = false;
	}
	var callback = {
		success: handleYUIConnectionSuccess,
		failure: handleYUIConnectionFailure,
		argument: { name:util, js:js, elem:elem, updater:updater, onComplete:onComplete, evalScripts:evalScripts }
	};
    if (post) {
	    if (typeof post == 'string') {
			var form = document.getElementById(post);
			form.elements['dnf_opt_finalize'].value = '1';
			if (form) {
				YAHOO.util.Connect.setForm(form);
			}
		}
        var url = '/index.php?util=' + util;
    	var request = YAHOO.util.Connect.asyncRequest('POST', url, callback, pars);
    } else {
        var url = '/index.php?util=' + util + '&' + pars;
    	var request = YAHOO.util.Connect.asyncRequest('GET', url, callback);
    }
}

function pop(url){
	var callback = {
		success: handleYUIConnectionSuccess,
		failure: handleYUIConnectionFailure,
		argument: { name:'pop' }
	};
	var request = YAHOO.util.Connect.asyncRequest('GET', url, callback);
}

function checkAndSubmit(form) {
	var submission = checkFormRequiredFields(form);
	if (submission) {
		var submits = YAHOO.util.Dom.getElementsByClassName('input-submit');
		submits[0].disabled = 'disabled';
	}
	return submission;
}

function submitAjaxForm(form_id, class_name, class_id, updater, onComplete){
	callYUIConnect('submitform', 'class_name=' + class_name + '&class_id=' + class_id, false, null, updater, null, form_id);
}

function updateGroupMember(id) {
	submitAjaxForm('ajax_form', 'constituent', id, 'member_' + id);
	yuipopdiv.hide();
	showNoticePlaceholder(null, '', 'notice');
}

function pageGroupMembers(cls, id, divid, start) {
	callYUIConnect('rendergroup', 'i=' + id + '&st=' + start, false, null, divid);
}

function updateAddresFromZip(zip_field){
	if (zip_field.value.length > 4) {
		var type_field = getSiblingField('zip', zip_field.id, 'address_type');
		if (!type_field || ((type_field.value == 'domestic' || type_field.value == 'military') && type_field.checked)) {
			callYUIConnect('zip', 'zip=' + zip_field.value + '&zip_id=' + zip_field.id, true);
		}
	}
}

function updateZipFromAddress(city_id, city, state){
	if (city.length > 1 && state.length > 0) {
		var type_field = getSiblingField('city', city_id, 'address_type');
		if (!type_field || (type_field.value == 'domestic' && type_field.checked)) {
			var zip_field = getSiblingField('city', city_id, 'zip');
			if (zip_field.value.length < 5) {
				callYUIConnect('zip', 'city=' + city + '&city_id=' + city_id + '&state=' + state, true);
			}
		}
	}
}

function updateZipFromCity(city_field){
	if (city_field.value.length > 1) {
		var sibling_field = getSiblingField('city', city_field.id, 'state');
		updateZipFromAddress(city_field.id, city_field.value, sibling_field.value);
	}
}

function updateZipFromState(state_field){
	if (state_field.value.length > 0) {
		var sibling_field = getSiblingField('state', state_field.id, 'city');
		updateZipFromAddress(sibling_field.id, sibling_field.value, state_field.value);
	}
}

function updateZipFromDialog(elem) {
	updateSiblingField('city', elem.getAttribute('city_id'), 'zip', elem.innerHTML);
	yuipopdialog.hide();
	return false;
}

function filterForeignStates(country_field) {
	var state_field = getSiblingField('country', country_field.id, 'foreign_state');
	// remove all but the default pick
	for (var i=state_field.options.length - 1; i>0; i--) {
		state_field.remove(i);
	}
	if (country_field.value) {
		// foreign_states array from prepareForeignStates in senate_lib
		var states = foreign_states[country_field.value];
		i = 1;
		for (var st in states) {
			state_field.options[i] = new Option(states[st], st);
			++i;
		}
	}
}

function getSiblingField(field_name, field_id, sibling_name) {
	var re = new RegExp('_' + field_name + '_');
	var sibling_field = document.getElementById(field_id.replace(re, '_' + sibling_name + '_'));
    if (!sibling_field) {
        var original_field = document.getElementById(field_id);
        re = new RegExp('\\[' + field_name + '\\]');
        sibling_field = original_field.form[original_field.name.replace(re, '[' + sibling_name + ']')];
        if (sibling_field && sibling_field.length) {
            var cnt = sibling_field.length;
            for (var i=0; i<cnt; i++) {
                if (sibling_field[i].checked) {
                    return sibling_field[i];
                }
            }
        }
    }
    return sibling_field;
}

function updatePrimaryPicks(elem, class_name, primary_field){
	var primary_field = elem.form.elements[elem.form.so_form_prefix.value + 'class_values[' + class_name + '][' + primary_field + ']'];
	for (var i=0; i<primary_field.options.length; i++) {
		if (primary_field.options[i].value == elem.value) {
			if (!elem.checked) {
				primary_field.options[i] = null;
			}
			return;
		}
	}
	if (elem.checked) {
		primary_field.options[primary_field.options.length] = new Option(elem.alt, elem.value);
	}
}

function updateSiblingField(field_name, field_id, sibling_name, sibling_value) {
	var sibling_field = getSiblingField(field_name, field_id, sibling_name);
	if (sibling_field && sibling_field.value != sibling_value) {
		sibling_field.value = sibling_value;
	}
}

function applyFormSectionAction(elem){
	if (elem.options) {
		var act = elem.options[elem.selectedIndex].value;
		var label = elem.options[elem.selectedIndex].text;
	} else {
		var act = elem.name;
		var label = (elem.title ? elem.title : elem.value);
	}
	confirm_label = 'Are you sure you want to ' + label + '?' + (act == 'newslettersend' ? '  Please make sure the group has been updated.' : '');
    if (act == 'reply' || act == 'contact' || act == 'pdf_preview' || act == 'project' || confirm(confirm_label)) {
		if (!elem.options) {
			if (elem.form_name) {
				elem.form = document.forms[elem.form_name];
			}
			elem.form.act.value = act;
		}
    	var url = section_action[act];
    	if (url) {
            if (elem.subkey) {
                url = url.replace(/\{submenu_key\}/, elem.subkey);
            }
    		elem.form.action = url;
    	}
    	if (elem.options || elem.form_name) {
    		elem.form.submit();
    	}
    } else {
		return false;
	}
}

function applyBatchSectionAction(act, label, url, long_label){
  confirm_label = 'Are you sure you want to ' + (long_label ? long_label : 'do a batch ' + label + '?');
if (act != 'group' && confirm(confirm_label)) {
    var form = document.forms['batch_tool_form'];
  	if (form) {
  	  form.act.value = act;
  		form.action = url;
      form.submit();
  	}
  }else if(act == 'group'){
    var form = document.forms['batch_tool_form'];
  	if (form) {
		form.act.value = act;
		form.action = url;
		yuipopdialog.setHeader("Enter Merge Group Name");
		yuipopdialog.setBody("<form method='POST'>Please enter name for merged groups:<br><textarea name='groupname' rows='5' cols='40'></textarea><br><input type='button' value='Apply' onclick='document.forms[\"batch_tool_form\"].prompt.value = this.form.groupname.value;document.forms[\"batch_tool_form\"].submit()'><input type='button' value='Cancel' onclick='yuipopdialog.hide()'></form>");
		yuipopdialog.render();
		yuipopdialog.show();
	}
  }
}

function applyListSectionAction(act, label, url, id, conf){
  confirm_label = 'Are you sure you want to ' + label + '?' + (act == 'newslettersend' ? '  Please make sure the group has been updated.' : '');
  if (act == 'reply' || act == 'contact' || confirm(confirm_label)) {
    var form = document.forms['batch_tool_form'];
  	if (form) {
  	  form.act.value = act;
  	  form.arg.value = id;
  	  if (url) {
  		  form.action = url;
  		}
      form.submit();
  	}
  }
  return false;
}

function handleTinyMCEonKeyDown(ed, e){
	if (e.keyCode && !ed.rulez) {
		if (e.keyCode == 9) {
			var d = ed.dom, el;
			if (el = d.getParent(ed.selection.getNode(), d.isBlock)) {
				if (e.shiftKey) {
					d.setStyle(el, 'textIndent', '');
				} else {
					d.setStyle(el, 'textIndent', ed.settings.indentation);
				}
			}
			return tinymce.dom.Event.cancel(e);
		}
	}
}

function handleTinyMCEonClick(ed, e){
	if (e.target.tagName == 'IMG') {
		if (e.target.id && e.target.src.indexOf('util=textsecimg') > -1) {
            showPopdivPlaceholder("Manage Library Item", "<iframe name='textsecedit_frm' id='textsecedit' src='/?util=textsecedit&id=" + e.target.id + "'style='width:600px; height:400px; border:none; margin:0;'>Frames required</iframe>");
		}
	} else if (e.target.tagName == 'SPAN') {
		if (e.target.id.indexOf('edit_') == 0) {
			var id = e.target.id.substr(5, e.target.id.length);
            showPopdivPlaceholder("Manage Library Item", "<iframe name='textsecedit_frm' id='textsecedit' src='/?util=textsecedit&id=" + id + "'style='width:600px; height:400px; border:none; margin:0;'>Frames required</iframe>");
		} else if (e.target.id.indexOf('adhoc_') == 0) {
			var html = ed.current_noneditable.innerHTML.replace(/<div style="[^"]+"[^>]+><span id="edit_[^"]+">\[edit\]<\/span><span id="adhoc_[^"]+">\[ad-hoc\]<\/span><\/div>/, '');
			ed.dom.remove(ed.current_noneditable);
			tinyMCE.execCommand('mceReplaceContent',false,html);
		} else if (!ed.rulez) {
			updateMergeSpan(e.target, ed);
		}
	}
}

function updateCurrentMergeSpan(value){
	if (value && tinyMCE.activeEditor.curmrg) {
		tinyMCE.activeEditor.curmrg.innerHTML = value;
		yuipopdialog.hide();
	}
}

function updateMergeSpan(span, ed) {
	if (span.id) {
		ed.curmrg = span;
		yuipopdialog.setHeader("Enter Fill-in Value");
		yuipopdialog.setBody("<form>Please enter value for '" + span.id + "'<br><textarea name='fillin' rows='5' cols='40'></textarea><br><input type='button' value='Apply' onclick='updateCurrentMergeSpan(this.form.fillin.value)'></form>");
		yuipopdialog.render();
		yuipopdialog.show();
	}
}

function updateNextMergeSpan(ed){
	if (ed.curmrg) {
		var next = ed.curmrg.nextSibling;
		while(next.tagName != 'SPAN' && next.nextSibling){
			next = next.nextSibling;
		}
		if (next.tagName == 'SPAN') {
			updateMergeSpan(next, ed);
		}
	}
}

function insertLibraryItem(id) {
	callYUIConnect('textsecfields', 'id=' + id, true);
	currentEditorInsertImg(src, id);
}

var current_dupe_checker = null;
var current_dupe_checker_name = '';
function checkForDuplicates(elem, field_name) {
	var fields = ['fname', 'lname', 'email', 'org_name', 'url', 'contact_type'];
	var args = '';
	var vals = [];
	for (var i = 0; i < fields.length; i++){
		var fld = fields[i];
		if (fld == field_name) {
			vals[fld] = elem.value;
		} else {
		    var fld_input = getSiblingField(field_name, elem.id, fld);
		    if (fld_input) {
			    vals[fld] = fld_input.value;
			}
		}
		if (vals[fld]) {
			args += fld + '=' + vals[fld] + '&';
		}
	}
	if(elem.id.indexOf('dnf_class_values_constituent_') != 0) {
		args += 'subform=1&';
	}
	args += 'cid=' + getSiblingField(field_name, elem.id, 'constituent_id').value;
	if ((vals['lname'] && vals['fname']) || vals['email']) {
		current_dupe_checker = elem;
		current_dupe_checker_name = field_name;
		callYUIConnect('dupes', args, false, elem, false, highlightSelectedDupes);
	} else {
		current_dupe_checker = null;
	  showNoticePlaceholder(elem, '', 'notice');
	}
}

function checkUsername(elem){
	if(elem.value){
		args='username='+elem.value+'&user_id='+getSiblingField('user_id', 'dnf_class_values_user__user_id_', 'user_id').value;
		callYUIConnect('usernamedupes', args, false, elem, false, highlightSelectedDupes);
	}
	else{
		showNoticePlaceholder(elem, '', 'notice');
	}
}


function highlightSelectedDupes(o) {
    if (typeof contact_group_field_id == 'undefined') {
        return;
    }
    var div = document.getElementById('notice_placeholder');
    var dupes = div.getElementsByTagName('p');
    for(p in dupes) {
        if (dupes[p].id && dupes[p].id.indexOf('dupep_') == 0) {
            var id = dupes[p].id.substring('dupep_'.length);
            var check = document.getElementById(contact_group_field_id  + id + '_check');
            if (check && check.checked) {
                if (!YAHOO.util.Dom.hasClass(dupes[p], 'dupesel')) {
                    YAHOO.util.Dom.addClass(dupes[p], 'dupesel');
                }
            } else if (YAHOO.util.Dom.hasClass(dupes[p], 'dupesel')) {
                YAHOO.util.Dom.removeClass(dupes[p], 'dupesel');
            }
        }
    }
}

function dupeClicked(elem, id) {

	if (window.event) {
		YAHOO.util.Event.preventDefault(window.event);
	}
	var dupediv = document.getElementById('dupediv_' + id);
	if (dupediv.innerHTML.length > 10) {
		if (dupediv.style.display == 'none') {
			dupediv.style.display = 'block';
		} else {
			dupediv.style.display = 'none';
		}
	} else {
		var pars = 'id=' + id + '&sel=';
		//dnf_class_values_contact_group__members__dnf_multiplerelation_picks___
		if (typeof contact_group_field_id != 'undefined') {
			var check = document.getElementById(contact_group_field_id  + id + '_check');
			pars += (check && check.checked ? '1' : '0');
		} else {
			pars += '2';
		}
		if (!current_dupe_checker) {// || current_dupe_checker.id.indexOf('contact_group') != -1
			callYUIConnect('dupedetail', pars, false, null, dupediv);
		} else if (YAHOO.util.Dom.hasClass(current_dupe_checker.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode, 'relationwidget_addedit')) {
			md5id = current_dupe_checker.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id;
			md5id = md5id.replace('_form','');
			inForm = document.getElementById(md5id+'_addnew_button');
			n1parent = inForm.getAttribute('n1parent');
			n1field = inForm.getAttribute('n1field');
			hfName = 'dnf_class_values['+n1parent+']['+n1field+'][dnf_pick_and_form][0]';
			pfName = 'dnf_class_values['+n1parent+']['+n1field+'][_pick][0]';
			pfID = 'dnf_class_values_'+n1parent+'__'+n1field+'___pick__0_';
			pfField = document.getElementById(pfID);
			pfField.value = id;
			swapPafWidgets(inForm, 'addedit', hfName, md5id, 'constituent_id');
			showNoticePlaceholder(current_dupe_checker, '', 'notice');
			pnameField = document.getElementById('autocomplete_input_'+pfID);
			pnameField.value = elem.innerHTML;
		} else {
			showNoticePlaceholder(current_dupe_checker, '', 'notice');
			var id_field = getSiblingField(current_dupe_checker_name, current_dupe_checker.id, 'constituent_id');
			id_field.value = id;
			pars += '&replace=1';
			callYUIConnect('dupedetail', pars, false, null, current_dupe_checker.parentNode.parentNode.parentNode.parentNode.parentNode);
		}
  }
  return false;
}

function replaceConstSubform(elem, id) {
	var form_div = elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
	if(form_div.id == 'constituent_ac_form' || form_div.id == 'agency_contact_ac_form') {
		location.href = location.href.replace(/tabid=[^&]*/, 'tabid=' + id + '&ac=1&_do_edit=1');
	} else {
		var pars = 'id=' + id + '&sel=2&replace=1';
		var id_field = getSiblingField('const_select', elem.id, 'constituent_id');
		id_field.value = id;
		callYUIConnect('dupedetail', pars, false, null, form_div.parentNode); //, function(){alert('done')}
	}
}

// set as a list table event listener in list_basic.tmpl 
function checkEditable(e) {
	var div = (e.srcElement ? e.srcElement : e.target);
	if (div && div.tagName == 'B') {
		div = div.parentNode;
	}
	if (div && div.tagName == 'I') {
		div = div.parentNode;
	}
	if (div && (div.tagName == 'DIV') && (div.className == 'status_cell_editable') && (div.innerHTML.indexOf('autocomplete') == -1)) {
		var row = div.parentNode.parentNode;
		if (row && row.tagName == 'TR') {
			var comm_id = row.id.substr(4, 32);
			callYUIConnect('editcell', 'cid=' + comm_id, 'evalScripts', null, div);
		}
	}
}

function acSubmit(button, field_id) {
	var hidden = document.getElementById(field_id);
	if (hidden.value) {
		var div = button.parentNode.parentNode.parentNode.parentNode;
		var comm_id = field_id.substr(field_id.length - 32, 32);
		callYUIConnect('editcell', 'cid=' + comm_id + '&fld=topic&val=' + hidden.value, false, null, div);
	} else {
		alert('Please select a topic.');
	}
}

function dupeSelected(id, name) {
	showNoticePlaceholder(null, '', 'notice');

	var dupediv = document.getElementById('dupediv_' + id);
	dupediv.style.display = 'none';

	scrollable_add(document.forms[0], contact_group_field_name, id, name, 'highlightSelectedDupes(false)');

	var dupep = document.getElementById('dupep_' + id);
	if (!YAHOO.util.Dom.hasClass(dupep, 'dupesel')) {
		YAHOO.util.Dom.addClass(dupep, 'dupesel');
	}
	document.getElementById('dupes_' + id).disabled = true;

	if (contact_group_field_id.indexOf('project_group') > -1) {
		var check = document.getElementById(contact_group_field_id  + id + '_check');
		updatePrimaryPicks(check, 'project', 'primary_constituent');
	}

	var elems = document.forms[0].elements;
	var cnt = elems.length;
	for (var i=0; i<cnt; i++) {
		if (elems[i].name.indexOf('[new_members]') > -1) {
			if (elems[i].type == 'text') {
				elems[i].value = '';
			}
		}
	}
}

function alertAllProperties(o){
	var p = '';
	for (var i in o) {
		p += i + ':' + o[i] + ', ';
	}
	alert(p);
}

function handleTinyMCEonKeyUp(ed, e){
	if (!ed.current_noneditable && e.ctrlKey && e.keyCode == 190) {
		saveTinyMCEBookmark(true);
		var ndx = myAutoCompIndices['searcher'];
		myAutoComp[ndx]._elTextbox.focus();
		myAutoComp[ndx]._elTextbox.select();
	}
}

var fields_to_keep = [];
var values_to_keep = [];

function showKeepCheckboxes(button) {
    if (button.getAttribute('shown')) {
        button.setAttribute('shown', false);
        button.value = 'Show Copy Checkboxes';
        YAHOO.util.Dom.getElementsByClassName('keep', 'td', button.form, function(el){el.style.display = 'none';});
    } else {
        button.setAttribute('shown', true);
        button.value = 'Hide Copy Checkboxes';
        YAHOO.util.Dom.getElementsByClassName('keep', 'td', button.form, function(el){el.style.display = 'block'});
    }
}

function keepCheckClicked(check, class_name, field_name) {
	if (!fields_to_keep[class_name]) {
		fields_to_keep[class_name] = [];
		values_to_keep[class_name] = [];
	}
	fields_to_keep[class_name][field_name] = (check.checked ? check.name.replace(/^keep_/, '') : false);
}

function populateKeptFields(form, name, n1counter){
	var prefix = name.replace(/^_hidden_subform_/, '') + '[' + n1counter + ']';
	var class_name = '';
	for (var i = 0; i < form.elements.length; i++) {
		var fld = form.elements[i];
		var parts = fld.name.split(/\]\[/);
		var field_name = parts[parts.length - 1];
		field_name = field_name.substr(0, field_name.length - 1);
		if (field_name == 'dnf_class_name') {
			class_name = fld.value;
		} else if (fields_to_keep[class_name] && fields_to_keep[class_name][field_name]) {
			if (fld.name.indexOf(prefix) == 0) {
				if (fld.type == 'radio' || fld.type == 'checkbox') {
					fld.checked = (values_to_keep[class_name][field_name] == fld.value);
				} else {
					fld.value = values_to_keep[class_name][field_name];
				}
			} else {
				if (fld.type == 'radio' || fld.type == 'checkbox') {
					var fldid = fld.parentNode.id.replace(/_widget$/, '');
					if (fields_to_keep[class_name][field_name] == fldid && fld.checked) {
						values_to_keep[class_name][field_name] = fld.value;
					}
				} else if (fields_to_keep[class_name][field_name] == fld.id) {
					values_to_keep[class_name][field_name] = fld.value;
				}
			}
		}
	}
}

var previewin = null;

function previewFile(id, classname) {
	previewin = window.open('/utils/view.php?id=' + id + '&inline=1&raw=0', 'previewin', 'width=550,height=580,scrollbars=yes');
	previewin.focus();
}

function previewRecord(id, classname, title) {
	if(classname == 'file') {
		var args = 'index.php?util=preview_document&id=' + id + '&class=' + classname;
	} else {
		var args = 'index.php?util=prevrecord&id=' + id + '&class=' + classname;
	}

	var yui_panel = new YAHOO.widget.Panel('batcheditpanel',
		{
			width: '550px',
			height: '580px',
			close:true,
			visible:true,
			draggable:true,
			fixedcenter:true,
			constraintoviewport:true
		}
	);

	var handleSuccess = function(o) {
		if(o.responseText) {
			yui_panel.render();
			yui_panel.setBody(o.responseText);
			if(title) {
				yui_panel.setHeader(title);
			}
			yui_panel.show();
		}
	};
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};
	YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

function previewCommunication(button) {
	var id = button.form['dnf_class_values[communication][comm_id]'].value;
	var cid = '', sig = '', prid='';
	var flds = { 'oid':'other_constituent', 'csw':'casework', 'uhs':'use_hh_salutation', 'tpl':'template', 'otpl':'other_template', 'acl':'comm_address_class' };
	
	if (button.form['dnf_class_values[communication][primary_constituent][_pick][0]']) {
		cid = button.form['dnf_class_values[communication][primary_constituent][_pick][0]'].value;
	} else if (button.form['dnf_class_values[communication][contact_group][0][const_preview]']) {
		cid = button.form['dnf_class_values[communication][contact_group][0][const_preview]'].value;
	} else if (button.form['dnf_class_values[communication][primary_constituent]']) {
		cid = button.form['dnf_class_values[communication][primary_constituent]'].value;
	} else if (button.form['dnf_class_values[communication][primary_constituent][0][constituent_id]']) {
		cid = button.form['dnf_class_values[communication][primary_constituent][0][constituent_id]'].value;
	}
	if (section_class && section_class == 'project') {
		prid = section_object_id;
	}

	for (var_name in flds) {
		if (elem_field = button.form['dnf_class_values[communication][' + flds[var_name] + ']']) {
			if (elem_field.value) {
				window[var_name] = elem_field.value;
			} else {
				window[var_name] = elem_field[0].value;
			}
		} else {
			window[var_name] = '';
		}
	}

	previewin = window.open('/blank.htm', 'previewin', 'width=700,height=800,scrollbars=1');
	previewin.focus();
	setTimeout(function (){callYUIConnect('prevcomm', 'id=' + id + '&cid=' + cid + '&tpl=' + tpl + '&otpl=' + otpl + '&acl=' + acl + '&sig=' + sig + '&csw=' + csw + '&oid=' + oid + '&prid=' + prid + '&uhs=' + uhs + '&html=' + encodeURIComponent(tinyMCE.activeEditor.getContent()), false, null, previewin.document.body, null, true)},500);
}

function compareSections(id1, id2) {
	previewin = window.open('/blank.htm', 'previewin', 'width=700,height=800,scrollbars=1');
	previewin.focus();
	var html = '';
	if (id1 == '' || id2 == '') {
		html = encodeURIComponent(tinyMCE.activeEditor.getContent());
	}
	setTimeout(function (){callYUIConnect('textdiff', 'id1=' + id1 + '&id2=' + id2 + '&html=' + html, false, null, previewin.document.body, null, true)},200);
}

function previewLibItem(button) {
    var id = button.form['dnf_class_values[text_section][section_id]'].value;
		var cid = '';
    var tpl = button.form['dnf_class_values[text_section][template]'].value;
	previewin = window.open('/blank.htm', 'previewin', 'width=700,height=800,scrollbars=1');
	previewin.focus();
    setTimeout(function (){callYUIConnect('prevcomm', 'id=' + id + '&tpl=' + tpl + '&html=' + encodeURIComponent(tinyMCE.activeEditor.getContent()), false, null, previewin.document.body, null, true)},200);
}

function searchLetters() {
    var form = document.getElementById('communication_form');
    var id = form['dnf_class_values[communication][comm_id]'].value;
    var topic = '';
    var searchwin = window.open('/index.php?util=searchlet&id=' + id + '&topic=' + topic, 'searchwin', 'width=816,height=800,scrollbars=0');
}

function setupResize(elem) {
	var height = 15 + (10 * Math.round(elem.value.length / 30));
	if (height > 50) {
		YAHOO.util.Dom.setStyle('so_formfield_' + elem.id, 'height',  (height + 5) + 'px');
		YAHOO.util.Dom.setStyle(elem, 'height',  height + 'px');
	}
}

function completePOBox(elem) {
	reg = /^\d+$/;
	if(elem.match(reg)) {
		elem='P.O. Box '+elem;
	}
	return elem;
}

function changeHomepageSearch(elem) {
	var searchinput=document.getElementById('homepage_search_input');
	var section=document.getElementById('s');

	if(elem.value=='phone') {
		searchinput.name='filter[phones]';
		section.value='constituent';
	}
	else {
		searchinput.name='filter[keywords]';
		section.value=elem.value;
	}
}

function setOutgoingDefaultStatus(elem, approve_setting) {
	var status = document.getElementById('dnf_class_values_communication__incoming_status_');
	if (approve_setting == '1') {
		var out_status = 'draft';
		var out_status_display = 'Draft';
	} else {
		var out_status = 'approved';
		var out_status_display = 'Approved';
	}

	if (status != null) {
		var draftoption = getElementsByValue("^" + out_status + "$", "option");
		var procoption = getElementsByValue("^processed$", "option");

		if (procoption[0] == null) {
			createElement('option', {value: 'processed', innerHTML: 'Reply Needed', selected: 'selected'}, status);
		} else {
			if (elem == 'outgoing') {
				draftoption[0].selected = 'selected';
				procoption[0].selected = '';
			} else {
				draftoption[0].selected = '';
				procoption[0].selected = 'selected';
			}
		}
	} else {
		var status = document.getElementsByName('dnf_class_values[communication][comm_status]');
		var text_status = false;
		if (!status[0]) {
			status = document.getElementById('dnf_class_values_communication__comm_status__widget');
			text_status = true;
		}
		if (elem == 'outgoing') {
			if (text_status) {
				status.innerHTML = out_status_display;
			} else {
				status[0].value = out_status;
				if (status[0].nextSibling) {
					status[0].parentNode.removeChild(status[0].nextSibling);
				}
			}
			status[0].parentNode.innerHTML += out_status_display;
		} else {
			if (text_status) {
				status.innerHTML = 'Reply Needed';
			} else {
				status[0].value = 'processed';
				if (status[0].nextSibling) {
					status[0].parentNode.removeChild(status[0].nextSibling);
				}
				status[0].parentNode.innerHTML += 'Reply Needed';
			}
		}
	}
}

function autofillStaff(elem){
	frameCall('/?util=event_get_staff&value=' + elem.value);
}

function hideNoticePlaceholder() {
	document.getElementById("notice_placeholder").style.display="none";
}

function fillSignatureFields(elem) {
	sig=elem.value;

	var fields=['font_name','font_size','letter','width','image'];

	this_part=elem.id;
	this_part=this_part.replace('dnf_class_values_signature__','');
	this_part=this_part.replace('__0__same_as_','');

	this_type=document.getElementsByName('dnf_class_values[signature]['+this_part+'][0][type]');

	if(sig==''){
		for(ii=0;ii<type.length;ii++){
			this_type[ii].checked=false;
		}

		for(ii=0;ii<fields.length;ii++){
			document.getElementById('dnf_class_values_signature__'+this_part+'__0__'+fields[ii]+'_').value='';
		}
	} else {
		type=document.getElementsByName('dnf_class_values[signature]['+sig+'][0][type]');

		for(ii=0;ii<type.length;ii++){
			this_type[ii].checked=type[ii].checked;
			if(this_type[ii].checked && this_type[ii].value=='image') {
				showNoticePlaceholder(elem,'Please note that, since this is an upload, the desired image file must still be selected here manually.','notice','275px');
				window.setTimeout(hideNoticePlaceholder, 5000);
			}
		}

		for(ii=0;ii<fields.length;ii++){
			if(document.getElementById('dnf_class_values_signature__'+sig+'__0__'+fields[ii]+'_')){
			document.getElementById('dnf_class_values_signature__'+this_part+'__0__'+fields[ii]+'_').value = document.getElementById('dnf_class_values_signature__'+sig+'__0__'+fields[ii]+'_').value;
			}
		}
	}
}

function getElementsByValue(value, tag, node) {
	var values = new Array();
	if (tag == null)
		tag = "*";
	if (node == null)
		node = document;
	var search = node.getElementsByTagName(tag);
	var pat = new RegExp(value, "i");
	for (var i=0; i<search.length; i++) {
		if (pat.test(search[i].value))
			values.push(search[i]);
	}
	return values;
}

function expandAndRemember(form_name, object_class, object_pkey) {
	var divsection = document.getElementById(object_pkey);
	var val = (divsection.style.display == 'none' ? '1' : '0');
	YAHOO.util.Connect.asyncRequest('POST', '/index.php?util=setsess', {}, 'k=' + form_name + ':' + object_class + '&v=' + val);
	fillForm(object_pkey);
}

function toggleOCRDisplay(){
	ocr_text = document.getElementById('ocr_text_field');
	ocr_button = document.getElementById('ocr_button_element');

	if(ocr_text.style.display=='none'){
		ocr_text.style.display = 'block';
		ocr_button.value = 'Hide OCR Text';
	} else {
		ocr_text.style.display = 'none';
		ocr_button.value = 'Show OCR Text';
	}
}

function eraseSalutationText(elem) {
	sal = document.getElementsByName('salutation');
	sal[0].value='';
}

function updateDefaultSalutations(elem) {
	var informal = elem.form.elements['dnf_class_values[constituent][salutation]'];
	var formal = elem.form.elements['dnf_class_values[constituent][formal_salutation]'];
	var official = elem.form.elements['dnf_class_values[constituent][official_salutation]'];
	var inside = elem.form.elements['dnf_class_values[constituent][inside_nameline]'];
	var outside = elem.form.elements['dnf_class_values[constituent][outside_nameline]'];
	if (elem.value == 'military') {
		official[2].checked = true;
		formal[2].checked = true;
		inside[0].checked = true;
		outside[0].checked = true;
	} else {
		if (elem.value == 'official') {
			official[2].checked = true;
		} else {
			informal[0].checked = true;
		}
		formal[1].checked = true;
		inside[1].checked = true;
		outside[1].checked = true;
	}
}

function checkPhoneFormat(phone) {
	if (phone.value) {
		var regex = /^[2-9]\d\d-?\d{3}-?\d{4}$/g;
		if(!regex.test(phone.value)) {
			addWarning(phone, phone.id, "Please enter a valid phone number.");
			phone.focus();
			phone.select();
			return;
		}
	}
	removeWarning(phone.id);
}

function addWarning(elem, suffix, msg) {
	var warning = document.getElementById( 'warning-icon-' + suffix );
	if (!warning) {
		warning = document.createElement('div');
		warning.id = 'warning-icon-' + suffix;
		warning.innerHTML = "<img src='/images/icon-error-small.gif' alt='Warning!' align='left'>" + msg;
		warning.style.color = 'red';
		elem.parentNode.appendChild(warning);
	}
}

function removeWarning(suffix) {
	var warning = document.getElementById('warning-icon-' + suffix);
	if( warning ) {
		warning.parentNode.removeChild(warning);
	}
}

function defaultCountryofBirth(citizen) {
	cob_select = document.getElementById('dnf_class_values_constituent__country_of_birth_');
	if(citizen=='1') {
		cob_select.selectedIndex = 1;
	} else if(citizen=='0' && cob_select.selectedIndex=='1') {
		cob_select.selectedIndex = 0;
	}
}

function checkSSNFormat(ssn,onpageload) {
	var regex = /^\d{3}-\d{2}-\d{4}$/;
	if(!ssn.value.match(regex)) {
		var ninenumbers = /^\d{9}$/;
		if(ssn.value.match(ninenumbers)) {
			ssn.value = ssn.value.substr(0,3) + '-' + ssn.value.substr(3,2) + '-' + ssn.value.substr(5);
		} else if(onpageload!=true) {
			alert('Please enter a valid 9 digit US Social Security Number using only numbers and hyphens.');
			ssn.value = '';
			ssn.focus();
		}
	}
}

function finalizeLIR() {
	var ndx = myAutoCompIndices['searcher'];
	myAutoComp[ndx].dataSource.flushCache();
	myAutoComp[ndx].dataSource.last_query = '__';
}

function addLIRTopic(elem) {
	value = elem.attributes['hp_key'].value;
	frameCall('/utils/setACDependency.php?field=lib_topic&value=' + value + '&checked=true');
	finalizeLIR();
	return elem;
}

function delLIRTopic(option) {
	frameCall('/utils/setACDependency.php?field=lib_topic&value=' + option.value + '&checked=false');
	finalizeLIR();
	return option.value;
}

function updateLIRMethod(option) {
	frameCall('/utils/setACDependency.php?field=lib_method&value=' + option.value);
	finalizeLIR();
	return option.value;
}

function updateConstType(elem) {
	url = '?util=jsgov&class=constituent&field=constituent_type&pkey=' + elem.value;
	var handlejsgov = function(o) {
		ctval = o.responseText;
		if (ctval == '') {
			ctval = 'individual'
		}
		frameCall('/utils/setACDependency.php?field=lib_const_type&value=' + ctval);
		var ndx = myAutoCompIndices['searcher'];
		myAutoComp[ndx].dataSource.flushCache();
		myAutoComp[ndx].dataSource.last_query = '__';
	}
	var cObj = YAHOO.util.Connect.asyncRequest('GET', url, {success:handlejsgov});
}

function findResponsibleStaff(topic_id) {
	var responsible = YAHOO.util.Dom.getElementsBy(function(el) {
		var el_topics = el.id.split('/');
		for (var ii = el_topics.length - 1; ii >= 0; ii--) {
			if (el_topics[ii] == topic_id) {
				return el;
			}
		}
		return false;
	}, 'option', document.getElementById('dnf_class_values_communication__responsible_staff_'));
	if (responsible[0]) {
		responsible[0].selected = true;
	}
}

function setResponsibleStaff(hp_menu) {
	var topic_id = hp_menu.id.replace(/hp_key\d+_/, "user_topic_");
	var hidden_field = document.getElementById('ms_field_1');

	if (hidden_field.options.length <= 1) {
		findResponsibleStaff(topic_id);
	}
}

function updateResponsibleStaffondel(option) {
	var hidden_field = document.getElementById('ms_field_1');
	var topic_id = '';
	if (hidden_field.options.length <= 2) {
		for (var ii=0; ii<hidden_field.options.length; ii++) {
			if (hidden_field.options[ii].value != option.value) {
				topic_id = hidden_field.options[ii].value;
			}
		}
		if (topic_id) {
			topic_id = "user_topic_" + topic_id;
			findResponsibleStaff(topic_id);
		}
	}
	return option.value;
}

function updateStaffDelLIRTopic(option) {
	updateResponsibleStaffondel(option);
	return delLIRTopic(option);
}

function toggleAttachmentFields(elem) {
	var subform = 'so_formfield_' + elem.id.replace('__file_select_', '');

	if(elem.value) {
		document.getElementById(subform + '__title_').style.display = 'none';
		document.getElementById(subform + '__data_').style.display = 'none';
		document.getElementById(subform + '__show_size_').style.display = 'none';
	} else {
		document.getElementById(subform + '__title_').style.display = 'block';
		document.getElementById(subform + '__data_').style.display = 'block';
		document.getElementById(subform + '__show_size_').style.display = 'block';
	}
}

function addEntrytoMultiSelect(short_name, id) {
	var new_entry = document.getElementById(id);
	var select = document.getElementById(short_name + '_textorpick_selectlist');
	var already_exists = false;
	var current_options = [];
	
	var max_id = 0;
	for (ii = 0; ii < select.childNodes.length; ii++) {
		if (select.childNodes[ii].innerHTML) {
			current_options.push(select.childNodes[ii].innerHTML);
		}

		if (Number(select.childNodes[ii].value) > max_id) {
			max_id = Number(select.childNodes[ii].value);
		}
	}
	
	new_entries = new_entry.value.split(',');

	for (ii = 0; ii < new_entries.length; ii++) {
		for(jj = 0; jj < current_options.length; jj++) {
			if (new_entries[ii].toLowerCase() == current_options[jj].toLowerCase()) {
				already_exists = current_options[jj];
				break;
			}
		}
		
		if (already_exists === false) {
			var new_option = document.createElement('option');
			var new_id = Number(max_id) + Number(ii) + 1;
			new_option.value = new_id;
			new_option.innerHTML = new_entries[ii];
			new_option.selected = true;

			select.appendChild(new_option);
		} else {
			var existing_option = YAHOO.util.Dom.getElementBy(function(el) {
				if(el.innerHTML == already_exists) {
					return el;
				}
			}, 'option', select);
			existing_option.selected = true;
		}

		if(select.onchange) {
			select.onchange();
		}

		if (already_exists === false) {
			args = 'index.php?util=save_cms_tag&';

			var handleSuccess = function(o) {
				new_entry.value = '';
			}
			var handleFailure = function(o) {
				new_entry.value = 'error - unable to save tag';
			}
			var callback = {
				success: handleSuccess,
				failure: handleFailure,
				argument: {}
			};

			args += "value=" + new_entries[ii] + '&id=' + new_id;

			var request = YAHOO.util.Connect.asyncRequest('GET', args, callback);
		}
		already_exists = false;
	}
}

function getStaff() {
	if(document.getElementById('scrollable_checkbox_dnf_class_values_event__invited_staff__dnf_multiplerelation_picks___')) {
		staff_field = document.getElementById('scrollable_checkbox_dnf_class_values_event__invited_staff__dnf_multiplerelation_picks___');
	} else {
		staff_field = document.getElementById('scrollable_checkbox_dnf_class_values_event__staff__dnf_multiplerelation_picks___');
	}

	staff = YAHOO.util.Dom.getElementsBy(function(el) {
		if(el.checked) {
			return el.value;
		}
		return false;
	},'input',staff_field);

	return staff;
}

function launchFFT(section,already_ran) {
	var staff = getStaff();
	var ev_length = document.getElementById('dnf_class_values_event__length_').value;
	var start_date = document.getElementById('dnf_class_values_event__start_date_').value;
	var start_time = document.getElementsByName('dnf_class_values[event][start_time]')[0].value;	//optional

	var fft_main = document.getElementById('free_times_results');
	fft_main.style.border = '1px solid #c90';
	fft_main.style.backgroundColor = "#ffc";

	if(staff && ev_length && start_date) {
		findFreeTimes(section,staff,ev_length,start_date,start_time,already_ran);
	} else {
		alert("You must select the desired start date, length, and staff of the event to find available times.");
	}
}

function findFreeTimes(section,staff,length,start_date,start_time,already_ran) {

	args = 'index.php?util=find_free_times&staff=';
	for(ii=0;ii<staff.length;ii++) {
		args += staff[ii].value;
	}
	args += '&length=' + length + '&s=' + section + '&date=' + start_date;
	if(start_time) {
		args += '&time=' + start_time;
	}

	results_div = document.getElementById('free_times_results');
	results_div.style.display = 'block';

	results_div.style.fontWeight = 'bold';
	results_div.style.fontSize = '13px';
	results_div.innerHTML = "<span id='fft_processing' style='font-size:13px;padding-top:8px;'><img src='/images/spinner.gif' width='17px' height='17px' style='padding-top: 5px;' /> Confirming invitee availability...</span>";
	results_div.style.height = '30px';
	results_div.style.width = '510px';

	if(already_ran) {
		time = 0;
	} else {
		time = 2200;
	}

	setTimeout(function(){
		var handleSuccess = function(o) {
			if(o.responseText !== undefined) {
				results_div.innerHTML = o.responseText;
				results_div.style.height = 'auto';

				checkFFTFormatting(false);
			}
		}

		var handleFailure = function(o) {
			results_div.innerHTML = 'Somehow: failure!';
		}

		var callback = {
			success: handleSuccess,
			failure: handleFailure,
			argument: {}
		};

		var request = YAHOO.util.Connect.asyncRequest('GET', args, callback);
	},time);
}

function checkFFTFormatting(loop) {
	var content = document.getElementById('fft_content');
	var times_table = document.getElementById('available_times_table');
	if(content.nextSibling && content.nextSibling.id && content.nextSibling.id.match(/^free_time_/)) {
		if(!loop) {
			document.getElementById('available_times_tab').innerHTML = 'Alternate Suggestions';
		}
		times_table.appendChild(content.nextSibling);
		checkFFTFormatting(true);
	} else if(!times_table.innerHTML) {
		document.getElementById('available_times_tab').innerHTML = 'Alternate Suggestions';
		times_table.innerHTML = "<tr><td style='font-style:italic'>No alternate suggestions found.</td></tr>";
	}
}

function hideFreeTimes() {
	document.getElementById('free_times_results').style.display = 'none';
}

function timeToTimestamp(time) {
	var regex = /^(?:([0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
	var parts = time.replace(regex,"$1 $2 $3").split(' ');

    return new Date(parts[1],parts[2],parts[3]);
}

function timestampToTime(timestamp,suffix) {
	var time = new Date(timestamp * 1000);
	hours = time.getHours();
	minutes = time.getMinutes();
	if(minutes.toString().length == '1') {
		minutes = '0' + minutes;
	}

	if(suffix) {
		suffix = 'am';
		if(hours>12) {
			hours = hours-12;
			suffix = 'pm';
		} else if(hours=='0') {
			hours = '12';
		} else if(hours=='12') {
			suffix = 'pm';
		}

		return hours + ':' + minutes + ' ' + suffix;
	} else {
		return hours + ':' + minutes + ':00';
	}
}

function timestampToDate(timestamp) {
	var time = new Date(timestamp * 1000);
	month = time.getMonth();
	time = String(time).split(' ');

	month = Number(month) + 1;
	if(month < 10) {
		month = String('0' + month);
	}

	return time[3] + '-' + month + '-' + time[2];
}

function updateFFTGrid(elem) {
	args = 'index.php?util=update_fft_grid&';

	var handleSuccess = function(o) {
		if(o.responseText !== undefined) {
			document.getElementById('free_times_grid').innerHTML = o.responseText;
		}
	}
	var handleFailure = function(o) {
		results_div.innerHTML = 'Somehow: failure!';
	}
	var callback = {
		success: handleSuccess,
		failure: handleFailure,
		argument: {}
	};

	start = document.getElementById('day_start').value;
	end = document.getElementById('day_end').value;
	date = document.getElementById('dnf_class_values_event__start_date_').value;
	interval = document.getElementById('grid_interval').value;

	var length = document.getElementById('dnf_class_values_event__length_').value;
	args += "start=" + start + "&end=" + end + "&interval=" + interval + "&date=" + date + "&length=" + length;

	var request = YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

function setEventTime(elem,from_grid,section) {
	time_val = timestampToTime(elem.className,false);

	if(from_grid) {
		start_time = parent.document.getElementsByName('_manual_dnf_class_values[event][start_time]');
		start_time_real = parent.document.getElementsByName('dnf_class_values[event][start_time]');
		end_time = parent.document.getElementsByName('_manual_dnf_class_values[event][end_time]');
		end_time_real = parent.document.getElementsByName('dnf_class_values[event][end_time]');

		if(document.getElementById('fft_grid_action').className=='fft_grid_start') {
			start_time[0].value = timestampToTime(elem.className,true);
			start_time_real[0].value = time_val;

			if(parent.document.getElementById('dnf_class_values_event__length_').value) {
				end_time[0].value = timestampToTime(Number(elem.className) + (Number(parent.document.getElementById('dnf_class_values_event__length_').value)*60),true);
				end_time_real[0].value = timestampToTime(Number(elem.className) + (Number(parent.document.getElementById('dnf_class_values_event__length_').value)*60),false);
			}

			document.getElementById('fft_grid_action').className = 'fft_grid_end';
			document.getElementById('fft_grid_action').innerHTML = "Click a time to set the event's <span style='color:red;font-weight:bold'>end</span> time. (If you already specified a length, this has been done for you and you may close this window.)";
		} else {
			end_time[0].value = timestampToTime(elem.className,true);
			end_time_real[0].value = time_val;

			document.getElementById('fft_grid_action').className = 'fft_grid_start';
			document.getElementById('fft_grid_action').innerHTML = "Your times are now set.  You may close this window and continue with the event form, or you may click a new start time on the grid.";
		}
	} else {
		start_time = document.getElementsByName('_manual_dnf_class_values[event][start_time]');
		start_time_real = document.getElementsByName('dnf_class_values[event][start_time]');
		start_time[0].value = timestampToTime(elem.className,true);
		start_time_real[0].value = timestampToTime(elem.className,false);

		if(document.getElementById('dnf_class_values_event__length_').value) {
			end_time = document.getElementsByName('_manual_dnf_class_values[event][end_time]');
			end_time_real = document.getElementsByName('dnf_class_values[event][end_time]');

			end_time[0].value = timestampToTime(Number(elem.className)+(Number(document.getElementById('dnf_class_values_event__length_').value)*60),true);
			end_time_real[0].value = timestampToTime(Number(elem.className)+(Number(document.getElementById('dnf_class_values_event__length_').value)*60),false);
		}
	}

	endFFT(section);
}

function endFFT(section) {
	fft_main = document.getElementById('free_times_results');
	fft_main.innerHTML = "<img src='/images/icon_light.gif' style='padding-top: 5px;' />Availability confirmed.   <span style='cursor:pointer;text-decoration:underline;font-weight:normal;font-size:13px;' onclick='launchFFT(\"" + section + "\",1)'>View Free Time</span>";
	fft_main.style.border = '1px solid #090';
	fft_main.style.backgroundColor = "#EEF9EB";
	fft_main.style.width = '510px';
}

function getPriorityParent(elem){
	args = 'index.php?util=get_priority_parent&priority=' + elem.value;

	var handleSuccess = function(o) {
		if(o.responseText !== undefined) {
			parent = YAHOO.util.Dom.getElementsBy(function(el) {
				if(el.value == o.responseText) {
					return el.value;
				}
				return false;
			},'input',document.getElementById('scrollable_checkbox_dnf_class_values_cms_news__related_priority__dnf_multiplerelation_picks___'));

			if(parent[0]) {
				parent[0].checked = elem.checked;
			}
		}
	}
	var handleFailure = function(o) {}
	var callback = {
		success: handleSuccess,
		failure: handleFailure,
		argument: {}
	};

	var request = YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

function getY(elem) {
	var ret_val = 0;
	while( elem != null ) {
		ret_val += elem.offsetTop;
		elem = elem.offsetParent;
	}

	return ret_val;
}

function moveActionsListLeft() {
	xpos = '0px';
	divwidth = '180px';
	pad = '5px 2px 5px 2px';
	moveActionsList(xpos,divwidth,pad);
}

function moveActionsListRight() {
	xpos = Number(document.body.clientWidth - 217) + 'px';
	divwidth = '206px';
	pad = '7px 16px 7px 16px';
	moveActionsList(xpos,divwidth,pad);
}

function moveActionsList(xpos,divwidth,pad) {
	var listmode = window.document._list_form;
	var found_actions = false;
	if(listmode && listmode.nodeName == 'FORM') {
		actions = YAHOO.util.Dom.getElementsByClassName('ListHeadResultInfo');
		y_change = getY(actions[0]);
		for(ii=0;ii<actions[0].childNodes.length;ii++) {
			if(actions[0].childNodes[ii].tagName == 'DIV') {
				actions[0] = actions[0].childNodes[ii];
				found_actions = true;
				break;
			}
		}
	} else {
		actions = YAHOO.util.Dom.getElementsByClassName('section-actions');
		found_actions = true;
		y_change = 150;
	}

	if(found_actions && actions[0] && document.body.scrollTop > y_change && !document.getElementById('actions_tab')) {	//build the actions tab & place the actions list on it
		actions_tab = document.createElement('div');
		actions_tab.id = 'actions_tab';

		if(navigator.appName.indexOf("Internet Explorer")!=-1) {
			actions_tab.style.position = 'absolute';
		} else {
			actions_tab.style.position = 'fixed';
		}

		actions_tab.style.top = '0px';
		actions_tab.style.left = xpos;
		actions_tab.style.zIndex = '4';
		actions_tab.style.width = divwidth;
		actions_tab.style.backgroundColor = '#ffe';
		actions_tab.style.display = 'inline';
		actions_tab.style.border = '2px solid #c90';
		actions_tab.style.borderTop = '0';

		actions[0].style.padding = pad;

		actions_tab.appendChild(actions[0]);
		document.body.appendChild(actions_tab);

		var attributes = {height: { from: 0, to: 35 }};
		var slide_in = new YAHOO.util.Anim('actions_tab', attributes,0.15);
		slide_in.animate();
	} else if(document.body.scrollTop <= y_change && document.getElementById('actions_tab')) {	//remove the actions tab and put the actions list back where it was
		actions[0] = document.getElementById('actions_tab').firstChild;
		if(listmode && listmode.nodeName == 'FORM') {
			buttonbar = YAHOO.util.Dom.getElementsByClassName('ListHeadResultInfo');
			firstbutton = buttonbar[0].firstChild;

			document.body.removeChild(document.getElementById('actions_tab'));
		} else {
			buttonbar = YAHOO.util.Dom.getElementsByClassName('buttonbar_top');
			if(navigator.appName.indexOf("Internet Explorer")!=-1) {
				firstbutton = YAHOO.util.Dom.getElementsByClassName('input-button btn_generic_ie5_5up');
				firstbutton = firstbutton[0];
			} else {
				firstbutton = document.getElementById('input-button btn_generic_nav6up');
			}

			var attributes = {height: { to: 0 }};
			var slide_out = new YAHOO.util.Anim('actions_tab', attributes,0.15);
			slide_out.onComplete.subscribe(function(){document.body.removeChild(document.getElementById('actions_tab'));});
			slide_out.animate();
		}
		if (buttonbar[0] && actions[0]) {
			buttonbar[0].insertBefore(actions[0],firstbutton);
			actions[0].style.padding = '0';
		}
	} else if(document.body.scrollTop > y_change && navigator.appName.indexOf("Internet Explorer")!=-1) {	//maintain the actions tab (only required in stupid IE)
		var crossobj = document.getElementById("actions_tab");
		var iebody = (document.compatMode && document.compatMode != "BackCompat")? document.documentElement : document.body;

		var dsocleft = xpos;
		var dsoctop = iebody.scrollTop;
		if ((document.all || document.getElementById) && crossobj){
			crossobj.style.left = parseInt(dsocleft);
			crossobj.style.top = dsoctop;
		}
	}
}

function changeSelectedTab(elem) {
	var current_tab = YAHOO.util.Dom.getElementsByClassName('selected_tab','li');
	var other_tab = YAHOO.util.Dom.getElementsByClassName('tab','li');
	var fft_main = document.getElementById('free_times_results');
	var fft_content = document.getElementById('fft_content');
	var date_widget = document.getElementById('so_formfield_dnf_class_values_event__start_date_');
	var xpos = fft_main.offsetLeft;

	if(current_tab[0]!=elem) {
		current_tab[0].setAttribute('class','tab');
		other_tab[0].setAttribute('class','selected_tab');
		current_tab[0].setAttribute('className','tab');
		other_tab[0].setAttribute('className','selected_tab');

		if(current_tab[0].id=='detailed_grid_tab') {
			document.getElementById('available_times_table').style.display = 'block';
			document.getElementById('detailed_grid').style.display = 'none';

			fft_main.style.width = '510px';
		} else if(current_tab[0].id=='available_times_tab') {
			document.getElementById('available_times_table').style.display = 'none';
			document.getElementById('detailed_grid').style.display = 'block';

			fft_main.style.width = Number(document.body.clientWidth-xpos-213) + 'px';
			fft_main.style.maxHeight = Number(document.body.clientHeight-(date_widget.offsetHeight*3.4)) + 'px';
			fft_content.style.maxHeight = Number(document.body.clientHeight-(date_widget.offsetHeight*3.4)-85) + 'px';
			window.scrollTo(0,getY(date_widget));
		}
	}
}

function renderPhotoSubforms(elem) {
	val = elem.value;
	if(val == '0') {
		alert('Please enter a number greater than zero.');
		elem.value = '';
	} else {
		button = document.getElementById('n1_action__dnf_class_valuesprojectphoto');

		subforms = YAHOO.util.Dom.getElementsBy(function(el){
			if(el.id) {
				return el.id.match( /^_hidden_subform_dnf_class_values\[project]\[photo]__/ );
			}
			return false;
		});
		cur_subforms = subforms.length - 1;

		if(val > cur_subforms) {
			new_subforms = val - cur_subforms;
			for(ii=0;ii<new_subforms;ii++) {
				showNewN1Subform(button,'_hidden_subform_dnf_class_values[project][photo]',null);
			}
			button.setAttribute('n1counter',val);
		} else if(val < cur_subforms) {
			del_subforms = cur_subforms - val;
			for(ii=0;ii<del_subforms;ii++) {
				deleteN1SubForm(null, '_hidden_subform_dnf_class_values[project][photo]__[' + Number(del_subforms-ii) + ']');
				document.getElementById('_hidden_subform_dnf_class_values[project][photo]__[' + Number(del_subforms-ii) + ']').parentNode.parentNode.removeChild(document.getElementById('_hidden_subform_dnf_class_values[project][photo]__[' + Number(del_subforms-ii) + ']').parentNode);
			}
			button.setAttribute('n1counter',val);
		}
	}
}

function checkSubjectSelection(elem) {
	if(elem.value=='0') {
		alert('Please select the appropriate policy comment subject from the list.');
		elem.value = '';
	} else if(elem.value=='1') {
		alert('Please select the appropriate non-policy comment subject from the list.');
		elem.value = '';
	}
}

var yuipopdiv = false;
var yuipopdialog = false;
var yuidragdiv = false;

if (typeof YAHOO != 'undefined') {
	(function() {
	    YAHOO.util.Event.onDOMReady(function() {
			yuipopdiv = new YAHOO.widget.Panel("popdiv_placeholder",
				{ width:"800px",
				  height:"600px",
				  fixedcenter:true,
				  close:true,
				  draggable:true,
				  zindex:100,
				  modal:false,
				  visible:false
				}
			);
			yuipopdialog = new YAHOO.widget.Panel("dialog_placeholder",
				{ width:"300px",
				  height:"180px",
				  fixedcenter:true,
				  close:true,
				  draggable:false,
				  zindex:100,
				  modal:true,
				  visible:false
				}
			);
	    });
      if (YAHOO.util.DDProxy) {
	      yuidragdiv = new YAHOO.util.DDProxy("notice_placeholder");
      }
    })();

	// emulate prototype Ajax call
	if (typeof Ajax == 'undefined') {
		var Ajax = {
		  ScriptFragment: '(?:<script.*?>)((\n|\r|.)*?)(?:<\/script>)',

		  stripScripts: function(html) {
		    return html.replace(new RegExp(Ajax.ScriptFragment, 'img'), '');
		  },

		  evalScripts: function(html) {
		    var matchAll = new RegExp(Ajax.ScriptFragment, 'img');
		    var matchOne = new RegExp(Ajax.ScriptFragment, 'im');
		    var scripts = html.match(matchAll);
		    if (scripts) {
			    for(var i=0; i<scripts.length; i++) {
			    	var js = scripts[i].match(matchOne);
			    	if (js[1]) {
				    	eval(js[1]);
			    	}
			    }
		    }
		  }
		}

		Ajax.Updater = function(elem,url,params){
			if (typeof elem == 'string') {
				elem = document.getElementById(elem);
			}
			params.updater = elem;
			var callback = {
				success: handleYUIConnectionSuccess,
				failure: handleYUIConnectionFailure,
				argument: params
			};
			var request = YAHOO.util.Connect.asyncRequest('GET', url, callback);
		};
	}
}

function toggleWliType(type) {
        if (document.getElementById("wli_"+type+"_open").style.display=="block") {
                document.getElementById("wli_"+type+"_open").style.display="none";
                document.getElementById("wli_"+type+"_closed").style.display="block";
        } else {
                document.getElementById("wli_"+type+"_open").style.display="block";
                document.getElementById("wli_"+type+"_closed").style.display="none";
        }
        return false;
}

function prepBatchPanel(panel_name, sesskey, act_width, act_height, header_string) {
	if (typeof hp_hide == 'function') {
		hp_hide(0);
	}

	if (YAHOO.env.ua.ie > 0 && YAHOO.env.ua.ie < 9 && document.compatMode == 'BackCompat' && act_width.indexOf('px') != -1) {
		act_width = parseInt(act_width) + 2 + 'px';
	}

	var yui_panel = new YAHOO.widget.Panel('batcheditpanel',
		{
			width:act_width,
			close:true,
			visible:true,
			draggable:false,
			fixedcenter:true,
			constraintoviewport:true,
			underlay:'none'
		}
	);

	yui_panel.setHeader(header_string);
	yui_panel.beforeShowEvent.subscribe(function() {
		yui_panel.body.style.height = act_height;
		yui_panel.body.style.overflow = 'auto';
	});
	yui_panel.beforeHideEvent.subscribe(function() {
		yui_panel.body.style.overflow = 'hidden';
	});

    return function(o){
		if (o.responseText.indexOf('<iframe ') == 0) {
       		yui_panel.setBody('');			
			yui_panel.body.style.padding = '0px';
		}
		yui_panel.setBody(o.responseText);
		yui_panel.render();
		yui_panel.show();
		var dom_panel = document.getElementById('batcheditpanel');
		dom_panel[panel_name] = yui_panel;
	};

}

function batchPrint(sesskey, sclass) {
	var handleSuccess = prepBatchPanel('batchprint_panel', sesskey, '815px', '500px', 'Batch Print');
	handleSuccess({responseText:'<iframe frameborder="0" style="width:815px;height:500px;" src="/?util=batch_print&sesskey='+sesskey+'&class='+sclass+'"></iframe>'});
}

function renderAddGroupFrame(sesskey, sclass, action, extra_arg){

	var act_width = '815px';
	var act_height = '500px';
	var header_string = 'Perform Action:';
	switch(action){
		case 'groupadd':
			header_string = 'Add to Existing Group:';
		break;
		case 'hhadd':
			header_string = 'Add to Existing Household:';
			act_height = '380px';
		break;
		case 'caseadd':
			header_string = 'Add to Existing Case:';
			act_height = '380px';
		break;
		case 'projectadd':
			header_string = 'Add to Existing Project:';
			act_height = '380px';
		break;
		case 'groupdel':
			header_string = 'Remove from Existing Group:';
		break;
		case 'hhdel':
			header_string = 'Remove from Existing Household:';
		break;
		case 'hhcreate':
			header_string = 'Create Household:';
			act_width = '315px';
			act_height = '380px';
		break;
		case 'hhmerge':
			header_string = 'Merge Households:';
		break;
		case 'fwd_to_agency':
			header_string = 'Forward to Agency:';
			act_width = '450px';
			act_height = '300px';
		break;
		case 'project':
			header_string = 'Create Project:';
		break;
		case 'set_roles':
			header_string = 'Set Roles:';
		break;
	}

	var handleSuccess = prepBatchPanel('addgrouppanel_panel', sesskey, act_width, act_height, header_string);
	var string_match = /comms:form/g;
	var string_match_2 = /communications:form/g;
	if((action=='groupadd' || action=='caseadd' || action=='projectadd') && (sesskey.match(string_match) || sesskey.match(string_match_2))) {
		sesskey = parent.document.getElementsByName('arg');
		sesskey = sesskey[0].value;
	}

	response_string = '<iframe frameborder="0" style="width:' + act_width + ';height:' + act_height + ';" src="/?util=add_group&sesskey=' + sesskey + '&class=' + sclass + '&action=' + action;
	if(typeof(extra_arg) != 'undefined') {
		response_string += '&extra_arg=' + extra_arg;
	}
	response_string += '"></iframe>';

	handleSuccess({responseText: response_string});
}

function renderBatchEditFrame(sesskey, sclass){
	var handleSuccess = prepBatchPanel('batcheditpanel_panel', sesskey, '800px', '600px', 'Edit Records');
	handleSuccess({responseText:'<iframe frameborder="0" style="width:800px;height:600px;" src="/utils/batch_edit.php?sesskey='+sesskey+'&class='+sclass+'"></iframe>'});
}

function renderRouteEmailFrame(sesskey, sclass, action, args){

	var handleSuccess = prepBatchPanel('routepanel_panel', sesskey, '500px', '570px', 'Routing Options:');

	var url = '/?util=route_email&sesskey='+sesskey+'&class='+sclass+'&action='+action;

    if (args) {
		if (args.child_context) {
			url = url + '&child_context=1&child_parent=' + args.parent;
		} else {
			url += '&comm_id=' + args;
		}
    }

	handleSuccess({responseText:'<iframe frameborder="0" style="width:500px;height:570px;" src="'+url+'"></iframe>'});

}

function renderCloseReasonFrame(sesskey, sclass, act){

	var handleSuccess = prepBatchPanel('closereasonpanel_panel', sesskey, '400px', '275px', 'Reason for Closing');

	string_match = /comms:form/g;
	string_match_2 = /communications:form/g;
	if(sesskey.match(string_match) || sesskey.match(string_match_2)) {
		sesskey = parent.document.getElementsByName('arg');
		sesskey = sesskey[0].value;
	}

	handleSuccess({responseText:'<iframe frameborder="0" style="width:400px;height:275px;" src="/?util=closereason&sesskey='+sesskey+'&class='+sclass+'&action='+act+'"></iframe>'});

}

function changeAutoSyncValue(val) {
	var radio_buttons = document.getElementsByName('dnf_class_values[event][ews_sync]');
	if(val == 'approved') {
		var button_val = '1';
	} else {
		var button_val = '0';
	}

	for(ii=0;ii<radio_buttons.length;ii++) {
		if(radio_buttons[ii].value == button_val) {
			radio_buttons[ii].checked = 'checked';
		} else if(radio_buttons[ii].checked) {
			radio_buttons[ii].removeAttribute('checked');
		}
	}
}

function updateTemplateOptions() {
	var purpose = document.getElementsByName('dnf_class_values[project][purpose]')[0].value;
	var initiator = document.getElementsByName('dnf_class_values[project][initiator]')[0].value;
	
	if(purpose && initiator) {
		var args = 'index.php?util=get_mapped_template&purpose=' + purpose + '&initiator=' + initiator;
		var handleSuccess = function(o) {
			if(o.responseText) {
				var template = YAHOO.lang.JSON.parse(o.responseText);
				var template_list = document.getElementById('dnf_class_values_project__template_');
				template_list.innerHTML = '';
				var new_option = document.createElement('option');
				new_option.value = template['project_id'];
				new_option.text = template['title'];
				new_option.selected = '1';
				try {
					template_list.add(new_option, null); // standards compliant; doesn't work in IE
				} catch(ex) {
					template_list.add(new_option); // IE only
				}

				document.getElementById('so_formfield_dnf_class_values_project__template_').style.display = 'block';
				var use_template = document.getElementsByName('dnf_class_values[project][use_template]');
					
				if(use_template[0].value = '1') {
					use_template[0].checked = '1';
				} else {
					use_template[1].checked = '1';
				}
					
				if(template_list.onchange) {
					template_list.onchange();
				}
			}
		};
		var handleFailure = function(o) {};
		var callback = {
			success: handleSuccess,
			failure: handleFailure
		};
		YAHOO.util.Connect.asyncRequest('GET', args, callback);
	} else {
		return;
	}
}

//No more errors when debugging javascript and accidentally typing pp.
function pp(out) {
	alert(out);
}

function renderNewXFrame(field_name, field_class, parent_class, parent_id, extra_func) {

   hp_hide(0);

   var xpanel = new YAHOO.widget.Panel("batcheditpanel",
		{
			width: '600px',
			height: '600px',
			overflow: 'visible',
			close:true,
			visible:true,
			draggable:true,
			context: ['page_wrapper','tl','tr'],
			constraintoviewport:true,
			underlay:'shadow'
		}
	);

    var handleSuccess = function(o){
		xpanel.setBody(o.responseText);
		xpanel.render();
		xpanel.show();
		document.getElementById('batcheditpanel').xpanel_panel = xpanel;
	}

	handleSuccess({responseText:'<iframe frameborder=0 style="width:600px;height:600px;" src="/?util=add_new_x&class=' + parent_class + '&field=' + field_name + '&field_class=' + field_class + '&parent_id=' + parent_id + '&extra_func=' + extra_func + '"></iframe>'});
}

function eventlogAll(args){
	var url = 'index.php?util=eventlog_all&' + args;
	var handleSuccess = function(o) {
		if(o.responseText) {
			previewin = window.open('/blank.htm', 'previewin', 'width=700,height=800,scrollbars=1');
			previewin.document.write(o.responseText);
			previewin.print();
		}
	};
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};
	YAHOO.util.Connect.asyncRequest('GET', url, callback);
}

function renderTaskSetFrame(sesskey, sclass) {
	var handleSuccess = prepBatchPanel('tasksetpanel_panel', sesskey, '400px', '250px', 'Add Tasks from Template');
	handleSuccess({responseText:'<iframe frameborder="0" style="width:400px;height:250px;" src="/?util=add_task_set&sesskey=' + sesskey + '"></iframe>'});
}

function showAddressPreview(elem) {
	if (!elem) {
		return;
	}
	
	var address_prefix = 'dnf_class_values_communication__primary_constituent__0__address__0__';
	var args = [];
	
	var pick_flds = ['address_class', 'state', 'country'];
	var temp = '';
	for (ii = 0; ii < pick_flds.length; ii++) {
		temp = document.getElementById(address_prefix + pick_flds[ii] + '_');
		args.push(pick_flds[ii] + '=' + temp.options[temp.selectedIndex].innerHTML);
	}
	
	var text_flds = ['street', 'zip', 'city', 'title', 'org_name'];
	for (ii = 0; ii < text_flds.length; ii++) {
		args.push(text_flds[ii] + '=' + document.getElementById(address_prefix + text_flds[ii] + '_').value);
	}
	
	args = args.join('&');
	var handleSuccess = function(o) {
		var fld_prefix = 'dnf_class_values_communication__primary_constituent__0__';
		if (o.responseText) {
			var addr = o.responseText;
		} else {
			var addr = '(no address)';
		}
		var address_preview = document.getElementById('address_preview');
		if (address_preview) {
			elem.parentNode.removeChild(address_preview);
		}
		var fname = document.getElementById(fld_prefix + 'fname_').value;
		var lname = document.getElementById(fld_prefix + 'lname_').value
		var fullname =  fname + ' ' + lname + ' ' + document.getElementById(fld_prefix + 'suffix_').value;
		var salutation = YAHOO.util.Dom.getElementsBy(function(el) {
			if (el.checked && el.name && el.name == 'dnf_class_values[communication][primary_constituent][0][salutation]') {
				return el;
			}
		}, 'input', 'so_formfield_' + fld_prefix + 'salutation_');
		salutation = salutation[0].value.replace('[fname]', fname);
		salutation = salutation.replace('[lname]', lname);
		
		var const_id = document.getElementById(fld_prefix + 'constituent_id_').value;
		var prefix = document.getElementById(const_id + '_prefix');
		if (prefix && prefix.value) {
			salutation = salutation.replace('[prefix]', prefix.value);
		}
		var title = document.getElementById(fld_prefix + 'title_');
		if (title && title.value) {
			salutation = salutation.replace('[title]', title.value);
		}

		var preview = fullname + '<br/>' + addr + '<br/><br/>' + salutation + ':';
		elem.parentNode.innerHTML = "<div id='address_preview' style='padding-bottom:7px'>" + preview + "</div>" + elem.parentNode.innerHTML;
		
		//fixes salutation write-in bug
		var fillin = YAHOO.util.Dom.getElementsBy(
			function(el) {
				if (el.name && el.name.match(/_salutation/gi)) {
					return el;
				}
			}, 'input', document.getElementById('dnf_class_values_communication__primary_constituent__0__salutation__widget'),
			function(el) {
				if (el.parentNode && el.parentNode.tagName == 'LABEL') {
					el.onclick = function() { this.previousSibling.checked=1; }
					el.parentNode.parentNode.insertBefore(el, el.parentNode);
				}
			}
		);
	};
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};
	YAHOO.util.Connect.asyncRequest('GET', '/?util=get_address_preview&' + args, callback);
}

function renderFlagCloseFrame(sesskey){
	var handleSuccess = prepBatchPanel('flagclosepanel_panel', sesskey, '600px', '280px', 'Add Flags & Close');
	handleSuccess({responseText:'<iframe frameborder="0" style="width:600px;height:280px;" src="/?util=flag_close_form&sesskey=' + sesskey + '"></iframe>'});
}

function renderOutgoingTestFrame(id) {
	var handleSuccess = prepBatchPanel('rules_panel', id, '500px', '500px', 'Processing Results');
	handleSuccess({responseText:'<iframe frameborder="0" style="width:500px;height:500px;" src="/?util=outcomm&id=' + id + '"></iframe>'});
}

function getProjectDetails(project, set_roles) {
	var handleSuccess = function(o) {
		var project = YAHOO.lang.JSON.parse(o.responseText);
		var already_requestor = 0;
		var already_poc = 0;
		for (key in project) {
			if (project[key] == 'primary_constituent') {
				already_requestor = 1;
			}
			if (project[key] == 'event_poc') {
				already_poc = 1;
			}
		}
		setRoleOptions(project.type, already_requestor, already_poc, set_roles);
		delete project['type'];
		if (!set_roles) {
			checkProjectConstituentExistence(project);
		}
	};
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};

	var args = 'index.php?util=get_project_details&project=' + project;
	YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

function checkProjectConstituentExistence(project) {
	var picklists = YAHOO.util.Dom.getElementsBy(
		function(el) {
			if (el.id) {
				return el.id.match(/^constituent_role_/);
			}
		},
		'select',
		document.getElementById('dnf_class_values_project__roles__widget'),
		function(el) {
			var match = false;
			for (const_id in project) {
				if (el.id == 'constituent_role_' + const_id) {
					match = true;
					break;
				}
			}
			
			if (match) {
				el.style.display = 'none';
				el.value = project[const_id];
				
				if (document.getElementById(el.id + '_text_role')) {
					document.getElementById(el.id + '_text_role').innerHTML = getRoleDisplayName(project[const_id]);
					document.getElementById(el.id + '_text_role').style.display = 'inline';
				} else {
					var text_role = document.createElement('span');
					text_role.id = el.id + '_text_role';
					text_role.innerHTML = getRoleDisplayName(project[const_id]);
					el.parentNode.appendChild(text_role);
				}
			} else {
				if (document.getElementById(el.id + '_text_role')) {
					document.getElementById(el.id + '_text_role').style.display = 'none';
					el.style.display = 'inline';
				}
			}
		}
	);
}

function getRoleDisplayName(role) {
	var display_name = '';
	
	switch(role) {
		case 'webform_recipient':
			display_name = 'Recipient';
		break;
		case 'primary_constituent':
			display_name = 'Requestor';
		break;
		case 'honorees':
			display_name = 'Honoree';
		break;
		case 'on_behalf_of':
			display_name = 'On Behalf Of';
		break;
		case 'event_poc':
			display_name = 'Event POC';
		break;
		case 'event_sponsor':
			display_name = 'Event Sponsor';
		break;
		case 'event_associate':
			display_name = 'Event Associate';
		break;
		default:
			display_name = '';
	}
	return display_name;
}

function checkProjectType() {
	if (!document.getElementById('dnf_class_values_project__type_').value) {
		alert('You must select a project type.');
		return false;
	} else {
		return true;
	}
}

function setRoleOptions(project_type, already_requestor, already_poc, set_roles) {
	var role_options = new Array();
	
	if (project_type == 'thankyou') {
		role_options = [
			{ 'value': '', 'text': '' },
			{ 'value': 'webform_recipient', 'text': 'Recipient' }
		];
	} else if (project_type == 'personal_photo_request' || project_type == 'presidential_photo_request' || project_type == 'congressional_greeting' || project_type == 'presidential_greeting') {
		role_options = [
			{ 'value': '', 'text': '' },
			{ 'value': 'webform_recipient', 'text': 'Recipient' },
			{ 'value': 'primary_constituent', 'text': 'Requestor' },
			{ 'value': 'honorees', 'text': 'Honoree' },
			{ 'value': 'on_behalf_of', 'text': 'On Behalf Of' }
		];
	} else if (project_type == 'proclamation') {
		role_options = [
			{ 'value': '', 'text': '' },
			{ 'value': 'webform_recipient', 'text': 'Recipient' },
			{ 'value': 'primary_constituent', 'text': 'Requestor' },
			{ 'value': 'honorees', 'text': 'Honoree' }
		];
	} else if (project_type == 'presidential_message') {
		role_options = [
			{ 'value': '', 'text': '' },
			{ 'value': 'webform_recipient', 'text': 'Recipient' },
			{ 'value': 'primary_constituent', 'text': 'Requestor' },
			{ 'value': 'honorees', 'text': 'Honoree' },
			{ 'value': 'on_behalf_of', 'text': 'On Behalf Of' },
			{ 'value': 'event_poc', 'text': 'Event POC' },
			{ 'value': 'event_sponsor', 'text': 'Event Sponsor' },
			{ 'value': 'event_associate', 'text': 'Event Associate' }
		];
	} else {
		role_options = [
			{ 'value': '', 'text': 'Constituent' },
			{ 'value': 'primary_constituent', 'text': 'Point of Contact' }
		];
	}
	
	for (key in role_options) {
		if ((already_requestor && role_options[key].value == 'primary_constituent') || (already_poc && role_options[key].value == 'event_poc')) {
			delete role_options[key];
		}
	}

	var picklists = YAHOO.util.Dom.getElementsBy(
		function(el) {
			if (el.id) {
				return el.id.match(/^constituent_role_/);
			}
		},
		'select',
		document.getElementById('dnf_class_values_project__roles__widget'),
		function(el) {
			var cur_val = '';
			if (set_roles) {
				if (el.childNodes) {
					cur_val = el.childNodes[0].value;
				}
			}
			
			el.innerHTML = '';
			for(ii in role_options) {
				var new_option = document.createElement('option');
				new_option.value = role_options[ii].value;
				new_option.text = role_options[ii].text;
				if (cur_val && (new_option.value == cur_val)) {
					new_option.selected = true;
				}
				
				try {
					el.add(new_option, null);
				} catch(ex) {
					el.add(new_option);
				}
			}
		}
	);
	
	YAHOO.util.Dom.getElementsByClassName('blurb', 'div', document.getElementById('so_formfield_dnf_class_values_project__roles_'),
		function(el) {
			if (project_type) {
				if (picklists.length > 1) {
					var apply_all = document.createElement('select');
					apply_all.id = 'constituent_role_all';
					apply_all.setAttribute('onchange', 'applyRoleToConstituents(this.value)');
					for(ii = 0; ii < role_options.length; ii++) {
						if (role_options[ii].value != 'primary_constituent' && role_options[ii].value != 'event_poc') {
							var new_option = document.createElement('option');
							new_option.value = role_options[ii].value;
							new_option.text = role_options[ii].text;
							try {
								apply_all.add(new_option, null);
							} catch(ex) {
								apply_all.add(new_option);
							}
						}
					}
					el.innerHTML = "Quick Apply: ";
					el.appendChild(apply_all);
				} else {
					el.innerHTML = '';
				}
			} else {
				el.innerHTML = "Valid role options will be populated once you have selected a Project Type.";
			}
		}
	);
}

function checkOtherConstituentRoles(cur_picklist) {
	if (cur_picklist.value == 'primary_constituent' || cur_picklist.value == 'event_poc') {
		var picklists = YAHOO.util.Dom.getElementsBy(
			function(el) {
				if (el.id && el.id !=cur_picklist.id && el.value == cur_picklist.value) {
					return el.id.match(/^constituent_role_/);
				}
			},
			'select',
			document.getElementById('dnf_class_values_project__roles__widget'),
			function (el) {
				alert('There can only be one ' + el.options[el.selectedIndex].text + ' on a project.  Please select a different role for this constituent.');
				cur_picklist.selectedIndex = '0';
			}
		);
	}
}

function updateTemplateFilter(method_value) {
	var handleSuccess = function(o) {
		var template_select = document.getElementById('dnf_class_values_communication__template_');
		var current_choice = template_select.value;
		template_select.innerHTML = '';
			
		if (o.responseText) {
			var templates = YAHOO.lang.JSON.parse(o.responseText);
			default_template = templates['default'];
			templates = templates['templates'];
			use_current = false;
			use_default = false;
			for(var key in templates) {
				var new_option = document.createElement('option');
				new_option.value = key;
				new_option.text = templates[key];
				if (key == current_choice) {
					use_current = true;
				}
				if (key == default_template) {
					use_default = true;
				}
				try {
					template_select.add(new_option, null);
				} catch(ex) {
					template_select.add(new_option);
				}
			}

			if (use_current && current_choice) {
				template_select.value = current_choice;
			} else if (use_default && default_template) {
				template_select.value = default_template;
			}
		}
	}
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};

	var args = 'index.php?util=get_method_templates&method=' + method_value;
	YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

function removeConstituentFromProjectPopup(button_id) {
	if (YAHOO.util.Dom.getElementsByClassName('constituent_role_row').length > 1) {
		var constituent = document.getElementById(button_id.replace('_clear', '_row'));
		constituent.parentNode.removeChild(constituent);
	}	
}

function applyRoleToConstituents(role) {
	var picklists = YAHOO.util.Dom.getElementsBy(
		function(el) {
			if (el.id) {
				return el.id.match(/^constituent_role_/);
			}
		},
		'select',
		document.getElementById('dnf_class_values_project__roles__widget'),
		function(el) {
			el.value = role;
		}
	);
}

function createJSDate(date_val) {
	date_val = date_val.split('-');

	var js_date = new Date();
	js_date.setFullYear(Number(date_val[0]));
	js_date.setMonth(Number(date_val[1]) - 1);
	js_date.setDate(Number(date_val[2]));
	
	return js_date;
}

function updateProjectDueDate(num_days, start_date) {
	if (!start_date) {
		var start_date = document.getElementById('dnf_class_values_project__start_date__real').value;
	}
	var date_format = createJSDate(start_date);

	var end_date = document.getElementById('dnf_class_values_project__end_date__widget');
	num_days--;
	end_date.innerHTML = formatProjectDueDate(new Date(date_format.getTime() + num_days*24*60*60*1000));
}

function formatProjectDueDate(end_date) {
	var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	var formatted = m_names[end_date.getMonth()] + ' ' + end_date.getDate() + ', ' + end_date.getFullYear();
	return formatted;
}

function toggleContentDisplay(use_uploaded_content, content_field_id) {
	if (!content_field_id) {
		content_field_id = 'so_formfield_dnf_class_values_communication__content_';
	}
	
	var content = document.getElementById(content_field_id);
	var already_hidden = false;
	if (content.className.match(/tinymce_nodisplay_fix/)) {
		already_hidden = true;
	}

	if (use_uploaded_content == '1' && !already_hidden) {
		content.className += ' tinymce_nodisplay_fix';
	} else if (use_uploaded_content == '0' && already_hidden) {
		content.className = content.className.replace(/\btinymce_nodisplay_fix\b/, '');
	}
}

function checkZipFormat(zip) {
	if (zip.value.match(/^\d{5}(-\d{4})?$/)) {
		updateAddresFromZip(zip);
	} else if (zip.value) {
		alert('Please enter a valid U.S. zip code in the format xxxxx or xxxxx-xxxx.');
		zip.value = '';
	}
}


function updateGreetingTypeWording(project_type, from_webform) {
	if (!project_type) {
		project_type = document.getElementsByName('dnf_class_values[project][type]')[0].value;
	}
	
	var presidential_labels = new Array('Birthday', 'Wedding Anniversary ', 'Retirement');
	var congressional_labels = new Array('Birthday 80+', 'Wedding Anniversary 50 years or more', 'Retirement 30+');
	for (ii in presidential_labels) {
		var change_elem = getElementsByValue(presidential_labels[ii], 'option', document.getElementById('dnf_class_values_project__request_type_'));
		if (change_elem[0]) {
			if (project_type == 'congressional_greeting') {
				change_elem[0].innerHTML = congressional_labels[ii];
			} else if (project_type == 'presidential_greeting') {
				change_elem[0].innerHTML = presidential_labels[ii];
			}
		} else {
			var greeting_type = document.getElementById('dnf_class_values_project__request_type__widget');
			if (greeting_type && greeting_type.innerHTML.replace(/^\s*/, '').replace(/\s*$/, '') == presidential_labels[ii] && project_type == 'congressional_greeting') {
				greeting_type.innerHTML = congressional_labels[ii];
			}
		}
	}
	
	if (!from_webform) {
		filterTemplateOptions(project_type);
	}
}

function filterTemplateOptions(project_type) {
	if (!project_type) {
		project_type = document.getElementsByName('dnf_class_values[project][type]')[0].value;
	}

	if (project_type) {
		var handleSuccess = function(o) {
			if (o.responseText) {
				var options_obj = YAHOO.lang.JSON.parse(o.responseText);
				var template_list = document.getElementById('dnf_class_values_project__template_');
				if (template_list) {
					var keep_value = template_list.value;
					template_list.innerHTML = '';
					for (ii in options_obj) {
						var attribs = {value: ii, innerHTML: options_obj[ii]};
						if (keep_value && ii == keep_value) {
							attribs['selected'] = 1;
						}
						createElement('option', attribs, template_list);
					}
				}
			}
		}
		var handleFailure = function(o) {};
		var callback = {
			success: handleSuccess,
			failure: handleFailure
		};
		
		var args = 'index.php?util=get_templates_by_type&type=' + project_type;
		YAHOO.util.Connect.asyncRequest('GET', args, callback);
	}
}

function capitalizeName(elem, field_name) {
	if (elem.value) {
		var handleSuccess = function(o) {
			if (o.responseText) {
				elem.value = o.responseText;
				var update_onchange = String(elem.onchange);
				update_onchange = update_onchange.replace("capitalizeName(this, '" + field_name + "')", '');
				elem.setAttribute('onchange', update_onchange);
			}
		}
		var handleFailure = function(o) {};
		var callback = {
			success: handleSuccess,
			failure: handleFailure
		};

		var id = document.getElementsByName(elem.name.replace(field_name, 'constituent_id'));
		id = id[0].value;
		
		var args = 'index.php?util=object_exists&id=' + id + '&class=constituent&extra_func=cleanupNameJS&if_exists=0&extra_arg=' + elem.value;
		YAHOO.util.Connect.asyncRequest('GET', args, callback);
	}
}

function capitalizeNameSimple(elem) {
	if (elem.value) {
		var lower = elem.value.toLowerCase();
		var upper = elem.value.toUpperCase();
		
		if (elem.value == lower || elem.value == upper) {
			elem.value = elem.value.slice(0,1).toUpperCase() + elem.value.slice(1).toLowerCase();
		}
		
		var update_onchange = String(elem.onchange);
		update_onchange = update_onchange.replace("capitalizeNameSimple(this)", '');
		elem.setAttribute('onchange', update_onchange);
	}
}

function updateSubscribeDate(val) {
	var sub_label = document.getElementById('dnf_class_values_constituent__subscribe_date__field-label').childNodes[1];
	if (val == '1') {
		sub_label.innerHTML = 'Unsubscribe Date';
	} else {
		sub_label.innerHTML = 'Subscribe Date';
	}
	
	if (!document.getElementById('subscribe_date_undo')) {
		var sub_value = document.getElementById('dnf_class_values_constituent__subscribe_date__widget');
		var new_date = new Date();
		
		createElement('input', {type: 'button', id: 'subscribe_date_undo', value: 'Undo', onclick: "undoSubscriptionChange('" + YAHOO.lang.trim(sub_value.innerHTML) + "')"}, sub_value.parentNode);
		
		sub_value.style.display = 'inline';
		sub_value.innerHTML = formatProjectDueDate(new_date);
		
		createElement('input', {type: 'hidden', id: 'dnf_class_values_constituent__subscribe_date_', name: 'dnf_class_values[constituent][subscribe_date]', value: formatDateForSql(new_date) }, sub_value.parentNode);
	}
}

function undoSubscriptionChange(old_date) {
	var sub_value = document.getElementById('dnf_class_values_constituent__subscribe_date__widget');
	sub_value.innerHTML = old_date;
	sub_value.style.display = 'block';
	
	var sub_value_real = document.getElementById('dnf_class_values_constituent__subscribe_date_');
	if (old_date == '-') {
		sub_value_real.value = '';
	} else {
		sub_value_real.value = formatDateForSql(old_date);
	}
	
	sub_value.parentNode.removeChild(document.getElementById('subscribe_date_undo'));
}

function createElement(element_type, attributes, parent_elem, return_elem) {
	var new_element = document.createElement(element_type);
	for (attr in attributes) {
		if (attr == 'onclick') {	//add more to this condition as need arises
			new_element.setAttribute(attr, attributes[attr]);
		} else {
			new_element[attr] = attributes[attr];
		}
	}
	
	if (parent_elem && typeof(parent_elem) == 'object') {
		parent_elem.appendChild(new_element);
	} else {
		document.appendChild(new_element);
	}
	
	if (return_elem) {
		return new_element;
	}
}

function formatDateForSql(date_val) {
	var month = Number(date_val.getMonth()) + 1;
	if(month < 10) {
		month = String('0' + month);
	}
	
	var day = date_val.getDate();
	if(Number(day) < 10) {
		day = String('0' + day);
	}
	
	return date_val.getFullYear() + '-' + month + '-' + day;
}

function updateRankOptions(branch_elem) {
	var handleSuccess = function(o) {
		if (o.responseText) {
			var options_obj = YAHOO.lang.JSON.parse(o.responseText);
			var rank_id = branch_elem.id.replace('military_branch', 'military_rank');
			var rank_select = document.getElementById(rank_id);
			rank_select.innerHTML = '';
			for (ii in options_obj) {
				createElement('option', {value: ii, innerHTML: options_obj[ii]}, rank_select);
			}
		}
	}
	var handleFailure = function(o) {};
	var callback = {
		success: handleSuccess,
		failure: handleFailure
	};

	var args = 'index.php?util=get_rank_picks&branch=' + branch_elem.value;
	YAHOO.util.Connect.asyncRequest('GET', args, callback);
}

var update_member_panel = false;
function renderUpdateMemberPopup(object_id, form_template) {
	if (!update_member_panel) {
		update_member_panel = new YAHOO.widget.Panel("batcheditpanel",
			{
				width:'815px',
				close:true,
				visible:true,
				draggable:false,
				fixedcenter:'contained',
				constraintoviewport:true,
				underlay:'none'
			}
		);

		update_member_panel.setHeader('Update Group Member');
		update_member_panel.beforeShowEvent.subscribe(function() {
			update_member_panel.body.style.height = '500px';
			update_member_panel.body.style.overflow = 'auto';
		});
		update_member_panel.beforeHideEvent.subscribe(function() {
			update_member_panel.body.style.overflow = 'hidden';
		});
		update_member_panel.hideEvent.subscribe(function() {
			document.getElementById('formpanel_frame').src = '';
		});

		body = '<iframe id="formpanel_frame" style="width:99%; height:99%;"></iframe>';
		update_member_panel.setBody(body);
		update_member_panel.render();
	} else {
		update_member_panel.show();
	}
	document.getElementById('batcheditpanel').formpanel_panel = update_member_panel;
	document.getElementById('formpanel_frame').src = '?util=update_member&object_id=' + object_id + '&form_template=' + form_template;
}

function checkDateInput(elem) {
	if (elem.value) {
		var reg = /[^\d\-\.\/\\\s]/;
		var bad_input = false;
		var real_val_elem = document.getElementById(elem.id + '_real');
		
		if (elem.value.match(reg)) {
			bad_input = true;
		} else {
			elem.value = elem.value.replace(/[\.\/\\\s]+/g, '-');
			var date_parts = elem.value.split('-');
			if (date_parts.length != 3 || date_parts[0] > 12 || date_parts[0].length > 2 || date_parts[1].length > 2 || date_parts[2].length != 4) {
				bad_input = true;
			} else {
				if (date_parts[0].length == 1) {
					date_parts[0] = '0' + date_parts[0];
				}
				if (date_parts[1].length == 1) {
					date_parts[1] = '0' + date_parts[1];
				}

				if (date_parts[0] == '01' || date_parts[0] == '03' || date_parts[0] == '05' || date_parts[0] == '07' || date_parts[0] == '08' || date_parts[0] == '10' || date_parts[0] == '12') {
					var day_limit = '31';
				} else if (date_parts[0] == '02') {
					var day_limit = '29';
				} else {
					var day_limit = '30';
				}

				if (date_parts[1] > day_limit) {
					bad_input = true;
				}
			}
		}
		
		if (bad_input) {
			alert("Please enter a valid date in the format mm-dd-yyyy.");
			real_val_elem.value = elem.value = '';
			elem.focus();
		} else {
			real_val_elem.value = date_parts[2] + '-' + date_parts[0] + '-' + date_parts[1];
			elem.value = date_parts[0] + '-' + date_parts[1] + '-' + date_parts[2];
		}
	}
}