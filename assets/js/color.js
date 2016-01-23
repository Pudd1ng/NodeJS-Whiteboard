function colorChange(color) {
    var c = document.getElementById('whiteboard');
    var ctx = c.getContext("2d");
    ctx.fillStyle = color;
}