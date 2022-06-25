exports.likes = async ( parent,args,context ) => {
    const likes = await context.prisma.UseronCourseLikes.findMany({
        where: {
            courseId: parent.id
        },
        select: {
            userId: true
        }
    });

    let users = []
    for( let index = 0; index<likes.length; index++ ){
        const element = likes[index]
        users.push(context.prisma.user.findUnique({
            where: {
                id: element.userId
            }
        }))
    }

    users = await Promise.all(users);

    return users;
}

exports.favouritesMarked = async (parent,args,context) => {
    const favourites = await context.prisma.UseronCourseLikes.findMany({
        where: {
            courseId: parent.id
        },
        select: {
            userId: true
        }
    });

    let users = []
    for( let index = 0; index<favourites.length; index++ ){
        const element = favourites[index]
        users.push(context.prisma.user.findUnique({
            where: {
                id: element.userId
            }
        }))
    }

    users = await Promise.all(users);

    return users;
}