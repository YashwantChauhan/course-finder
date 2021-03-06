
const { hashSync, compareSync } = require('bcrypt')
const { createToken } = require('./../helpers/jwt-utils')

exports.signup = async (parent, args, context) => {
    try {

        const hashPassword = hashSync(args.form.password, 10);
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
        console.error(err)
        const field = err.meta.target.match(new RegExp(/_.*_/))[0].replace(/_/g,'');
        if (err.code == "P2002") err = `This ${field} is already taken`;
        const response = {
            "status": "ERROR",
            "error": err
        }
        return response
    }
}

exports.login = async (parent, args, context) => {
    try {
        const user = await context.prisma.user.findUnique({
            where: {
                username: args.credentials.username,
            }
        })

        if (!user) {
            const response = {
                "status": "ERROR",
                "error": "Wrong Email and Password"
            }
            return response
        }

        if (!compareSync(args.credentials.password, user.password)) {
            const response = {
                "status": "ERROR",
                "error": "Please enter the correct password"
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
    catch (err) {
        console.error(err);
        const response = {
            "status": "ERROR",
            "error": "Internal server Error"
        }
        return response
    }
}

exports.addFriend = async (parent, args, context) => {

    if (!context.userId) {
        return {
            "status": "ERROR",
            "error": "Please login/signup"
        }
    }

    try {
        const friend = await context.prisma.friend.create({
            data: {
                userId: context.userId,
                friend: {
                    connect: {
                        id: Number(args.friendId)
                    }
                }
            }
        })

        const response = {
            "status": "OK",
        }
        return response;
    }
    catch (err) {
        console.error(err);
        if (err.code == "P2002") err = `You are already friends!`
        const response = {
            "status": "ERROR",
            "error": err
        }
        return response
    }

}

exports.like = async (parent, args, context) => {

    if (!context.userId) {
        return {
            "status": "ERROR",
            "error": "Please login/signup"
        }
    }

    try {
        const like = await context.prisma.user.update({
            data: {
                likedCourses: {
                    create: {
                        course: {
                            connect: {
                                id: Number(args.courseId)
                            }
                        }
                    }
                }
            },
            where: {
                id: context.userId
            }
        })

        const response = {
            "status": "OK",
        }
        return response;

    }
    catch (err) {
        console.error(err);
        if (err.code == "P2002") err = `Already Liked`
        const response = {
            "status": "ERROR",
            "error": err
        }
        return response
    }

}

exports.addToFavourite = async (parent,args,context) => {

    if (!context.userId) {
        return {
            "status": "ERROR",
            "error": "Please login/signup"
        }
    }

    try{
        const favourite = await context.prisma.user.update({    
            data: {
                favourites: {
                    create: {
                        course: {
                            connect: {
                                id: Number(args.courseId)
                            }
                        }
                    }
                }
            },
            where: {
                id: context.userId
            }
        })

        const response = {
            "status": "OK"
        }
        return response
    }
    catch(err){
        console.error(err);
        if (err.code == "P2002") err = `Already added to favourites`
        const response = {
            "status": "ERROR",
            "error": err
        }
        return response
    }
}