import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Extension from 'App/Models/Extension'
import ExtensionAssociation from 'App/Models/ExtensionAssociation'
import ExtensionValue from 'App/Models/ExtensionValue'
import ExtAssValidator from 'App/Validators/ExtAssValidator'
import ExtensionValidator from 'App/Validators/ExtensionValidator'
import ExtValueValidator from 'App/Validators/ExtValueValidator'

export default class ExtensionAssociationsController {
    async  store({request,response}:HttpContextContract) {
        
        const extension =  new Extension()
        const ext_association = new ExtensionAssociation()
        
        const data_ext_as = await request.validate(ExtAssValidator)
        await ext_association.merge({...data_ext_as}).save()

        const name = request.input('name')
       
        extension.name = name
        extension.id_ext_association = ext_association.id
        await extension.save()
        
        return response.status(201).json(extension.id)
    }

    async  extension({response,params}:HttpContextContract) {
        //const extension = await Database.from('extension_associations as ea').innerJoin(.)
        const extension_association = new ExtensionAssociation()

        
        const extension =  await ExtensionAssociation.query().where('id',params.id)
       
        return response.status(201).json(extension)
    }
}
