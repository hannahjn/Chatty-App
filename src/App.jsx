import React, {Component} from 'react';

import Chatbar from './chatBar.jsx';
import MessageList from './messageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
            id: 1,
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            id: 2,
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
    };
    componentDidMount() {
      console.log("componentDidMount <App />");
      setTimeout(() => {
        console.log("Simulating incoming message");
        // Add a new message to the list of messages in the data store
        const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
        const messages = this.state.messages.concat(newMessage)
        // Update the state of the app component.
        // Calling setState will trigger a call to render() in App and all child components.
        this.setState({messages: messages})
      }, 3000);
      
      this.socket = new WebSocket("ws://localhost:3001/");
      this.socket.onopen = () => {
        this.socket.send(console.log('connected to server'));
      }
    }

    newMessage = (messageInput) => {
      // create a new object containing the information from the input box in chatBar.jsx
      const newMessageObj = {
        id: (this.state.messages.length) + 1,
        username: 'Anonymous',
        content: messageInput
      }
      // update state to include the newly generated object.
      const newMessages = this.state.messages.concat(newMessageObj);
      this.setState({messages: newMessages});
      // send new message through socket. newMessageObj is an object so turn it to a string to send.
      this.socket.send(JSON.stringify(newMessageObj));
    }

   
    
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      <Chatbar user={this.state.currentUser} newMessage={this.newMessage}/>
      <MessageList messages={this.state.messages}/>
      
      </div>
    );
  }
}

export default App;


// componentDidMount() {
//   // use fetch api
//   fetch('https://jsonplaceholder.typicode.com/posts')
//     then(resp => resp.JSON())
//     then(posts=> this.setState({ posts }))
  
    // const postList = ({ posts }) => (
    //   <div className="post-list">
    //   <ul> {posts.map(p => <post key={p.id} post={p}/>)}</ul>
    //   </div>
    // );
    
    // const post = ({ post }) => (
    //   <li className="post">{post.title}</li>
    // );
  // }