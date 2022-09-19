import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Ws from '../../services/ws'

Ws.boot()


/**
 * Listen for incoming socket connections
 */

class WebhooksController {
    public statehook = ""
    
     async webHook({request}:HttpContextContract){
        console.log('inwebhook');
    
          //const response = await request.all()
          const respons = request.all();
          //console.log(respons.resource.status)
          //console.log(respons.resource.id)
          console.log(respons);
        
          return respons.resource.status
   
    }

  
}

export default new WebhooksController()
