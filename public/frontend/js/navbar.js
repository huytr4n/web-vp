$(document).ready(function () {
	// slider
	$('.bxslider').bxSlider({
		'mode' : 'fade',
		'speed' : 1000,
		'auto' : true
	});
	// navbar menu hover
	var navbarState = false;
	$('.navbar-header-menu').on('click', function () {
		if (navbarState === true) {
			$('.navbar-collapse-menu').attr("hidden", "hidden");
			navbarState = false;
		} else {
			$('.navbar-collapse-menu').removeAttr("hidden");
			navbarState = true;
		}		
	});
});