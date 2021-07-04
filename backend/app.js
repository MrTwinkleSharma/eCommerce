//3rd Party Modules
const express = require('express');
require('dotenv/config')
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors')

const PORT = process.env.PORT || '5000'
app.use(cors());
app.options("*", cors());

const app = express();
app.use(morgan('tiny'));

app.get('/', (req, res, next)=>{
    res.send('Get Request on HOME PAGE of Backend!');
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodbcluster.mcnv5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occured while connecting to database!");    
})
