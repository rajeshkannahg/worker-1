// shared_worker.js
var workerName = generateRandomString();
// Listen for connections
onconnect = function(e) {
    // Get the port for communication
    var port = e.ports[0];
    
    // Handle messages from the main script
    port.onmessage = function(event) {
      // Log the received message
      console.log('Message received in shared worker:1', event.data);
      // Echo the message back to the main script
      port.postMessage("Echo from" + workerName + event.data);
      // Send a message to all connected tabs
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage('Message from shared worker: '+ workerName + event.data);
      });
    });
  };

    port.start(); // Start listening for messages
    
  
    // Let the main script know that the shared worker is ready
    port.postMessage('Shared worker' + workerName+  'connected');
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