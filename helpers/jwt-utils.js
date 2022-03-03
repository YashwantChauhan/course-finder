
const { sign,verify } = require('jsonwebtoken') 
const { env } = require('process')

exports.createToken = (payload) => {
    const token = sign(payload,env.JWT_SECRET);
    return token;
}

exports.verifyToken = (token) => {
    return verify(token,env.JWT_SECRET);
}

exports.getUserId = (authorization) => {

    if( !authorization ){
        return null;
    }

    if( !authorization.match(/Bearer /)){
        return null;
    }

    const token = authorization.replace("Bearer ","");
    if( token.length === 0 ) return null;
    
    const payload = this.verifyToken(token);
    if( !payload ) return null;
    
    return payload.userId
}