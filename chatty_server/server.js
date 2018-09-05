const express = require('express');
const SocketServer = require('ws').Server;
const uuiv1 = require('uuid/v1');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Connection Made');
  // this is called each time data is recieved. 
  ws.on('message', function incoming(messageInfo) {
    // console.log('data: ', data, typeof data);
    if (messageInfo !== undefined && messageInfo !== 'undefined'){
      const incomingMessageObj = JSON.parse(messageInfo);
      // turn string into object again.


let data = {};
  switch (incomingMessageObj.type) {
    case ('postMessage'):
      data = {
        type: 'incomingMessage',
        id: uuiv1(),
        username: incomingMessageObj.username,
        content: incomingMessageObj.content
      }
      break;
    case ('postNotification'):
      data ={
        type: 'incomingNotification',
        oldUsername: incomingMessageObj.oldUsername,
        username:incomingMessageObj.username
      }
      break;
    }

    wss.clients.forEach(function each(client) {
      // if(client !== ws && client.readyState === Web.Socket.OPEN){
        client.send(JSON.stringify(data));
        // console.log('outgoing message sent');
      // }
    })
  }

  // wss.broadcast = function broadcast(data) {
  //   wss.clients.forEach(function each(client) {
  //     if (client.readyState === WebSocket.OPEN) {
  //       client.send(data);
  //       console.log('outgoing', data)
  //     } else {
  //       console.log('fail');
  //     }
  //   });
  // };

  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});