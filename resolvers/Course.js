exports.likes = async ( parent,args,context ) => {
    const users = await context.prisma.course.findUnique({
        where: {
            id: parent.id
        }
    }).likes();

    return users;
}