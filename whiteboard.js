var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    nstatic = require('node-static');

var fileServer = new nstatic.Server('./');

app.listen(8090);

function handler(request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}

io.set('log level', 1);

io.sockets.on('connection', function (socket) {
    socket.on('mousemove', function (data) {
        socket.broadcast.emit('moving', data);
    });
});