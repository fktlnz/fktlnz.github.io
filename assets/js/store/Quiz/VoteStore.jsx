/**
 * VoteStore.jsx
 *
 * Description:
 *   Store class for quiz page.
 *   This class manages voet number.
 *
 * Author:
 *   @sota1235
 */

import { EventEmitter2 } from 'eventemitter2';
import _                 from 'lodash';

export default class QuizStore extends EventEmitter2 {
  constructor(emitter) {
    super();
    this.dt = new Date();
    this.srcTime = this.dt.getTime()/1000;
    this.number_name = new Array();
    this.number_name_seikai = new Array();
    this.name_vote = new Object();
    this.emitter    = emitter;
    this.EVENT_NAME = 'voteChanged';
    this.updateVote = true;
    this.votes = {
      number:   [0, 0, 0, 0],
      disabled: true
    };
    // events
    emitter.on('displayCorrectPerson',       this.calcSeikaiPerson.bind(this));
    emitter.on('voteQuiz',       this.countUp.bind(this));
    emitter.on('answerCheck',    this.showVoteNum.bind(this));
    emitter.on('finishQuestion', this.reset.bind(this));
    //emitter.on('openAnswer', this.pickCorrectPerson.bind(this));
  }
  // getter for components
  getVotes() {
    return this.votes;
  }

  // getter for calcSeikaiPerson and emit 'calcedCorrectPerson'
  calcSeikaiPerson(index){
    this.pickCorrectPerson(index);
    console.log('calcedCorrectPerson EMIT!!!');
    this.emit('calcedCorrectPerson');
  }

  // getter for number_name_seikai
  getSeikaiPerson(){
    console.log('getSeikaiPerson')
    return this.number_name_seikai;
  }
  // show votes
  showVoteNum() {
    this.votes.disabled = false;
    this.updateVote     = false;
    this.emit(this.EVENT_NAME);
  }
  // count up vote number
  countUp(index) {
    if (!this.updateVote) {
      return;
    }

    this.number_name.push(index[0]+index[1]);
    console.log('number_name_All: ' + this.number_name);

    //var dstTime = new Date();
    //this.name_date[dstTime.getTime()/1000 - this.srcTime] = index[1];    
    //console.log(this.name_date);
    this.name_vote[index[1]]=index[0];
    //console.log(this.name_vote);
    this.votes.number[index[0]-1]++;
    //console.log(this.votes.number);
    this.emit(this.EVENT_NAME);

  }

  //number_nameオブジェクトから正解者を抽出
  pickCorrectPerson(index){    
    console.log('pickCorrectPerson START!!')
    console.log(`正解番号:`+ Number(index))
    for(var step = 0;step<this.number_name.length;step++){
      var voteNum = this.number_name[step].slice(0,1);
      console.log(voteNum);
      var name = this.number_name[step].slice(1,this.number_name[step].length);
      console.log(name);
      if(Number(voteNum) === Number(index)){
          this.number_name_seikai.push(name);
      }
    }

    console.log('number_name_seikai: '+ this.number_name_seikai);
  }

  // reset data
  reset() {
    this.number_name_seikai = [];
    this.number_name = [];
    console.log('reset number_name');
    
    this.updateVote = true;
    this.votes = {
      number: [0, 0, 0, 0],
      disabled: true
    };
    this.emit(this.EVENT_NAME);
  }
}
