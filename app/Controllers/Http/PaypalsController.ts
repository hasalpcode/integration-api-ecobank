import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//app/Controllers/Http/PaypalController.js 
import Env from '@ioc:Adonis/Core/Env'
import { HttpContext, Response } from '@adonisjs/core/build/standalone';

'use strict'

const rp = require('request-promise')
var paypal = require('paypal-rest-sdk');


const client_id= Env.get('PAYPAL_CLIENT_ID');
const client_secret= Env.get('PAYPAL_CLIENT_SECRET');
const base = "https://api.sandbox.paypal.com";

paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': client_id,
  'client_secret': client_secret
});
import Ws from '../../services/ws'
import { Event, Socket } from 'socket.io';
import { http } from 'Config/app';
import WebhooksController from './WebhooksController';
import request from 'request';
Ws.boot()

import slr from 'socketio-live-reload';
import { StrictEventEmitter } from 'socket.io/dist/typed-events';
/**
 * Listen for incoming socket connections
 */


var content = "not approved"
export default class PaypalsController {
idOrder = ""
public statehook=""
  async  createOrder({request}:HttpContextContract) {
    const accessToken = await this.getToken();
    const url = `${base}/v2/checkout/orders`;
    const currency = request.input('currency')
    const getAmount = request.input('amount')
    const response = await rp(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value:getAmount,
            },
          },
        ],
        
        return_url: "http://localhost:4200/portail/home",
        cancel_url: "http://localhost:4200/portail/home"
        
        
      }),
    });
    this.idOrder = JSON.parse(response).id 

   
    //const capture = this.webHookResponse(request:)
    //return (JSON.parse(response).id)
    let token = accessToken
    return JSON.parse(response)
   
  }

  

  

   
  async getToken() {
    const auth = Buffer.from(client_id + ":" + client_secret).toString('base64')
    const result = await rp(`${base}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }).then((res)=>{
      return res
    })
    
  
  return (JSON.parse(result).access_token)
  }



  async capturePayment( {params}:HttpContextContract) {
    const orderId = params.orderID
    
    const accessToken = await this.getToken();
    
  const url = `${base}/v2/checkout/orders/${orderId}/capture`;
  const response = await rp(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log(response)
  
    //return (JSON.parse(response));
  } 

  async webHookResponse({request}:HttpContextContract){
    console.log('inwebhook');
    
    var response = request.all()
    content = response.resource.status
    console.log(response)
    Ws.io.emit('message',content) // notification du statut de la transaction
  }

  
}
Ws.io.on('connection', async (socket) => {
  socket.emit('news','comminucation avec le serveur cote backend')
})