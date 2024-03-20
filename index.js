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

// Send a message to the shared worker
port.postMessage('Hello from main script 1');

// Listen for messages from the shared worker
worker.port.onmessage = function(event) {
  // Log the received message
  console.log('Message received in main script:1', event.data);
};

// Send a message to the shared worker
worker.port.postMessage('Hello from main script 1');
