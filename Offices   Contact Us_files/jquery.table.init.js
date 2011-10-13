$(document).ready(function(){
	$(".comparisontable").each(function(){
		$("tbody tr:odd", this).addClass("odd");
		$("tbody tr:even", this).addClass("even");
	});
});