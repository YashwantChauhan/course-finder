exports.signup = async (args, context) => {
    const user = await context.prisma.user.create({

        data: {
            username: args.username,
            password: args.password,
            email: args.email
        }
    })
    
    const response = {
        "status": "OK",
        "data": user
    }

    return response
}