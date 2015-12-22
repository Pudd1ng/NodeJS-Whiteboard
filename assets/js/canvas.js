(function () { 
	htmlCanvas = document.getElementById('whiteboard'),
	context = htmlCanvas.getContext('2d');
	initialize();

	function initialize() {
		window.addEventListener('resize', resizeCanvas, false);
		resizeCanvas();
	}
	
	function redraw() {
		context.strokestyle = 'black';
		context.lineWidth = '2';
		context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
	}

	function resizeCanvas() {
		htmlCanvas.width = window.innerWidth;
		htmlCanvas.height = window.innerHeight;
		redraw();
	}
	//this function aims to resize the canvas whenever the window size is adjusted
})();