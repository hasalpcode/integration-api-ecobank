// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ShopsController {

    // Remember to reference the PaypalController at the top
 PaypalController = require('App/Controllers/Http/PaypalController')
 Paypal = new this.PaypalController()

// Method to make the payment in the PayPal API.
async tryPay({ response }) {
  const success_url = this.Paypal.getSuccessURL()
  const error_url = this.Paypal.getErrorURL()
  // Create the payment object
  var payment = {
    "intent": "authorize",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": success_url,
      "cancel_url": error_url
    },
    purchase_units: [
        {
          amount: {
            currency_code:this.Paypal.currency,
            value:this.Paypal.getAmount,
          },
        },
      ],
  }
  await this.Paypal.createOrder( payment )
    // Indicates that the payment was successful
    .then( ( transaction ) => {
      var links = transaction.links;
      var counter = links.length;
      while( counter -- ) {
        if ( links[counter].method == 'REDIRECT') {
          // Redirect to PayPal where the user approves the transaction
          return response.redirect( links[counter].href )
        }
      }
    })
    // Indicates that the payment was failed
    .catch( ( err ) => {
      var details = err.response
      if(err.response.httpStatusCode == 401) {
        return response.redirect(error_url + '?name=' + details.error + '&message=' + details.error_description);
      }
      else {
        return response.redirect(error_url + '?name=' + details.name + '&message=' + details.message);
      }
    });
}
}
