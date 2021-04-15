'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

// Route.get('/test', ()=> 'Welcome to my server')


Route.get('/courses', 'CourseController.index').middleware('auth')

Route.get('/courses/:id', 'CourseController.details')

Route.post('/courses', 'CourseController.store')

Route.put('/courses/:id', 'CourseController.update')

Route.post('/signUp','AuthController.signUp')

Route.post('/login','AuthController.login')

Route.post('/enroll/:userId/:courseId','EnrollmentController.enroll')
