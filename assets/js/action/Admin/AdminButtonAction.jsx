/**
 * AdminButtonAction.jsx
 *
 * Description:
 *   Action file for buttons on admin page
 *
 * Author:
 *   @sota1235
 */

export default class AdminButtonAction {
  constructor(emitter) {
    this.emitter = emitter;
  }
  openQuestionButton() {
    console.log('openQuestionButton@buttonaction');
    this.emitter.emit('openQuestion');
  }
  openChoicesButton() {
    console.log('openChoicesButton@buttonaction');
    this.emitter.emit('openChoices');
  }
  answerCheckButton() {
    this.emitter.emit('answerCheck');
  }
  openAnswerButton() {
    this.emitter.emit('openAnswer');
  }
  finishButton() {
    this.emitter.emit('standbyQuestion');
  }
}
