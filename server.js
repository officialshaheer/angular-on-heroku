const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/dist/angular-on-heroku'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/angular-on-heroku/index.html'));});

const tracks = [];

io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('sendOrientationData',(data) => {
      console.log(data);
      io.emit('sendOrientationDataToAll', data);
    })

    //Send server tracks to user
    io.emit('initialLoadAllTracks',tracks);

    //Send an updated copy of server tracks when a new user joins
    socket.broadcast.emit('initialBroadcastAllTracks',tracks);

    
    socket.on('sendTrack',(data) => {

        tracks.push(data);

        //Send updated tracks to myself
        io.emit('sendToMe',tracks);

        //Send updated tracks to all clients
        socket.broadcast.emit('allTracks',tracks);
        // io.emit('sendtoall', pageHits);
    })

    socket.on('disconnect', () => {
		io.emit('disconnectionstatus','User disconnected!');
	});

});

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening on port 3000")
});