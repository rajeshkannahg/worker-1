// shared_worker.js
var workerName = generateRandomString();
// Listen for connections
const connectedTabs = [];

onconnect = function(e) {
  // Get the port for this connection
  const port = e.ports[0];
  connectedTabs.push(port);
  // Event listener for messages from the main page
  port.onmessage = function(event) {
    // Log the received message
    console.log('Message received in shared worker:', + workerName + event.data);
    port.postMessage('message from shared worker'+ workerName+ 'to specific port' + event.data);
    // Broadcast the message to all connected tabs
    connectedTabs.forEach(instance => {
      instance.postMessage('message from shared worker' + workerName+ 'to all tabs' + event.data);
    });
  };

  // Start listening for messages
  port.start();
  port.postMessage("shared worker" + workerName + "connected");
};
  
  function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const length = 10; // Adjust the length of the random string as needed
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }