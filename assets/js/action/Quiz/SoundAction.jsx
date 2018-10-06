/**
 * SoundAction.jsx
 *
 * Description:
 *   Action file for web audio API.
 *
 * Author:
 *   @sota1235
 */

import Audio from '../../lib/audio.jsx';

export default class SoundAction {
  constructor(emitter) {
    this.emitter = emitter;
    // sound instance
    this.startSound       = new Audio('/sounds/start.mp3');
    this.quizSound        = new Audio('/sounds/quiz_sound.mp3');
    this.answerCheckSound = new Audio('/sounds/answer_check.mp3');
    this.openAnswerSound  = new Audio('/sounds/open_answer.mp3');
    this.openCorrectPersonSound  = new Audio('/sounds/displayca.mp3');
    this.startTitleSound = new Audio('/sounds/startTitle.mp3');
    // events from server
    this.emitter.on('start_sound',        this.playStartSound.bind(this));
    this.emitter.on('quiz_sound',        this.playQuizSound.bind(this));
    this.emitter.on('answer_check_sound', this.playAnswerCheckSound.bind(this));
    this.emitter.on('open_answer_sound',  this.playOpenAnswerSound.bind(this));
    this.emitter.on('display_sound',  this.playOpenCorrectPersonSound.bind(this));
    this.emitter.on('title_sound',  this.playTitleSound.bind(this));
  }

  playTitleSound() {    
    this.startTitleSound.play();
  }
  playQuizSound() {
    this.startTitleSound.stop();
    this.quizSound.play();
  }
  playStartSound() {
    this.quizSound.stop();
    this.startSound.play();
  }  
  playAnswerCheckSound() {
    this.startSound.stop();
    this.answerCheckSound.play();
  }
  playOpenAnswerSound() {
    this.answerCheckSound.stop();
    this.openAnswerSound.play();
  }
  playOpenCorrectPersonSound() {
    this.openAnswerSound.stop();
    this.openCorrectPersonSound.play();
  }
  
}
