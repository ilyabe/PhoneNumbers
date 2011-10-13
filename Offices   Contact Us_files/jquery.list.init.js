$(document).ready(function(){
	$(".listbox li").each(function(i){
		i = i+1;
		if(i==1){
			$(this).addClass('first');		
		}
		$(this).prepend('<span class="commentnumber">'+ i +'.</span>');
	});
});