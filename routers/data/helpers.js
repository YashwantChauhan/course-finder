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

    await prisma.options.updateMany({
        data: {
            isDone: true
        },
        where: {
            isDone: false
        }
    })

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
                duration: avgLearningHours,
                name: name,
                description: tagline,
                difficulty: productDifficultyLevel,
                countEnrolled: enrollments,
                courseGivenBy: partners[0],
                language: language,
                isPaid: !isCourseFree,
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

exports.addCoursesSource_2 = async (options) => {

    let coursesAgg = []

    for( let index = 0; index<options.length; index++ ){
        
        const option = options[index]
        let data = constants.courseSources[1].data;
        data.requests[0]["params"] = `query=${option.option}&hitsPerPage=12`
        const axiosRequest = {
            method: "post",
            url: constants.courseSources[1].url,
            params: {
                ...constants.courseSources[1].params,
            },
            data
        }
        const responses = await getCourses(axiosRequest)
    
        const courses = responses.data.results[0].hits.map(response=> {
            const {
                    title, primary_description, 
                    level, recent_enrollment_count, 
                    partner, language, 
                    marketing_url, card_image_url
            } = response;
            
            let course = {
                duration: null,
                name: title,
                description: primary_description,
                difficulty: level[0],
                countEnrolled: recent_enrollment_count,
                courseGivenBy: partner[0],
                language: language[0],
                isPaid: null,
                url: marketing_url,
                imageUrl: card_image_url,
                source: constants.courseSources[1].source
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


exports.addCoursesSource_3 = async (options) => {

    let coursesAgg = []

    for( let index = 0; index<options.length; index++ ){
        
        const option = options[index]
        let params = constants.courseSources[2].params
        params.q = option.option

        const axiosRequest = {
            method: "get",
            url: constants.courseSources[2].url,
            params,
            headers: constants.courseSources[2].headers
        }

        const responses = await getCourses(axiosRequest)

        const courses = responses.data.courses.map(response=> {
            
            const { hrs_of_content_f, 
                    title, headline,                    
                    instructional_level_simple, 
                    num_reviews, visible_instructors, 
                    lang_s, is_paid, 
                    learn_url, image_480x270
            } = response;
            
            let course = {
                duration: Math.floor(Number(hrs_of_content_f)),
                name: title,
                description: headline,
                difficulty: instructional_level_simple,
                countEnrolled: num_reviews,
                courseGivenBy: visible_instructors[0].display_name,
                language: lang_s,
                isPaid: is_paid,
                url: `${constants.courseSources[2].courseUrl}${learn_url}`,
                imageUrl: image_480x270,
                source: constants.courseSources[2].source
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
    try{
    const response = await axios.request(request);
    return response;
    }
    catch(err){
        console.error(err);
    }
}