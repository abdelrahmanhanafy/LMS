'use strict'

const Course = use('App/Models/Course')
const User = use('App/Models/User')

class EnrollmentController {
   async enroll({ response, params}){

        const user = await User.find(params.userId)
        const course= await Course.find(params.courseId)
        console.log(user.toJSON(), course.toJSON())
        if(user && course){
            await course.users().attach(user)
            course.users = await course.users().fetch()
            return response.status(200).json({
                message:'You have been enrolled successfully',
                data:course
            }) 
        }
        else {
            return response.status(400).json({
                message:"Wrong course or wrong user"
            })
        }


    }
}

module.exports = EnrollmentController
