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