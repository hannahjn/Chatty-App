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
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      }
    };
  render() {
    
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
      <Chatbar user={this.state.currentUser}/>
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