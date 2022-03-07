
exports.getUsers = async (parent, args, context) => {

    if (!context.userId) {
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


exports.getCourses = async (parent, args, context) => {
    if (!context.userId) {
        return {
            "status": "ERROR",
            "error": "Please login/signup"
        }
    }

    try {
        const courses = await context.prisma.course.findMany({
            where: {
                name: {
                    contains: `${args.search.search}`
                }
            }
        })

        const exists = await context.prisma.options.count({
            where: {
                option: `${args.search.search}`
            }
        })

        if (!exists) {
            const option = await context.prisma.options.create({
                data: {
                    option: `${args.search.search}`
                }
            })
        }

        return {
            status: "OK",
            courses: courses
        }
    }
    catch (err) {
        console.error(err)
        return {
            status: "ERROR",
            error: err
        }
    }
}