const { PrismaClient } = require('@prisma/client')
const constants = require('./../../helpers/constants')
const prisma = new PrismaClient()
const axios = require('axios')
const { throwHttpGraphQLError } = require('apollo-server-core/dist/runHttpQuery')

exports.getAllPendingOptions = async () => {
    const options = await prisma.options.findMany({
        where: {
            isDone: false
        },
        select: {
            option: true
        }
    })

    // await prisma.options.updateMany({
    //     data: {
    //         isDone: true
    //     },
    //     where: {
    //         isDone: false
    //     }
    // })

    return options
}


exports.addCoursesSource_1 = async (options) => {

    let coursesAgg = []

    for( let index = 0; index<options.length; index++ ){
        
        const option = options[index]
        let data = constants.courseSources[0].data;
        data.requests[0]["params"] = `query=${option.option}&hitsPerPage=12&page=0`
        const axiosRequest = {
            method: "post",
            url: constants.courseSources[0].url,
            params: {
                ...constants.courseSources[0].params,
            },
            data
        }
    
        const responses = await getCourses(axiosRequest)
    
        const courses = responses.data.results[0].hits.map(response=> {
            
            const { avgLearningHours, 
                    name, tagline, 
                    productDifficultyLevel, 
                    enrollments, partners, 
                    language, isCourseFree, 
                    objectUrl, imageUrl 
            } = response;
            
            let course = {
                duration: avgLearningHours === null? 0 : avgLearningHours,
                name: name,
                description: tagline,
                difficulty: productDifficultyLevel === null? "" : productDifficultyLevel,
                countEnrolled: enrollments,
                courseGivenBy: partners[0],
                language: language,
                isPaid: isCourseFree,
                url: `${constants.courseSources[0].courseUrl}${objectUrl}`,
                imageUrl: imageUrl,
                source: constants.courseSources[0].source
            }

            course = validateCourse(course);

            return course

        })

        coursesAgg = [...coursesAgg,...courses]
    }

    try{
        await addCoursesToDatabase(coursesAgg);
        return true;
    }
    catch(err){
        console.error(err);
        throwHttpGraphQLError(400,err)
    }
    
}


const addCoursesToDatabase = async (courses) => {

    let promises = []

    for( let index = 0; index<courses.length; index++ ){
        const course = courses[index]
        promises.push(prisma.course.create({
            data: course
        }))
    }

    await Promise.all(promises);

    return true;
}

const validateCourse = (course) => {
    for ( let key in course ){
        if( course[key] === null ){
            course[key] = constants.defaultCourseSchema[key]
        }
    }
    return course
}

const getCourses = async (request) => {
    return await axios.request(request);
}