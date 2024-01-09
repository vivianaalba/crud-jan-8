console.log('Is this thing on?');


const express = require('express');
const app = express();
const PORT = 3000;


app.listen(PORT, function() {
    console.log(`Server is live! Listening at port ${PORT}`); })