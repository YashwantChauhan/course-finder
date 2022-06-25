
const { sign, verify } = require('jsonwebtoken')
const { env } = require('process')

exports.createToken = (payload) => {
    const token = sign(payload, env.JWT_SECRET);
    return token;
}

exports.verifyToken = (token) => {
    return verify(token, env.JWT_SECRET);
}

exports.getUserId = async (authorization, prisma) => {
    try {

        if (!authorization) {
            return null;
        }

        if (!authorization.match(/Bearer /)) {
            return null;
        }

        const token = authorization.replace("Bearer ", "");
        if (token.length === 0) return null;

        const payload = this.verifyToken(token);
        if (!payload) return null;

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            }
        })

        if (!user) return null

        return payload.userId
    }
    catch (err) {
        console.error(err)
    }
}