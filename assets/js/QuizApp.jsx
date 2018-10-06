/**
 * QuizApp.jsx
 *
 * Description:
 *   jsx file for quiz page
 *
 * Author:
 *   @sot1235
 */

import { Router, Route, Link } from 'react-router';
import { render }              from 'react-dom';
import React                   from 'react';
import $                       from 'jquery';

import QuizTitleComponent from './components/Quiz/QuizTitleComponent.jsx';
import QuizImageComponent from './components/Quiz/QuizImageComponent.jsx';
import QuizComponent      from './components/Quiz/QuizComponent.jsx';
import Comment            from './lib/comments.jsx';
import QuizDispCorrectPersonComponent from './components/Quiz/QuizDispCorrectPersonComponent';
import QuizStatementComponent from './components/Quiz/QuizStatementComponent';

var socket = io();

/* React rendering */
render((
  <Router>
    <Route path='/'         component={QuizTitleComponent}/>
    <Route path='image/:id' component={QuizImageComponent}/>
    <Route path='quiz'      component={QuizComponent}/>
    <Route path='/quizstatement' component={QuizStatementComponent}/>
    <Route path='/display'   component={QuizDispCorrectPersonComponent}/>
  </Router>
),  document.getElementById('answers'));

$(() => {
  /* Socket.io events */
  socket.on('comment', (msg) => {
    console.log('comment: ' + msg);
    var comment = new Comment(msg);
    comment.run();
  });
  // Dynamic routing
  socket.on('display', () => location.hash = '#/display');
  socket.on('open',   () => location.hash = '#/quizstatement');
  socket.on('openChoices', () => location.hash = '#/quiz');
  socket.on('finish', () => location.hash = '#/');
  socket.on('imageEvent', (msg) => {
    if(msg.type === 'open') {
      location.href = `#/image/${msg.id}`;
    } else if(msg.type === 'close') {
      location.href = '#/';
    }
  });
});
