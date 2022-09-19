import Ws from 'App/Services/Ws'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import WebhooksController from 'App/Controllers/Http/WebhooksController'
import ws from 'App/Services/Ws'
import { http } from 'Config/app'
import PaypalsController from 'App/Controllers/Http/PaypalsController'


Ws.boot()

WebhooksController
/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', async (socket) => {

  socket.emit('news',{'hello': 'HELLO'})

  socket.emit('message',PaypalsController)
  socket.on('my other event', (data) => {
    console.log(data)
  })
 
})