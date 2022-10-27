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


Route.get('/', 'EcobankCardsController.webHookResponse')
Route.group(()=>{  
}).prefix('/api').middleware('auth')

 

  Route.group(()=>{
  
  // card payment
  Route.post('/card', 'EcobankCardsController.cardPayment')
 
  Route.post('/getToken', 'EcobankCardsController.getToken') 
 // Route.post('/approvate/:id', 'PaypalsController.approvateOrder') 
  Route.post("/capture/:orderID",'PaypalsController.capturePayment' )
  //Route.post("/test",'WebhooksController.webHook' )
  Route.post("/test",'EcobankCardsController.webHookResponse' )
  // generer terminal pour le marchanant
  Route.post("/qr_terminal",'EcobankQrsController.merchantQr' )

  Route.post("/qr_payment",'EcobankQrsController.dynamicQrPayment' )
  Route.post('/account_balance','EcobankCardsController.AccountBalance')

}).prefix('/api')
  // extension_association
  

