//3rd Party Modules
require('dotenv/config');
const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');

//Local Modules
const categoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRoute');
const userRoute = require('./routes/userRoute');
const authJwt = require('./helpers/authJwt');
const errorHandler = require('./helpers/errorHandler');

const app = express();

const PORT = process.env.PORT || '5000';
app.use(cors());
app.use(express.json());
app.options("*", cors());
app.use(morgan('tiny'));
app.use(authJwt());

//Handling Errors
app.use(errorHandler);

//Handling API Requests
app.get('/', (req, res, next)=>{
    res.send('Get Request on HOME PAGE of Backend!');
})
app.use('/api/categories', categoryRoute)
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);


//Database Connection & Server Listen
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@mongodbcluster.mcnv5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
                { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true, useFindAndModify:false})
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Database connection is Ready and Server is Listening on Port ", PORT);
    })
})
.catch((err)=>{
    console.log("A error has been occured while connecting to database!");    
})
