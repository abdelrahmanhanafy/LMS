'use strict'

const User = use('App/Models/User')
const {validate} = use('Validator')

class AuthController {
    async signUp({request, response, auth}){
        const username = request.input("username")
        const email = request.input("email")
        const password = request.input("password")

        const validation = await validate(request.all(),{
            "username":"required|unique:users|min:3|max:255",
            "email":"required|unique:users|min:3|max:255",
            "password":"required|min:6|max:255"
          })
        if(validation.fails()){
            return validation.messages()
        }

        //Check the user already registered..
        let userFound = await User.findBy('email', email)
        if(userFound){
            return response.status(400).json({'status':'User already registered'})
        }
        
        let user = new User()
        user.username = username
        user.email = email
        user.password = password

        await user.save()
        let accessToken = await auth.generate(user)
        return response.json({"user": user, "access_token": accessToken})
    }

    async login({request, response, auth}){
        const email = request.input("email")
        const password = request.input("password");

        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            return response.json({"user":user, "access_token": accessToken})
          }

        }
        catch (e) {
          return response.status(400).json({message: 'You first need to register!'})
        }
    }
}

module.exports = AuthController
