import React, {Component} from 'react';
// message is a child of messageList
class Message extends Component {
  render() {
    return (
      <div className="message">
        <span className="message-username" style={{color:this.props.colour}}>{this.props.user} </span>
        <span className="message-content">{this.props.content}</span>
      </div>
     
    )
  }
 
}
export default Message;

