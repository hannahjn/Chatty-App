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
        messages: [] //incoming messages will populate this array
      }
    };
    componentDidMount() {

      // set up client-side websocket server
      this.socket = new WebSocket("ws://localhost:3001/");
      this.socket.onopen = () => {
        this.socket.send(console.log('connected to server'));
      }
      this.socket.onmessage = (event) => {
        
        // turn newly received string data into a JSON object.
        const incomingMessage = JSON.parse(event.data);
        
        switch(incomingMessage.type) {
          // add any incoming message to the message list
          case 'incomingMessage':
            this.setState({messages: [...this.state.messages, incomingMessage]});
            break; //using '...' allows us to access the current state and add to it, rather than replace it. 
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
      // send new message through socket. newMessageObj is an object so turn it to a string to send.
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
          {/* show the number of connected clients in the chatbar. */}
        <div>Users Online:{this.state.clientCount}</div>
        </nav>
        {/* pass the state (user) and new messages to chatbar as props */}
      <Chatbar newUsername={this.newUsername} currentUser={this.state.currentUser} newMessage={this.newMessage} type={this.state.type}/>
      {/* pass messages to message list as props */}
      <MessageList messages={this.state.messages}/>
      
      </div>
    );
  }
}

export default App;