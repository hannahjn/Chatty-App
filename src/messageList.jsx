import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  render() {
    // messageArray loops through the array of objects set in app.jsx and passes the values to variables.
    const messageArray = this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return <Message key={message.id} user = {message.username} content = {message.content} colour={message.clientColour}/>
      } else if (message.type === 'incomingNotification') {
        return <div key={message.id} className="notification"><span className="notification-content">{message.oldUsername} changed their name to {message.username}</span></div>
      }
    });
    return (
      <main className="messages">
        {messageArray}
      </main>)
  }
}

  
export default MessageList;