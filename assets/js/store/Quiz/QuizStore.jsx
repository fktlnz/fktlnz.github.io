/**
 * QuizStore.jsx
 *
 * Description:
 *   Store class for quiz page
 *
 * Author:
 *   @sota1235
 */

import _ from 'lodash';
import { EventEmitter2 } from 'eventemitter2';
import { getQuestion } from '../../lib/ajax.jsx';

export default class QuizStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.emitter = emitter;
    this.defaultQuiz = {
      title: '',
      choices: [
        {num: 'A', text: '', img: '', style: {}, color: { top: '#00B7EF', bottom: 'blue'}},
        {num: 'B', text: '', img: '', style: {}, color: { top: '#FDABAB', bottom: 'red'}},
        {num: 'C', text: '', img: '', style: {}, color: { top: '#6DFF7C', bottom: 'green'}},
        {num: 'D', text: '', img: '', style: {}, color: { top: '#FAFF00', bottom: '#FFE000'}}
      ]
    };
    this.quiz    = _.clone(this.defaultQuiz, true);
    this.mapQuiz = this.mapQuiz.bind(this);
    // events
    emitter.on('displayQuiz',    this.onDisplayQuestion.bind(this));
    emitter.on('displayQuizChoices',this.onDisplayChoices.bind(this));
    emitter.on('openAnswer',     this.onAnswerOpen.bind(this));
    emitter.on('finishQuestion', this.onFinishQuestion.bind(this));
  }
  // getter for components
  getQuiz() {
    return this.quiz;
  }
  // display question
  onDisplayQuestion(id) {
    getQuestion(id)
      .then( result => {
        console.log(`get question id: ${id}`);
        return result;
      })
      .then(this.mapQuiz);
  }
  // display 4choices
  onDisplayChoices(id) {
    getQuestion(id)
      .then( result => {
        console.log(`get question id: ${id}`);
        return result;
      })
      .then(this.mapChoices);
  }
  // answer aalignment
  onAnswerOpen(index) {
    this.quiz.choices[Number(index)].style = {
      backgroundColor: 'yellow' // TODO: 正解演出CSS
    }
    this.updateChoices();
  }
  // finish quiz
  onFinishQuestion() {
    this.quiz = _.clone(this.defaultQuiz, true);
    this.updateQuiz();
    this.updateChoices();
  }
  // mapping data to quiz
  mapQuiz(data) {
    this.quiz.title   = data[0].text;
    this.quiz.choices = this.quiz.choices.map((q, i) => {
      q.text  = data[0].choice[i].text;
      q.img   = data[0].choice[i].imgPath;
      q.style = {};
      return q;
    });
    this.updateQuiz();
  }

  // mapping data to quiz
  mapChoices(data) {
    this.quiz.title   = data[0].text;
    this.quiz.choices = this.quiz.choices.map((q, i) => {
      q.text  = data[0].choice[i].text;
      q.img   = data[0].choice[i].imgPath;
      q.style = {};
      return q;
    });
    this.updateChoices();
  }

  // TODO: private
  updateQuiz() {
    console.log('quizStatementChanged')
    this.emit('quizStatementChanged');
  }

  updateChoices() {
    this.emit('quizChoicesChanged');
  }

}
