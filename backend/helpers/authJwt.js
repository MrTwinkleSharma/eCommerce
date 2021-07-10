const expressJwt = require('express-jwt');

module.exports = function authJwt(){
    const secret = process.env.JWT_KEY;
    return expressJwt({
        secret, 
        algorithms:['HS256'],
        isRevoked:isRevoked
    }).unless({
        path:[
            {url:"/api/users/login"},
            {url:"/api/users/signup"},
            {url:/\/api\/products(.*)/, methods:["GET", "OPTIONS"]},
            {url:/\/uploads\/product_images(.*)/, methods:["GET", "OPTIONS"]},
            {url:/\/api\/categories(.*)/, methods:["GET", "OPTIONS"]},
            {url:/\/api\/orders(.*)/, methods:["GET", "OPTIONS"]}
        
        ]
    })
}

async function isRevoked(req, payload, done){
    //It will set the token to be revoked, so that if it accesses any other resourses than path defined
    //It will cancel token and user will be unauthorized for current API request
    if(!payload.isAdmin){console.log("Inside it"); done(null, true);}
    else done();
}