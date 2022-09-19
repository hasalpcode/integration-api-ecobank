import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Extension from 'App/Models/Extension'
import ExtensionValue from 'App/Models/ExtensionValue'
import ExtensionValidator from 'App/Validators/ExtensionValidator'
import ExtValueValidator from 'App/Validators/ExtValueValidator'

export default class ExtensionsController {
    async  store({request,response}:HttpContextContract) {
        const ext_value = new ExtensionValue() 
        const value = await request.validate(ExtValueValidator)
        //data.ext_associate_id = request.input('table_ext_id')
        await ext_value.merge({...value}).save() 
        return response.status(201).json(ext_value)
    }
    async index({response}:HttpContextContract) {
    
        const extensions = await  Database.from('extensions').select('*')
        return response.status(200).send(extensions)

   } 


} 
