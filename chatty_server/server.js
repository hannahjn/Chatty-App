const express = require('express');
const SocketServer = require('ws').Server;
const uuiv1 = require('uuid/v1');
const randomColour = require('randomcolor');


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
wss.on('connection', (ws) => {
  console.log('Connection Made. ');

// an object to send the number of connected clients for the client counter.
 let clientCount = {
   type: 'count',
   connectionCount: wss.clients.size,
 }
 wss.clients.forEach(function (client) {
    client.send(JSON.stringify(clientCount));
    console.log(clientCount);
  })

  // an object to assign a random colour to a new client.
  let clientColour = {
    type: 'colour',
    clientColour: randomColour(),
  }
    ws.send(JSON.stringify(clientColour));

    
  // this is called each time data is recieved. 
  ws.on('message', function incoming(messageInfo) {
    if (messageInfo !== undefined && messageInfo !== 'undefined'){
      // turn received string into an object again.
      const incomingMessageObj = JSON.parse(messageInfo);
      
      // on receiving a message, depending on the type, build it into an object to be sent back.
      let data = {};
      switch (incomingMessageObj.type) {
        case ('postMessage'):
        data = {
          type: 'incomingMessage',
          id: uuiv1(),
          clientColour: incomingMessageObj.clientColour,
          username: incomingMessageObj.username,
          content: incomingMessageObj.content 
        }
        break;
        case ('postNotification'):
        data ={
          type: 'incomingNotification',
          oldUsername: incomingMessageObj.oldUsername,
          username:incomingMessageObj.username,
          id: uuiv1(),
        }
        break;
      }
      
      wss.clients.forEach(function each(client) {
          client.send(JSON.stringify(data));
        })
      }
  });


  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    // send client number to update client counter.
    let clientCount = {
      type: 'count',
      connectionCount: wss.clients.size
    }
    wss.clients.forEach(function (client) {
       client.send(JSON.stringify(clientCount));
     })
    
    console.log('Client disconnected. ');
    })
});