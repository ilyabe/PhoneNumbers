$(document).ready(function(){
	//get the element object of search text field
	var e = $("input[id='mast']");
	var sa = $("input[name='mast-btn']");
	var btn = false;
	if(sa.length > 0){
		btn = true;
	} else {
		sa = $('.sa');
	}
	var s = "Search";
	//initilize the search text field
	e.val(s);
	$('#esri_searchbox input').addClass('init_css');
	//bind the onblur event to the function
	e.bind('blur', function(){
    	if($.trim($(this).val()) == ""){
			$(this).val(s);
			$(this).addClass('init_css');
		} 
	});
	//bind the onfcuse event to the function
	e.bind('focus', function(){
    	if($.trim($(this).val()) == s){
			$(this).val("");
			$(this).removeClass('init_css');
		} 
	});
	sa.bind('click', function(){
		if(e.val() == s ){
			return false;
		} 
		else {
			$('#esri_searchbox').submit();
		}
	});
});


