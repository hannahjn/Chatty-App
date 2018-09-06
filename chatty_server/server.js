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
  console.log('Connection Made. ');

// populate the clientData object with the client ID and number of clients
 let clientCount = {
   type: 'count',
   connectionCount: wss.clients.size
 }
 wss.clients.forEach(function (client) {
  // if(client !== ws && client.readyState === Web.Socket.OPEN){
    client.send(JSON.stringify(clientCount));
    console.log(clientCount);
    // console.log('outgoing message sent');
    // }
  })
  


  // this is called each time data is recieved. 
  ws.on('message', function incoming(messageInfo) {
    // console.log('data: ', data, typeof data);
    if (messageInfo !== undefined && messageInfo !== 'undefined'){
      // turn string into object again.
      const incomingMessageObj = JSON.parse(messageInfo);
      
      // on receiving a message, depending on the type, build it into an object to be sent back.
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


  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let clientCount = {
      type: 'count',
      connectionCount: wss.clients.size
    }
    wss.clients.forEach(function (client) {
     // if(client !== ws && client.readyState === Web.Socket.OPEN){
       client.send(JSON.stringify(clientCount));
       console.log(clientCount);
       // console.log('outgoing message sent');
       // }
     })
    
    console.log('Client disconnected. ');
    })
});