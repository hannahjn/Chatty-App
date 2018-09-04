import React, {Component} from 'react';

class Chatbar extends Component {
  
  onEnterPress = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target.value;
        this.props.newMessage(messageInput);
      }
    }
  
  
  render() {
    const user = this.props.user.name;
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={user}/>
          <input onKeyPress={this.onEnterPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
  }   
}

export default Chatbar;