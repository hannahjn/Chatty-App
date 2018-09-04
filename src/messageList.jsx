import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  render() {
    const messageArray = this.props.messages.map((message) => 
      <Message user = {message.username} content = {message.content}/>
      
    )
      return (
        <main className="messages">
        {messageArray}
        <div className="message system">
          Anonymous1 changed their name to nomnom.
        </div>
      </main>
      )

  }
}
export default MessageList;