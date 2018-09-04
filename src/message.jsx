import React, {Component} from 'react';
// message is a child of messageList
class Message extends Component {
  render() {
    return (
      <div className="message">
      {/* values from const messageArray in messageList */}
        <span className="message-username">{this.props.user}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
     
    )
  }
 
}
export default Message;

