var historyTxt = document.getElementById("history");
function vibrate(msg) {
    switch (msg) {
        case 'hello':
            navigator.vibrate([100, 100, 100, 100]);
            historyTxt.innerText =  "Salut !" + "\r\n" + historyTxt.innerText;
            break;
            case 'howru':
            navigator.vibrate([100, 100, 100, 100, 100, 100, 100, 100]);
            historyTxt.innerText =  "Comment ça va ?" + "\r\n" + historyTxt.innerText;
            break;
            case 'wait':
            navigator.vibrate([300]);
            historyTxt.innerText =  "Attends !" + "\r\n" + historyTxt.innerText;
            break;
            case 'a-sec':
            navigator.vibrate([60, 100, 60]);
            historyTxt.innerText =  "Je reviens..." + "\r\n" + historyTxt.innerText;
            break;
            case 'bye':
            navigator.vibrate([100, 200, 100, 200, 100]);
            historyTxt.innerText =  "A plus !" + "\r\n" + historyTxt.innerText;
            break;
            case 'thanks':
            navigator.vibrate([200, 200, 400, 200]);
            historyTxt.innerText =  "Merci !" + "\r\n" + historyTxt.innerText;
            break;
            case 'please':
            navigator.vibrate([200, 400, 200, 200]);
            historyTxt.innerText =  "S'il te plaît" + "\r\n" + historyTxt.innerText;
            break;
            case 'good':
                navigator.vibrate([100, 200, 300, 100]);
                historyTxt.innerText =  "Bien !" + "\r\n" + historyTxt.innerText;
            break;
            case 'bad':
                navigator.vibrate([500, 250, 500]);
                historyTxt.innerText =  "Mal..." + "\r\n" + historyTxt.innerText;
            break;
            case 'yes':
                navigator.vibrate([100, 300, 100]);
                historyTxt.innerText =  "Oui" + "\r\n" + historyTxt.innerText;
            break;
            case 'no':
                navigator.vibrate([300, 100, 300]);
                historyTxt.innerText =  "Non" + "\r\n" + historyTxt.innerText;
            break;
            case 'dm':
                navigator.vibrate([250, 500, 250, 500, 250]);
                historyTxt.innerText =  "écris-le dans le texte perso" + "\r\n" + historyTxt.innerText;
            break;
            
    
        default:
            historyTxt.innerText =  msg + "\r\n" + historyTxt.innerText;

            break;
    }
}
function send(msg) {
    socket.send(`{"type":"msg","content":"${msg}"}`);

}
function sendcustom() {
    var msg = document.getElementById("dm").value ;
    console.log(msg);
    msg = msg.replace(/\n/g, " ");
    if( msg == "" || !msg.replace(/\s/g, '').length) {
        return;
    } else {
        socket.send(`{"type":"msg","content":"${msg}"}`);
    }

}
let socket ;
var uid ;
function establishConnectionToServer() {
// Create WebSocket connection.
var serverIP = document.getElementById("serverip").value;
console.log(serverIP);
if(serverIP == "" || serverIP == undefined) {
    serverIP = window.location.hostname;
    alert("aucune addresse spécifiée, l'application part du principe que vous voulez vous connecter sur la même IP que celle de la page...");
}
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
       vibrate(serverMsg.content);
    }
});
}
