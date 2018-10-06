/**
 * IndexApp.jsx
 *
 * Description:
 *   jsx file for user page
 *
 * Author:
 *   @sot1235
 */

import $ from 'jquery';

var socket = io();

$(() => {
  /* Functions */
  // validate comment
  var validateComment = comment => {
    if(comment.length > 20) {
      return false;
    }
    return true;
  };
  // assert validation error of comment
  var commentValidateError = () => {
    var $selector = $('.comment-form .err-space');
    $selector.text('コメントの文字数は20文字以内でお願いします...(´・ω・｀)');
    setTimeout(() => {
      $selector.fadeOut('slow', () => {
        $selector.text('');
        $selector.fadeIn('slow');
      });
    }, 3000);
  };

  /* Event listners */
  // send vote
  $('.choice-form button').on('click', function(event) {
    event.preventDefault();
    let target = $(this).val();
    let username = $('.userid textarea')[0].value;

    var voteData = [target,username];
    console.log(voteData);
    console.log(`send quiz vote for ${voteData}`);
    //window.confirm(`投票を受け付けました: ${voteData}\nそのままお待ちください！！`);
    $('.message-text').text(`${target}番で投票を受け付けました！！！ `);
    socket.emit('vote', voteData);
  });
  // button tap
  $('.choice-form button')
    .bind('touchstart', () => {


      
      $(this).addClass('touch');
    })
    .bind('touchend', () => {
      $(this).removeClass('touch');
    });
  // send comment
  $('.comment-form button').on('click', (event) => {
    event.preventDefault();
    var text = $('.comment-form textarea')[0].value;
    if(!validateComment(text)) {
      commentValidateError();
      return;
    }
    console.log('send comment');
    socket.emit('comment', text);
    $('.comment-form textarea')[0].value = '';
  });
  /* Socket listner */
  socket.on('question-open', function(text) {
    $('.question-text').text(text);
  });
  socket.on('question-finish', function() {
    $('.question-text').text('');
    $('.message-text').text('');
  });
});
