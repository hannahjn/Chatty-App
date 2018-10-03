import React, {Component} from 'react';

import Chatbar from './chatBar.jsx';
import MessageList from './messageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        clientCount: '',
        clientColour:'',
        currentUser: {name: 'Anonymous'}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: []
      }
    };
  
    componentDidMount() {

      // set up client-side websocket server
      this.socket = new WebSocket("ws://localhost:3001/");
      this.socket.onopen = () => {
        this.socket.send(console.log('connected to server'));
      }
      this.socket.onmessage = (event) => {
        
        const incomingMessage = JSON.parse(event.data);
        
        switch(incomingMessage.type) {
          // add any incoming message to the message list
          case 'incomingMessage':
            this.setState({messages: [...this.state.messages, incomingMessage]});
            break;
          case 'incomingNotification':
            this.setState({messages: [...this.state.messages, incomingMessage]});
            break;
          case 'count':
            this.setState({clientCount: incomingMessage.connectionCount});
            break;
          case 'colour':
            this.setState({clientColour: incomingMessage.clientColour});
            console.log('Cpmpleted State: ', this.state);
            break;
          default:
          throw new Error('Unknown event type ' + incomingMessage.type);
        }
      };
    }

    newMessage = (messageInput) => {
      // create a new object containing the information from the input box in chatBar.jsx
      const newMessageObj = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        clientColour: this.state.clientColour,
        content: messageInput
      }
      this.socket.send(JSON.stringify(newMessageObj));
    }
    
    newUsername = (username) => {
      // create a different type of object to send notifications about changing the username
      const newMessageObj = {
        type: 'postNotification',
        oldUsername: this.state.currentUser.name,
        username: username,
      }
      this.setState({currentUser: {name: username}});
      this.socket.send(JSON.stringify(newMessageObj));
    
    }
  
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        <div>Users Online:{this.state.clientCount}</div>
        </nav>
      <Chatbar newUsername={this.newUsername} currentUser={this.state.currentUser} newMessage={this.newMessage} type={this.state.type}/>
      <MessageList messages={this.state.messages}/>
      
      </div>
    );
  }
}

export default App;
