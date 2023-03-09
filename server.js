import {connectDb} from "./db";
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
import routes from './routes/routes';
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/', routes);
const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    }
});
io.on('connection', (socket) => {
    console.log(`Client ${socket.id} connected`);

    socket.on('chat-message', (message) => {
        console.log(`Received message from client ${socket.id}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client ${socket.id} disconnected`);
    });
});


server.listen(port, () => {
    console.log(`Server SOCKET listening on port ${port}`);
});
connectDb()

