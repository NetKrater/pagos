const WebSocket = require('ws');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const TARGET_URL = "wss://eu-central-1-game9.spribegaming.com/BlueBox/websocket";

wss.on('connection', (clientSocket) => {
    const targetSocket = new WebSocket(TARGET_URL);

    clientSocket.on('message', (message) => {
        targetSocket.send(message);
    });

    targetSocket.on('message', (message) => {
        clientSocket.send(message);
    });

    clientSocket.on('close', () => targetSocket.close());
    targetSocket.on('close', () => clientSocket.close());
});

server.listen(8080, () => {
    console.log('Proxy WebSocket escuchando en ws://localhost:8080');
});
