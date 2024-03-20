// main.js

// Create a shared worker
var worker = new SharedWorker('shared_worker.js');

// Get the port for communication
var port = worker.port;

// Listen for messages from the shared worker
port.onmessage = function(event) {
  // Log the received message
  console.log('Message received in main script:1', event.data);
};



// Listen for messages from the shared worker
worker.port.onmessage = function(event) {
  // Log the received message
  console.log('Message received in main script:1', event.data);
};

function sendRandomMessage() {
  const randomStr = generateRandomString(); // Function to generate random string
  port.postMessage('Hello from main script 1 ' + randomStr);
}

function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 10; // Adjust the length of the random string as needed
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

setInterval(sendRandomMessage, 5000);