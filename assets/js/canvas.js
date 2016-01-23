(function () { 
	htmlCanvas = document.getElementById('whiteboard'),
	context = htmlCanvas.getContext('2d');
	initialize();

	function initialize() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}	

	function resizeCanvas() {
		htmlCanvas.width = window.innerWidth;
		htmlCanvas.height = window.innerHeight;
	}
})();