var dotenv = require('dotenv')
dotenv.config();

var jwt = require('jsonwebtoken');  //https://npmjs.org/package/node-jsonwebtoken

dotenv.config();

var XToken = function(data){
    this.data=data
}

XToken.sign = function(value){
    console.log("Generating token for " + value + " with secret = "+process.env.TOKEN_SECRET +", delay ="+process.env.TOKEN_DELAY)
    return jwt.sign({value}, process.env.TOKEN_SECRET, { expiresIn: parseInt(process.env.TOKEN_DELAY) })
    /* try{
        return jwt.sign(text, process.env.TOKEN_SECRET, { expiresIn: Number(process.env.TOKEN_DELAY) })
    }catch(err){
        return err ;//process.env.TOKEN_GENERATION_FAILED
    }*/
}

XToken.decode = function(data){
    try{
        value = jwt.verify(data, process.env.TOKEN_SECRET).value
        console.log("Token verified : "+value)
        return value
    }catch(err){
        return process.env.TOKEN_INVALID
    }
}

module.exports = XToken