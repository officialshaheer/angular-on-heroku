const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/dist/angular-on-heroku'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/angular-on-heroku/index.html'));});

let pageHits = 0;
const tracks = [];

io.on('connection', function (socket) {
    console.log('A user connected');
    pageHits++
    socket.emit('test event',pageHits);

    socket.broadcast.emit('trackName',pageHits);

    
    socket.on('sendTrack',(data) => {

        tracks.push(data);

        socket.broadcast.emit('recievingTrackFromUser',tracks);
        // io.emit('sendtoall', pageHits);
    })

    socket.on('disconnect', () => {
		io.emit('disconnectionstatus','User disconnected!');
	});

});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000")
});