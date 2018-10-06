/**
 * io.js
 *
 * Description:
 *  file for WebSocket
 *
 * Author:
 *  sota1235
 */

var socket = require('socket.io');

module.exports = function(server) {
  var io = socket.listen(server);

  io.on('connection', function(socket) {
    console.log('a user connected');

    // send comment
    socket.on('comment', function(msg) {
      console.log('comment: ' + msg);
      io.emit('comment', msg);
    });
    // send vote for choices of quiz
    socket.on('vote', function(msg) {
      console.log('vote: ' + msg);
      io.emit('vote', msg);
    });
    // display quiz
    socket.on('open', function(id, text) {
      console.log('open: ' + id + '@io.js');
      io.emit('open', id);
      io.emit('question-open', text); // index page
    });
    // display quiz
    socket.on('openChoices', function(id, text) {
      console.log('openChoices: ' + id + '@io.js');
      io.emit('openChoices', id);
      //io.emit('question-open', text); // index page
    });
    // answer check (count vote)
    socket.on('answerCheck', function(msg) {
      console.log('answer check!'+ '@io.js');
      io.emit('answerCheck');
    });
    // show answer
    socket.on('openAnswer', function(msg) {
      console.log('open answer: ' + (msg + 1)+ '@io.js');
      io.emit('openAnswer', msg);
    });
    // display CorerctAnswer
    socket.on('display', function(msg) {
      console.log('displayCorrectPerson!!@io.js'+ (msg + 1));
      io.emit('display',msg);      
    });
    // display Title
    socket.on('title', function(msg) {
      console.log('setTitleScreen!!@io.js');
      io.emit('title');      
    });
    // hide quiz
    socket.on('finish', function(msg) {
      console.log('finish quiz'+ '@io.js');
      io.emit('finish');
      io.emit('question-finish'); // index page
    });
    // quiz timer finish
    socket.on('timerFinish', function(msg) {
      console.log('exit time limit of quiz'+ '@io.js');
      io.emit('timerFinish');
    });
    // publish image events
    socket.on('imageEvent', function(msg) {
      console.log('send image event: ' + JSON.stringify(msg)+ '@io.js');
      io.emit('imageEvent', msg);
    });
  });
};
