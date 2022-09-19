/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Ws from 'App/Services/Ws'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(()=>{  
}).prefix('/api').middleware('auth')

 

  Route.group(()=>{
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login') 
  Route.post('/store', 'UsersController.store')
  Route.post('/update/:id', 'UsersController.update')
  Route.get('/user/:id', 'UsersController.show') 
  Route.delete('/delete/:id','UsersController.destroy')
  Route.get('/users', 'UsersController.index') 
  Route.post('/ext_ass/store', 'ExtensionAssociationsController.store')
  Route.get('/addextension', 'ExtensionAssociationsController.extension')
  Route.post('/ext_value/store', 'ExtensionsController.store')
  Route.get('/user_ext/:id', 'UsersController.user_ext')
  Route.get('/extensions', 'ExtensionsController.index') 
  // paypal
  Route.post('/order', 'PaypalsController.createOrder')
 
  Route.post('/getToken', 'PaypalsController.getToken') 
 // Route.post('/approvate/:id', 'PaypalsController.approvateOrder') 
  Route.post("/capture/:orderID",'PaypalsController.capturePayment' )
  //Route.post("/test",'WebhooksController.webHook' )
  Route.post("/test",'PaypalsController.webHookResponse' )

}).prefix('/api')
  // extension_association
  

