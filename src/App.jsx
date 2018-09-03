import React, {Component} from 'react';

import Chatbar from './chatBar.jsx';
import MessageList from './messageList.jsx';
import Message from './message.jsx';

class App extends Component {
  render() {
    return (
      <div>
      <Chatbar/>
      <MessageList />
      <Message />
      </div>
    );
  }
}
export default App;
