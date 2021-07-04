//3rd Party Modules
const express = require('express');
require('dotenv/config')

const PORT = process.env.PORT || '5000'
const app = express();

app.get('/', (req, res, next)=>{
    res.send('Get Request on HOME PAGE of Backend!');
})

app.listen(PORT, ()=>{
    console.log("Server is Listening on ", PORT);
})

