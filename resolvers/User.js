exports.friends = async (parent,args,context) => {
    const friends = await context.prisma.friend.findMany({
        where: {
            userId: parent.id
        }
    })

    return friends;
}

exports.likedCourses = async (parent,args,context) => {
    const likedCourses = await context.prisma.UseronCourseLikes.findMany({
        where: {
            userId: parent.id
        },
        select: {
            courseId: true
        }
    });

    let courses = []
    for( let index = 0; index<likedCourses.length; index++ ){
        const element = likedCourses[index]
        courses.push(context.prisma.course.findUnique({
            where: {
                id: element.courseId
            }
        }))
    }

    courses = await Promise.all(courses);

    return courses;
}


exports.favourites = async (parent,args,context) => {
    const favouriteCourses = await context.prisma.UseronCourseFavourites.findMany({
        where: {
            userId: parent.id
        },
        select: {
            courseId: true
        }
    });

    let courses = []
    for( let index = 0; index<favouriteCourses.length; index++ ){
        const element = favouriteCourses[index]
        courses.push(context.prisma.course.findUnique({
            where: {
                id: element.courseId
            }
        }))
    }

    courses = await Promise.all(courses);

    return courses;
}