var iphone = (navigator.userAgent.toLowerCase().indexOf('iphone') != -1);

if ($('#picfade') && !iphone) {

	var iImgs = 5;
	//var iCurr = 0;
	var iFTime = 0.5 * 1000;
	var iPTime = 5 * 1000;

	function doFade() {
		$('#picfade img').eq(iImgs - 1).animate({opacity: 0}, iFTime, 'easeOutQuad', function(){
			//iCurr = iCurr + 1;
			$(this).remove();
			$(this).prependTo('#picfade');
			$(this).css('opacity', 1);
		});
	}

	$('#picfade img').remove();

	for (i = 0; i < iImgs; i++) {
		var oImg = document.createElement('img');
		var s = i + 1;
		//if (s < 10) {
		//	s = "0" + s;
		//} else {
		//	var s = "" + s;
		//}
		$(oImg).attr('src', 'images/stack' + s + '.jpg');
		$(oImg).prependTo('#picfade');
		//$(oImg).css('z-index', iImgs - i);
	}

	var iInt = setInterval(doFade, iPTime);

}
