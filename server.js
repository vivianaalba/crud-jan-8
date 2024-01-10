console.log('Is this thing on?');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// remains above CRUD code
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/users', (req, res) => {
    console.log(req.body);
})

app.listen(PORT, function() {
    console.log(`Server is live! Listening at port ${PORT}`); })