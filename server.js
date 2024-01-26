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

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// returns credentials to console
// allows the client side to communicate with server
// must be global
app.post('/users', (req, res) => {
    const {username, password} = req.body;
    //prisma client 'create'
    prisma.user.create({
        data: {
            username,
            password,
            posts: {
                create: {
                    title: 'My first post',
                    body: 'Lots of really interesting stuff',
                },
            },
        }
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(error => {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    })
})

app.post('/posts', (req, res) => {
    const {title, body} = req.body;
    //prisma client 'create'
    prisma.post.create({
        data: {
            title,
            body,
        }
    })
    .then(result => {
        res.redirect('/');
    })
    .catch(error => {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    })
})


app.get('/', async (req, res) => {
    const body = { users: null, posts: null }    

    const users = await prisma.user
    .findMany()
        .then(results => {
            body.users = results;
    })
    .catch(error => console.error(error))

    const posts = await prisma.post
    .findMany()
        .then(results => {
            body.posts = results;
    })
    .catch(error => console.error(error));

    res.render('index.ejs', {body: body})
})

MongoClient.connect(process.env.MONGO_URI)
	.then(client => {
		const db = client.db('practice');
		const usersCollection = db.collection('users');	

        // collection is being searched and then rendering what is contain in array at index.ejs
        app.get('/', (req, res) => {
            usersCollection
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { usersCollection: results })
                })
                .catch(error => console.error(error))
        })    

        // collection is being searched and then rendering what is contain in array at index.ejs
        app.get('/', (req, res) => {
            postsCollection
                .find()
                .toArray()
                .then(results => {
                    res.render('index.ejs', { postsCollection: results })
                })
                .catch(error => console.error(error))
            }) 

        // returns credentials to console
        // allows the client side to communicate with server
        // made this request global
        // app.post('/users', (req, res) => {
        //     usersCollection
        //     .insertOne(req.body)
        //     .then(result => {
        //         res.redirect('/');
        //     })
        //     .catch(error => console.log(error))
        // })      
        
        // logic for PUT request - should not be seen by the client side
        // update info posted at the /users endpoint
        app.put('/users', (req, res) => {
            usersCollection
                .findOneAndUpdate(
                    { username: req.body.username },
                    {
                        $set: {
                            username: req.body.username,
                            password: req.body.password,
                        },
                    },
                    {
                        // meaning update and insert
                        upsert: false,
                    },
                    {
                        returnNewDocument: true
                    }
                )
                .then(result => {
                    res.json('Success')
                    return res
                })
                .catch(error => console.error(error))
    })

    app.delete('/users', (req, res) => {
        usersCollection
            .deleteOne(
                { username: req.body.username }
            )
            .then(result => {
                console.log(`Deleted ${req.body.username}`)
                console.log(result);
                res.json('Deleted user')
            })
            .catch(error => console.error(error))
    })
})

.catch(error => console.log(error));
 
   

// when a webpage has an address that includes '/' we are making a GET request
// requesting static or dynamic files stored in that address

// app.get('/', function (req, res) {
//     res.sendFile(__dirname + '/index.html');
// })


// stays at the bottom
app.listen(PORT, function () {
    console.log(`Server is live! Listening at port http://localhost:${PORT}`);
});