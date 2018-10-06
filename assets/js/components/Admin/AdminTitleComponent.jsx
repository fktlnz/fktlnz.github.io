/**
 * AdminImagesComponent.jsx
 *
 * Description:
 *   React Component for showing controll panel of images on admin page
 *
 * Author:
 *   @sota1235
 */
'use strict';

import React from 'react';
// react bootstrap
import {
  ListGroup, ListGroupItem, ButtonToolbar, Button
} from 'react-bootstrap';

let Component = React.Component;

export default class AdminTitleComponent extends Component {
  render() {
    let that = this;    
    let imgNodes = this.props.images.map( (image, index) => {
    //let imgNodes = (index) => {
      if(index==0){
        return (
          <CorrectTitleItem key={index} image={image} actions={that.props.actions}/>
        );
      }
    });

    //let imgNodes = this.props.images;
    console.log('this.props.images');
    console.log(this.props.images);
    console.log('imgNodes');
    console.log(imgNodes);
    console.log('admintitle');
    console.log(this.props.images);
    return (
      <ListGroup>
        {imgNodes}
        <UploadImg />
      </ListGroup>
    );

  }
}


class CorrectTitleItem extends Component {
  constructor(props) {
    super(props);
    this.imgStyle = { height: "50px" };
  }

  render() {
    let info = this.props.image
    console.log('info')
    console.log(info)
    console.log(this.props.image)
    return (
      <ListGroupItem>
        <div className="media">
          <div className="media-body">
            <h4>{/*TODO: info.imgName*/}タイトルを表示</h4>
            <DisplayButtons id={info._id} actions={this.props.actions}/>
          </div>
          <div className="media-right">
            <img className="media-object" src={`/uploads/${info.fileName}`} style={this.imgStyle} />
          </div>
        </div>
      </ListGroupItem>
    );
  }
}




class DisplayButtons extends Component {
  constructor(props) {
    super(props);
    this.onDisplayClick   = this.onDisplayClick.bind(this);
    this.onFinishClick = this.onFinishClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  onDisplayClick() {
    console.log('click!setTitleScreen');
    this.props.actions.socket.sendImgEvent('open', this.props.id); 
    this.props.actions.socket.setTitleScreen();
  }
  onFinishClick() {
    this.props.actions.socket.sendImgEvent('close');
  }
  onDeleteClick() {
    this.props.actions.image.deleteAction(this.props.id);
    console.log('this.props.id');
    console.log(this.props.id);    
  }
  render() {
    return (
      <ButtonToolbar>
        <Button bsStyle="info"    onClick={this.onDisplayClick}  >表示</Button> 
        <Button bsStyle="warning" onClick={this.onFinishClick}   >終了</Button> 
        <Button bsStyle="danger"  onClick={this.onDeleteClick}>削除</Button>
      </ButtonToolbar>
    );
  }
}

class UploadImg extends Component {
  render() {
    return (
      <ListGroupItem>
        <form action="/upload/img" encType="multipart/form-data" method="POST">
          <input type="file" name="normalImg" />
          <input type="submit" />
        </form>
      </ListGroupItem>
    );
  }
}

