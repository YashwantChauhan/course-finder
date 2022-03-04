exports.friend = async(parent,args,context) => {
    return await context.prisma.friend.findUnique({
        where: {
            id: parent.id
        }
    }).friend()
}