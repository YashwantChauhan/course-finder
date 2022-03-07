const { Router } = require('express')
const { getAllPendingOptions, addCoursesSource_1 } = require('./helpers')

const router = Router()

router.get('/ingest', async (req,res,next) => {
    
    const options = await getAllPendingOptions()
    const courses_1 = await addCoursesSource_1(options); 

    if( courses_1){
        res.json({
            "status": "OK"
        })
    }
    else{
        res.json({
            "status": "ERROR"
        })
    }
})


module.exports = router

