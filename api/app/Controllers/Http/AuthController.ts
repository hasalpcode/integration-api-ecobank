import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Extension from 'App/Models/Extension'
import ExtensionAssociation from 'App/Models/ExtensionAssociation'
import ExtensionValue from 'App/Models/ExtensionValue'
import User from 'App/Models/User'
import RegisterValidator from 'App/Validators/RegisterValidator'



export default class AuthController {
    async register({request,response}:HttpContextContract) {
        const user = new User()
        const data = await request.validate(RegisterValidator)
        await user.merge({...data}).save()
        return response.status(201).json(user)
    }

    async login({response,request,auth}:HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password') 
        
        const token = await auth.use('api').attempt(email,password)
        return response.status(201).json(token)
        
    }
}
