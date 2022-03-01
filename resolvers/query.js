
exports.getUsers = async (parent,context,args) => {
    const users = await context.prisma.user.findMany()
    return users;
}