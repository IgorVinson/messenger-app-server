const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});

app.use(cors());
const port = process.env.PORT || 8080;

// io.on('connection', (socket) => {
//     console.log(`Client ${socket.id} connected`);
//
//     socket.on('chat-message', (message) => {
//         console.log(`Received message from client ${socket.id}: ${message}`);
//     });
//
//     socket.on('disconnect', () => {
//         console.log(`Client ${socket.id} disconnected`);
//     });
// });


app.use(bodyParser.json());
app.use('/', routes);

server.listen(port, () => {
    console.log(`Server SOCKET listening on port ${port}`);
});

