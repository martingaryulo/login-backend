// Import the necessary modules
const Keycloak = require('keycloak-connect');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const request = require('request');

// Set up the keycloak middleware
const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore });

// Set up the express server
const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));
app.use(keycloak.middleware());

// Define the login route
app.post('/login', keycloak.protect(), (req, res) => {
  // Retrieve the access token from the session
  const token = req.session['keycloak-token'];

  // Construct the headers to be sent to the API
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Make a request to the API URI using the access token
  request.post({
    url: 'https://test-api-api-gateway-desa.apps.aro-desa.bh.com.ar/',
    headers: headers,
    body: JSON.stringify(req.body)
  }, (err, response, body) => {
    // Handle the API response
    res.status(response.statusCode).send(body);
  });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));
