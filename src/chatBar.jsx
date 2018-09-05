import React, {Component} from 'react';

class Chatbar extends Component {
  
  onEnterPress = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target.value;
        this.props.newMessage(messageInput);
      }
    }
  editUsername = (e) => {
    console.log(e.key);
    if (e.key === 'Enter' || e.key === 'Tab') {
        const username = e.target.value;
        console.log(e.target.value);
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