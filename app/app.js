function vibrateHello() {
    navigator.vibrate([100, 100, 100, 100]);
}
function sendHello() {
    socket.send(`{"type":"msg","content":"hello"}`);

}
let socket ;
var uid ;
function establishConnectionToServer() {
// Create WebSocket connection.
var serverIP = document.getElementById("serverip").value;
socket = new WebSocket('ws://'+serverIP+':2007');
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('connect');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log("recieved " + event);
    var serverMsg ;
    try {
        serverMsg = JSON.parse(event.data);
        console.log(serverMsg);
    } catch (error) {
        console.error("can't parse response from server");
    }
    if(serverMsg.type == "yourID") {
        uid = serverMsg.content;
    }
    if(serverMsg.type == "msg") {
       if(serverMsg.content == "hello") {
        vibrateHello();
       }
    }
});
}
