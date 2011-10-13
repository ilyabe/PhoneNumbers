$(document).ready(function(){
	$(".tooltip_left").tooltip({
		position: 'top left', 
		effect:'toggle',
		relative: true,
		lazy: true,
		tip:'.tooltip_hidden',
		delay:500
	});
	$(".tooltip_right").tooltip({
		position: 'top right', 
		effect:'toggle',
		relative: true,
		lazy: true,
		tip:'.tooltip_hidden',
		delay:500
	});
	$(".tooltip_down_left").tooltip({
		position: 'bottom left', 
		effect:'toggle',
		relative: true,
		lazy: true,
		tip:'.tooltip_hidden',
		delay:500
	});
	$(".tooltip_down_right").tooltip({
		position: 'bottom right', 
		effect:'toggle',
		relative: true,
		lazy: true,
		tip:'.tooltip_hidden',
		delay:500
	});
	$(".tooltip_middle_right").tooltip({
		position: 'center right', 
		effect:'toggle',
		relative: true,
		lazy: true,
		tip:'.tooltip_hidden',
		delay:100
	});
});