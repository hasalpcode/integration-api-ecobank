import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
const rp = require('request-promise')
import Ws from '../../services/ws'

Ws.boot()

const client_id= Env.get('ECOBANK_CLIENT_ID');
const client_secret= Env.get('ECOBANK_CLIENT_SECRET');
const base = "https://developer.ecobank.com";

export default class EcobankCardsController {

    async getToken() {
      
        const result = await rp(`${base}/corporateapi/user/token`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Origin: 'developer.ecobank.com'
            
          },
          body: JSON.stringify({
            userId: client_id,
            password: '$2a$10$Wmame'+client_secret
          }),
          
        }).then((res)=>{
          
          return res
        })
        
      
      return (JSON.parse(result).token)
      }

      // by card
      async  cardPayment({request}:HttpContextContract) {
        const accessToken = await this.getToken();
        const url = `${base}/corporateapi/merchant/card`;
        const currency = request.input('currency')
        const amount = request.input('amount')
        // const productCode = request.input('productCode')
        // const locale = request.input('locale')
        // const orderInfo = request.input('orderInfo')
        const requestId = request.input('requestId')
        const response = await rp(url, {
          method: "post",
          headers: {
            "Accept": "application/json",
            "Origin": "developer.ecobank.com",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            paymentDetails: {
              requestId: 44,
              "productCode":"GMT112",
              amount: amount,
              currency: currency,
              "locale": "en_AU",
              "orderInfo": "255s353",
              "returnUrl": "https://570f-154-125-15-31.eu.ngrok.io"
            },
            merchantDetails: {
              "accessCode": "79742570",
              "merchantID": "ETZ001",
              "secureSecret": "sdsffd"
            },
            "secureHash":"7f137705f4caa39dd691e771403430dd23d27aa53cefcb97217927312e77847bca6b8764f487ce5d1f6520fd7227e4d4c470c5d1e7455822c8ee95b10a0e9855",
          }),
        });

        return JSON.parse(response)
       
      }
      async webHookResponse({request}:HttpContextContract){
        console.log('inwebhook');
        
        var response = request.all()
        //var content = response.resource.status
        console.log(response)
       // Ws.io.emit('message',content) // notification du statut de la transaction
      }

    
}
