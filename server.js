// test to confirm that server is running
console.log('Is this thing on?');

// include express and body-parser modules in code
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// remains above CRUD code
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

// when a webpage has an address that includes '/' we are making a GET request
// requesting static or dynamic files stored in that address
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

// returns credentials to console
// allows the client side to communicate with server
app.post('/users', (req, res) => {
    console.log(req.body);
})

// stays at the bottom
app.listen(PORT, function() {
    console.log(`Server is live! Listening at port ${PORT}`); })