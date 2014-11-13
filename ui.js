var video = $('video')[0];
var clock = $('#clock');

$('.picholder').click(function() {
	$('#movieList').fadeOut(function () {
		$('#mainContainer').fadeIn();
	});
});

$('#backToMovies').click(function () {
	$('#mainContainer').fadeOut(function () {
		$('#movieList').fadeIn();
	});
});

$('#graph').mousemove(function (e){
	var xPosition = e.clientX;
    var yPosition = e.clientY;
    var elementW = graph.getAttribute("width");
    var graphW = elementW - margin.left - margin.right;
    if (xPosition >= margin.left && xPosition <= elementW - margin.right) {
    	var relativeX = xPosition - margin.left
    	var proportion = relativeX/graphW;
    	var time = video.duration * proportion;
    	var hrs = Math.floor(time / 3600);
    	time -= (hrs*3600);
    	var min = Math.floor(time / 60);
    	time -= (min*60);
    	var sec = Math.floor(time);
    	var time = hrs + ":" + min + ":" + sec;
    	clock.text(time);
    }
});
