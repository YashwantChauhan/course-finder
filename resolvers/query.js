
exports.getUsers = async (args,context) => {
    if( !context.userId ) {
        return {
            "status": "ERROR",
            "error": "Please login/signup"
        }
    }
    const users = await context.prisma.user.findMany()
    
    return {
        status: "OK",
        users
    }

}