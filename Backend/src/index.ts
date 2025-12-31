import {WebSocket , WebSocketServer} from "ws";
import http from 'http'
import express from 'express'


const app = express();
const httpServer = app.listen(8080 , () => {
    console.log('Server is listening on port 8080')
});

//The first request that the browser makes is an HTTP request, it gets UPGRADED to a WS connection on the server
const wss = new WebSocketServer({ server : httpServer });

wss.on('connection' , (ws) => { //ws is the websocket instance 

    ws.on('error' , (err) => console.error(err));

    ws.on('message' , (data , isBinary) => {
        wss.clients.forEach((client) => { //this is for broadcasting the msg (data) to all the clients
            if(client.readyState === WebSocket.OPEN){
                client.send(data , { binary: isBinary });
            }
        });
    });

    ws.send('Hello! message from server');

});


// httpServer.listen(8080, function(){
//     console.log((new Date()) + 'Server is listening on port 8080')
// });


/* Below is the same code using http library


const server = http.createServer(function(request: any, response: any) {
    console.log((new Date()) + ' Recived request for ' + request.url);
    response.end("hi there");
});

const wss = new WebSocketServer( {server} );

wss.on('connection' , function connection(ws) {
    ws.on('error' , console.error);

    ws.on('message' , function message(data , isBinary){
        wss.clients.forEach(function each(client){
            if(client.readyState === WebSocket.OPEN) {
                client.send(data , {binary: isBinary});
            }
        });
    });

    ws.send('Hello! message from server!!');
});

server.listen(8080, function(){
    console.log((new Date()) + 'Server is listening on port 8080')
});

*/