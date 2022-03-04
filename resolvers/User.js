exports.friends = async (parent,args,context) => {
    
    const friends = await context.prisma.friend.findMany({
        where: {
            userId: parent.id
        }
    })

    return friends;
}