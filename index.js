$(document).ready(function() {
	var graph = document.getElementById("graph")
	var video = document.getElementById("video1")

	graph.addEventListener("click", getClickPosition, false);
	function getClickPosition(e) {
	    var xPosition = e.clientX;
	    var yPosition = e.clientY;
	    var elementW = graph.getAttribute("width");
	    var graphW = elementW - margin.left - margin.right;
	    if (xPosition >= margin.left && xPosition <= elementW - margin.right) {
	    	var relativeX = xPosition - margin.left
	    	var proportion = relativeX/graphW
	    	console.log("RelativeX: " + relativeX);
	    	console.log("Proportion: " + proportion)
	    	$("#overlayDiv").fadeToggle()
	    	$("#videoDiv").fadeToggle()
	    	jumpToTime(proportion);
	    }
	}

	function jumpToTime(proportion){
		video.currentTime = proportion * video.duration;
	}

	$("#videoDiv").click(function(){
		video.pause();
		$("#overlayDiv").fadeOut()
		$("#videoDiv").fadeOut()
		queue = [];
	});

});
