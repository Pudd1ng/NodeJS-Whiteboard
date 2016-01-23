$(function () {
    
    var url = 'http://localhost:8090';   
    var doc = $(document),
        win = $(window),
        canvas = $('#whiteboard');
        ctx = canvas[0].getContext('2d'),
        introduction = $('#introduction');
       

    var id = Math.floor(Math.random() * 999999)
    var clients = {};
    var cursors = {};
    var socket = io.connect(url);
    var drawing = false;
    
    socket.on('moving', function (socketdata) {
        
        if (!(socketdata.id in clients)) {
            cursors[socketdata.id] = $('<div class="cursor">').appendTo('#cursors');
        }

        // Move the mouse pointer
        cursors[socketdata.id].css({
            'left' : socketdata.x,
            'top' : socketdata.y
        });
        
        // Is the user drawing?
        if (socketdata.drawing && clients[socketdata.id]) {
            
            // Draw a line on the canvas. clients[socketdata.id] holds
            // the previous position of this user's mouse pointer
            
            drawLine(clients[socketdata.id].x, clients[socketdata.id].y, socketdata.x, socketdata.y);
        }
        
        // Saving the current client state
        clients[socketdata.id] = socketdata;
        clients[socketdata.id].updated = $.now();
    });
    
    var prev = {};
    
    canvas.on('mousedown', function (e) {
        e.preventDefault();
        drawing = true;
        prev.x = e.pageX;
        prev.y = e.pageY;
        
        // Hide the introduction
        introduction.fadeOut();
    });
    
    doc.bind('mouseup mouseleave', function () {
        drawing = false;
    });
    
    var lastEmit = $.now();
    
    doc.on('mousemove', function (e) {
        if ($.now() - lastEmit > 30) {
            socket.emit('mousemove', {
                'x': e.pageX,
                'y': e.pageY,
                'drawing': drawing,
                'id': id
            });
            lastEmit = $.now();
        }
        
        // Draw a line for the current user's movement, as it is
        // not received in the socket.on('moving') event above
        
        if (drawing) {
            
            drawLine(prev.x, prev.y, e.pageX, e.pageY);
            
            prev.x = e.pageX;
            prev.y = e.pageY;
        }
    });
    
    // Remove inactive clients after 10 seconds of inactivity
    setInterval(function () {
        
        for (ident in clients) {
            if ($.now() - clients[ident].updated > 10000) {
                
                // Last update was more than 10 seconds ago. 
                // This user has probably closed the page
                
                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            }
        }
		
    }, 10000);
    
    function drawLine(fromx, fromy, tox, toy) {
        ctx.moveTo(fromx, fromy);
        ctx.lineTo(tox, toy);
        ctx.stroke();
    }

});