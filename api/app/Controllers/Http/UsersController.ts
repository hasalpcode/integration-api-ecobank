import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Extension from 'App/Models/Extension'
import ExtensionValue from 'App/Models/ExtensionValue'

import User from 'App/Models/User'
import DataUserValidator from 'App/Validators/DataUserValidator'
import ExtValueValidator from 'App/Validators/ExtValueValidator'

import RegisterValidator from 'App/Validators/RegisterValidator'
import AuthController from './AuthController'

export default class UsersController {
   async  index({response,auth}:HttpContextContract) {
        if (auth) {
          const users = await  User.all()
          return response.status(200).send(users)
        }
        
   }
   async  user_ext({response,params}:HttpContextContract) {
     
     const user_extension = await Database.from('users as u').where('u.id',params.id).innerJoin('extension_values as ev','ev.id_user','u.id').innerJoin('extensions as e','ev.id_extension','e.id').innerJoin('extension_associations as ea','ea.id','e.id_ext_association').select('ev.value').select('e.name').select('u.*')
     return response.status(200).json(user_extension)
     }

   async  store({request,response}:HttpContextContract) {
     const user = new User()
     const data = await request.validate(RegisterValidator)
     await user.merge({...data}).save()
     
     await ExtensionValue.createMany([
     {
          value : request.input('adresse'),
          id_user : user.id,
          id_extension : request.input('1')
     },
     {
          value : request.input('telephone'),
          id_user : user.id,
          id_extension : request.input('3')
     },
])

     //ext_value.save()

    return response.status(201).json(user)
    }

    async  update({request,response,params}:HttpContextContract) {
     const data = await request.validate(DataUserValidator)
        const user = User.find(params.id)
        
        User.create(data)
          
        return response.status(200).json(user)
     }

     async  show({response,params,auth}:HttpContextContract) {
          const user = await User.findOrFail(params.id)
          return response.status(200).json(user)
     }

     async destroy({params,response}:HttpContextContract) {
          const userToDelete = await User.findOrFail(params.id)
          userToDelete.delete()
          return response.status(200).json("user supprimé")
     }

   
}
