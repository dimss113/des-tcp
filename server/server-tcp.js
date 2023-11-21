// Get net module
const net = require('net');
const readline = require('readline');
const { EncryptMessage } = require('../DES/encrypt');
const { DecryptMessage } = require('../DES/decrypt');

// Configuration ===================================
const port = 8888;
//=================================================

// Create an instance of the server and attach the client handling callback
const server = net.createServer(onClientConnection);

// Start listening on the given port and host.
server.listen(port, function () {
    console.log(`Server started on port ${port}`);
});

// Create readline interface for server input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// the client handling callback
function onClientConnection(sock) {
    // Log when a client connects.
    console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);

    // Handle the client data.
    sock.on('data', function (data) {
        // Log data received from the client
        let decryptedMessage = DecryptMessage(`${data}`, "test1234");
        console.log(`>> data received : ${data}`);
        console.log(`>> data received : ${decryptedMessage}`);

        // prepare and send a response to the client
        let serverResp = "Hello from the server";
        sock.write(serverResp);
    });

    // Handle when client connection is closed
    sock.on('close', function () {
        console.log(`${sock.remoteAddress}:${sock.remotePort} Connection closed`);
    });

    // Handle Client connection error.
    sock.on('error', function (error) {
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });

    // Read input from the server and send it to the client
  rl.on('line', function (input) {
    let encryptedMessage = EncryptMessage(input, "test1234");
      sock.write(`${encryptedMessage}`);
    });
}