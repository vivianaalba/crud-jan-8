// test to confirm that server is running
console.log('Is this thing on?');

// include express and body-parser modules in code
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const PORT = 3000;
// replaces connection code for security purposes
require('dotenv').config({ path: '.env' });

// remains above CRUD code
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

MongoClient.connect(process.env.MONGO_URI)
	.then(client => {
		const db = client.db('practice');
		const usersCollection = db.collection('users');	
        
        app.get('/', (req, res) => {
            usersCollection
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { usersCollection: results })
                })
                .catch(error => console.error(error))
        })

        // returns credentials to console
        // allows the client side to communicate with server
        app.post('/users', (req, res) => {
            usersCollection
            .insertOne(req.body)
            .then(result => {
                res.redirect('/');
            })
            .catch(error => console.log(error))
        })    
	})
	.catch(error => console.error(error))

// when a webpage has an address that includes '/' we are making a GET request
// requesting static or dynamic files stored in that address
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})


// stays at the bottom
app.listen(PORT, function() {
    console.log(`Server is live! Listening at port ${PORT}`); })