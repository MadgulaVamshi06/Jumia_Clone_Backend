const braintree = require("braintree");
const orderModel = require("../models/orderModel");

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID, 
  publicKey: process.env.PUBLIC_KEY,  
  privateKey: process.env.PRIVATE_KEY 
});

const brainTreePaymentController = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    let total = 0;
    cart.forEach((i) => {
      total += i.price;
    });

    gateway.transaction.sale(
      {
        amount: total.toFixed(2), // Ensure the total amount is in correct format
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (result) {
          try {
            const order = new orderModel({
              products: cart,
              payment: result,
              buyer: req.user._id,
            });
            await order.save();
            res.json({ ok: true });
          } catch (saveError) {
            res.status(500).send(saveError);
          }
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send("Error in processing payment");
  }
};

module.exports = brainTreePaymentController;
