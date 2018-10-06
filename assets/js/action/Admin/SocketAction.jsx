/**
 * SocketAction.jsx
 *
 * Description:
 *   Action file for connectiong WebSocket
 *
 * Author:
 *   @sota1235
 */

export default class SocketAction {
  constructor(socket) {
    this.socket  = socket;
  }
  exitTimeLimit() {
    console.log('exit time limit of quiz');
    this.socket.emit('timerFinish');
  }
  broadcastQuestion(id, text) {
    console.log('broadcastQuestion@SocektAction');
    this.socket.emit('open', id, text);
  }
  broadcastChoices(id, text) {
    console.log('broadcastChoices@SocektAction');
    this.socket.emit('openChoices', id, text);
  }
  openCorrectPerson(index){
    console.log('openCorrectPerson@SocektAction');
    console.log(index);
    this.socket.emit('display', index);
  }
  setTitleScreen(){
    console.log('setTitleScreen@SocektAction');    
    this.socket.emit('title');
  }
  answerCheck() {
    this.socket.emit('answerCheck');
  }
  openAnswer(index) {
    this.socket.emit('openAnswer', index - 1);
  }
  finishQuestion() {
    this.socket.emit('finish');
  }
  sendImgEvent(type, id) {
    this.socket.emit('imageEvent', { type: type, id: id });
    console.log(`SocketAction ${type}`);
  }
}
