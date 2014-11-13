var video = $('video')[0];
var clock = $('#clock');
var queue = [];

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

$('#happyButton').click(function (){
	$("#overlayDiv").fadeIn();
	$("#videoDiv").fadeIn(function (){
		queue = positiveScenes.slice(0);

		function process(){
			if (queue.length < 1) return;
			var curr = queue.splice(0, 1)[0];
			video.currentTime = curr.start - 8;
			video.play();
			var diff = curr.end - curr.start + 1;
			console.log(curr.text, curr.start);
			setTimeout(function (){
				process();
				if (queue.length <= 1) video.pause();
			}, diff * 1000 + 2000);
		}

		process();
	});
});

$('#sadButton').click(function (){
	$("#overlayDiv").fadeIn();
	$("#videoDiv").fadeIn(function (){
		queue = negativeScenes.slice(0);

		function process(){
			if (queue.length < 1) return;
			var curr = queue.splice(0, 1)[0];
			video.currentTime = curr.start - 8;
			video.play();
			var diff = curr.end - curr.start + 1;
			console.log(curr.text, curr.start);
			setTimeout(function (){
				process();
				if (queue.length <= 1) video.pause();
			}, diff * 1000 + 2000);
		}

		process();
	});
});
