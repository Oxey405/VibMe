//serverpart
const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 2007 })
var idList = [];
var clients = [];
var lastIdGiven;
wss.on('connection', ws => {
  clients.push(ws);
    console.log("A user is connected");
  generateID();
    ws.send(`{"type":"yourID","content":"${lastIdGiven}"}`);
    ws.on('message', message => {
      console.log(`Received message => ${message}`)
      var messageParsed;
      try {
        
        messageParsed = JSON.parse(message);
        if(messageParsed.type == "msg") {
          clients.forEach(s =>  s.send(`{"type":"msg","content":"${messageParsed.content}"}`));
        }
  
      } catch (error) {
        console.log("can't parse it");
      }
    
    })
})
function generateID() {
  lastIdGiven = idList.length+1;
  idList.push(idList.length+1);
  
}
 

//webpart
const express = require('express')
const app = express()
const port = 2008
app.use('/', express.static('app'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})