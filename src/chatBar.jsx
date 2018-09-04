import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    const user = this.props.user.name;
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={user}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" />
        </footer>
      );
  }   
}

export default Chatbar;