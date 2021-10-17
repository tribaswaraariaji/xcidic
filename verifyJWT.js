const jwt = require("jsonwebtoken");
const secret = "xcidiccrud"

function generateToken(payload){
    return jwt.sign(payload, secret, {expiresIn:'1h'})
}

function verifyToken(token,cb){
    return jwt.verify(token, secret, function(err,decoded){
        if(err){
            cb(err,null);
        }else{
            cb(null,decoded)
        }
    });
}

function verifyWsToken({ TOKEN }) {
    return new Promise((resolve, reject) => {
      "use strict";
      try {
        let JWT = jwt.verify(TOKEN, secret);
        resolve(JWT);
      } catch (error) {
        reject(error);
      }
    });
  }

module.exports = {
    generateToken,
    verifyToken,
    verifyWsToken
}