import React, {Component} from 'react';

class Chatbar extends Component {
  
  // if the enter key is pressed, assign new message prop the value of message input
  onEnterPress = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target.value;
        this.props.newMessage(messageInput);
      }
    }
  // if the enter key is pressed, assign username prop the value of username input
  editUsername = (e) => {
    console.log(e.key);
    if (e.key === 'Enter' || e.key === 'Tab') {
        const username = e.target.value;
        this.props.newUsername(username);
      }
    }
  
  
  
  render() {
    const user = this.props.currentUser.name;
      return (
        <footer className="chatbar">
          <input onKeyDown={this.editUsername} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={user}/>
          <input onKeyPress={this.onEnterPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
    }  
  }

export default Chatbar;
