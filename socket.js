import {server} from "./server";

const io = require('socket.io')(server);


export const runSocket = () => {
    io.on('connection', (socket) => {
        console.log('Socket.IO connection established!');

        socket.on('message', (data) => {
            console.log('Received message:', data);
        });
    });
}