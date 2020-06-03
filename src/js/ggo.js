$(function () {
	var current = 0;
	var $pics = $('#picfade img');
	var max = $pics.length;
	function rotatePics () {
		$pics
			.eq((current - 1 + max) % max)
			.addClass('pic-previous')
			.siblings()
			.removeClass('pic-previous');
		$pics
			.eq(current)
			.addClass('pic-active')
			.siblings()
			.removeClass('pic-active');
		current = (current + 1) % max;
	}
	setInterval(rotatePics, 5000);
});

