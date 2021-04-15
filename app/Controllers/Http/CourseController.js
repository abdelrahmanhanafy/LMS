'use strict'

const Course = use('App/Models/Course')
const {validate} = use('Validator')

class CourseController {
    async index(response){
        const courses = await Course.all()

        return response.status(200).json({
            message: 'Successfully retrieved courses.',
            data: courses
          })
    }

    async details({params,response}){
        const course= await Course.find(params.id);

        return response.status(200).json({
            message: 'Found your course.',
            data: course
          })
    }
    
    async store({request , response }){
        const validation = await validate(request.all(),{
            title:'required|min:3|max:255',
            content:'required|min:3'
        })
        if(validation.fails()){
            return validation.messages()
        }
        const course = new Course()
        course.title =  request.input('title')
        course.content = request.input('content')
        await course.save()

        return response.status(201).json({
            message: 'Successfully created a new course.',
            data: course
          })
    }

    async update({params , request, response}){
        const validation = await validate(request.all(),{
            title:'required|min:3|max:255',
            content:'required|min:3'
        })
        if(validation.fails()){
            return validation.messages()
        }
        const course = await Course.find(params.id)

        course.title = request.input('title')
        course.content = request.input('content')

        await course.save()

        response.status(200).json({
            message: 'Successfully updated this course.',
            data: course
          })


    }
}

module.exports = CourseController
