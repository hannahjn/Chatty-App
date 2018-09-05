import React, {Component} from 'react';

import Chatbar from './chatBar.jsx';
import MessageList from './messageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        // type: '',
        // id: '',
        currentUser: {name: ''}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [] //incoming messages will populate this array
      }
    };
    componentDidMount() {
      console.log("componentDidMount <App />");
      setTimeout(() => {
        console.log("Simulating incoming message");
        const newMessage = {username: "Michelle", content: "Hello there!"};
        // Add a new message to the list of messages in the data store
        const messages = this.state.messages.concat(newMessage)
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);
      // set up client-side websocket server
      this.socket = new WebSocket("ws://localhost:3001/");
      this.socket.onopen = () => {
        this.socket.send(console.log('connected to server'));
      }
    }

    newMessage = (messageInput) => {
      // create a new object containing the information from the input box in chatBar.jsx
      // console.log('newMessage username', this.state.currentUser.name);
      const newMessageObj = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: messageInput
      }
      // send new message through socket. newMessageObj is an object so turn it to a string to send.
      console.log(JSON.stringify(newMessageObj));
      this.socket.send(JSON.stringify(newMessageObj));
    
      // receive messages from the server
      this.socket.onmessage = (event) => {
        // console.log for debugging purposes.
        console.log('event', event);
        // turn string data into a JSON object
        const incomingMessage = JSON.parse(event.data);
        switch(incomingMessage.type) {
          case 'incomingMessage':
            this.setState({messages: [...this.state.messages, incomingMessage]});
            break;
          case 'incomingNotification':
            this.setState({messages: [...this.state.messages, incomingMessage]});
            break;
          default:
          throw new Error('Unknown event type ' + incomingMessage.type);
        }
      };
    
        // add new message to total list of messages
        // update state to include new messages
      }
    // }
    
    newUsername = (username) => {
      const newMessageObj = {
        type: 'postNotification',
        oldUsername: this.state.currentUser.name,
        username: username,
      }

      console.log('username', username);
      this.setState({currentUser: {name: username}});

      // send new message through socket. newMessageObj is an object so turn it to a string to send.
      console.log(JSON.stringify(newMessageObj));
      this.socket.send(JSON.stringify(newMessageObj));
    
    }
  
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
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