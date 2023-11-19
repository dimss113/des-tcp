const net = require('net');
const readline = require('readline');
const { EncryptMessage } = require('../DES/encrypt');
const { DecryptMessage } = require('../DES/decrypt');
// Configuration ===================================
const port = 8888;
//=================================================

// Create the socket client.
const client1 = new net.Socket();

// Connect to the server on the configured port
client1.connect(port, function () {
    // Log when the connection is established
    console.log(`Client 1: Connected to server on port ${port}`);

    // Try to send data to the server
    client1.write('Hi from the client 1');
});

// Handle data coming from the server
client1.on('data', function (data) {
    let decryptedMessage = DecryptMessage(`${data}`, "test1234");
    console.log(`Client 1 received from server: ${decryptedMessage}`);
});

// Handle connection close
client1.on('close', function () {
    console.log('Client 1: Connection Closed');
});

// Handle error
client1.on('error', function (error) {
    console.error(`Connection Error ${error}`);
});

// Create readline interface for client input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read input from the user and send it to the server
rl.on('line', function (input) {
    client1.write(input);
});