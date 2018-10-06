/**
 * QuizImageComponent.jsx
 *
 * Description:
 *   React Component for image on quiz page
 *
 * Author:
 *   @sota1235
 */
'use strict';
/*
import {
  ListGroup, ListGroupItem, Panel,
  ButtonToolbar, Input, Table,
  Grid, Row, Col
} from 'react-bootstrap';
*/

import React             from 'react';
import { EventEmitter2 } from 'eventemitter2';
import { getImage }      from '../../lib/ajax.jsx';
import QuizAction  from '../../action/Quiz/QuizAction.jsx';
import SoundAction from '../../action/Quiz/SoundAction.jsx';
import VoteStore   from '../../store/Quiz/VoteStore.jsx';

var socket    = io();
var emitter   = new EventEmitter2();
var Component = React.Component;
var Action    = new QuizAction(emitter, socket);
var Sound     = new SoundAction(emitter);
var voteStore = new VoteStore(emitter);

/* React components */
export default class QuizDispCorrectPersonComponent extends Component {
  constructor(props) {
    super(props);    
    this.IsCalced = false;
    this.state = { 
      imgPath:      '' ,
      seikaiPerson: []
    };
    
    this.style = {
      float           : 'left',
      margin          : '10px right',
      padding         : '10px',
      width           : '60px',
      height          : '60px',
      backgroundColor : '#EF5F5D',
      color           : '#fff',
      position        : 'relative',           
      border          : 'solid #03C100',
      borderWidth     : '2px',
      borderRadius    : '20px',
      textAlign       : 'center'
    };
    this.imgStyle = {
      maxHeight : '540px',
      maxWidth  : '960px'
    };

    this.loadCorrectPerson = this.loadCorrectPerson.bind(this);
    voteStore.on('calcedCorrectPerson', this.loadCorrectPerson);    
  }
  componentWillMount() {  
    let seikaiPerson= voteStore.getSeikaiPerson();   
    this.setState({
      seikaiPerson: seikaiPerson
    });
  }

  componentWillUnmount() {
    voteStore.off('calcedCorrectPerson', this.loadCorrectPerson);    
  }

  loadCorrectPerson() {
    this.IsCalced = true;
    console.log(this.IsCalced);
    console.log('loadcorrectPerson Start!!');
    let seikaiPerson= voteStore.getSeikaiPerson();
    console.log(seikaiPerson)
    
    this.setState({
      seikaiPerson : seikaiPerson
    });
    
  }

  /*
  componentWillReceiveProps(nextProps) {
    getImage(nextProps.params.id)
      .then( result => {
        this.setState({ imgPath: result[0].fileName });
      });
  }
  */
  
  render() {
    return (
        
      <div >        
      <ul> 
        <li className="displayitem_fst" > 
          <img src={`/img/1.png`} style={{height: "70px", float: 'left'}}/>
          {this.state.seikaiPerson[0]}
        </li>
      </ul>
      <ul >
        <li className="displayitem_snd" >  
        <img src={`/img/2.png`} style={{height: "55px", float: 'left'}}/>
        {this.state.seikaiPerson[1]}</li> 
      </ul>
      <ul >
        <li className="displayitem_thd" >  
        <img src={`/img/3.png`} style={{height: "40px", float: 'left'}}/>
        {this.state.seikaiPerson[2]}</li>
      </ul>
      <ul >
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[3]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[4]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[5]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[6]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[7]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[8]}</li>
      
        <li className="displayitem" >  
        <img src={`/img/crown.png`} style={{height: "35px", float: 'left'}}/>
        {this.state.seikaiPerson[9]}</li>
      </ul>

      </div>
    );
  }
}
