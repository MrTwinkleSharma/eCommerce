const expressJwt = require('express-jwt');

module.exports = function authJwt(){
    const secret = process.env.JWT_KEY;
    return expressJwt({
        secret, 
        algorithms:['HS256']
    })
}