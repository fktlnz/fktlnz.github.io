/**
 * QuizComponent.jsx
 *
 * Description:
 *   React Component for quiz
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
import { EventEmitter2 } from 'eventemitter2';

import QuizAction  from '../../action/Quiz/QuizAction.jsx';
import SoundAction from '../../action/Quiz/SoundAction.jsx';
import QuizStore   from '../../store/Quiz/QuizStore.jsx';
import VoteStore   from '../../store/Quiz/VoteStore.jsx';
import { getQuestion } from '../../lib/ajax.jsx';

import TimerComponent from '../TimerComponent.jsx';
import ChoiceDisplay  from './QuizChoice.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Sound     = new SoundAction(emitter);
var quizStore = new QuizStore(emitter);
var voteStore = new VoteStore(emitter);

/* React components */
export default class QuizStatementComponent extends Component {
  constructor(props) {
    super(props);
    this.loadQuizStatement = this.loadQuizStatement.bind(this);
    this.loadVote = this.loadVote.bind(this);
    quizStore.on('quizStatementChanged', this.loadQuizStatement);
    //voteStore.on('voteChanged', this.loadVote);
  }

  componentWillMount() {
    let quiz = quizStore.getQuiz();
    this.setState({
      title:   quiz.title,
      choices: quiz.choices,
      //votes:   voteStore.getVotes()
    });
  }

  componentWillUnmount() {
    quizStore.off('quizStatementChanged', this.loadQuizStatement);
    //voteStore.off('voteChanged', this.loadVote);
  }

  loadQuizStatement() {
    console.log('start loadquizStatement');
    let quiz = quizStore.getQuiz();
    this.setState({
      title:   quiz.title,
      //choices: quiz.choices
    });
  }

  loadVote() {
    this.setState({ votes: voteStore.getVotes() });
  }

  render() {
    return (
      <div className="quizComponent container">
        <QuizTitle title={this.state.title} />        
      </div>
    );
  }
}

class QuizTitle extends Component {
  render() {
    return (
      <div className="quizTitle">
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}