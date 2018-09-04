import React, {Component} from 'react';
import Message from './message.jsx';

class MessageList extends Component {
  render() {
    // messageArray loops through the array of objects set in app.jsx and passes the values to variables.
    const messageArray = this.props.messages.map((message) => 
      <Message key={message.id} user = {message.username} content = {message.content}/>
      
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