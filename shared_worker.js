// shared_worker.js
var workerName = generateRandomString();
// Listen for connections
onconnect = function(e) {
  // Get the port for this connection
  const port = e.ports[0];

  // Event listener for messages from the main page
  port.onmessage = function(event) {
    // Log the received message
    console.log('Message received in shared worker:', + workerName + event.data);
    
    // Broadcast the message to all connected tabs
    self.clients.matchAll().then(clients => {
      clients.forEach(client => {
        client.postMessage(event.data);
      });
    });
  };

  // Start listening for messages
  port.start();
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