const net = require('net');
const readline = require('readline');
const { EncryptMessage } = require('../DES/encrypt');
const { DecryptMessage } = require('../DES/decrypt');
// Configuration ===================================
const port = 8888;
const serverIP = '192.172.1.2'
//=================================================

// Create the socket client.
const client = new net.Socket();

// Connect to the server on the configured port
client.connect(port, serverIP, function () {
    // Log when the connection is established
    console.log(`Client 1: Connected to server on port ${port}`);

    // Try to send data to the server
    client.write('Hi from the client 1');
});

// Handle data coming from the server
client.on('data', function (data) {
    let decryptedMessage = DecryptMessage(`${data}`, "test1234");
    console.log(`Client 1 received from server: ${data}`);
    console.log(`Client 1 received from server: ${decryptedMessage}`);
});

// Handle connection close
client.on('close', function () {
    console.log('Client 1: Connection Closed');
});

// Handle error
client.on('error', function (error) {
    console.error(`Connection Error ${error}`);
});

// Create readline interface for client input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Read input from the user and send it to the server
rl.on('line', function (input) {
    let encryptedMessage = EncryptMessage(input, "abcd1235");
    client.write(encryptedMessage);
});