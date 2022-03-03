
const { hashSync, compareSync } = require('bcrypt')
const { createToken } = require('./../helpers/jwt-utils')

exports.signup = async (args, context) => {
    try {
        
        const hashPassword = hashSync(args.form.password,10);
        args.form.password = hashPassword;
        const user = await context.prisma.user.create({
            data: args.form
        })

        const token = createToken({
            userId: user.id,
            createdAt: Date.now()
        })

        const response = {
            "status": "OK",
            "token": token,
            "data": user
        }
        return response
    }
    catch (err) {
        if( err.code == "P2002" ) err = `Field ${err.meta.target[0]} must be unique`;
        const response = {
            "status": "ERROR",
            "error": err
        }
        return response
    }
}

exports.login = async (args,context) => {
    try{
        const user = await context.prisma.user.findUnique({
            where: {
                username: args.credentials.username,
            }
        })
        
        if( !user ){
            const response = {
                "status": "ERROR",
                "error": "User with those credentials dosen't exists"
            }
            return response
        }

        if( !compareSync(args.credentials.password, user.password ) ){
            const response = {
                "status": "ERROR",
                "error": "Invalid Credentials"
            }
            return response
        }

        const token = createToken({
            userId: user.id,
            createdAt: Date.now()
        })

        const response = {
            "status": "OK",
            token: token,
            data: user
        }

        return response
    }
    catch(err){
        console.error(err);
        const response = {
            "status": "ERROR",
            "error": "Internal server Error"
        }
        return response
    }
}