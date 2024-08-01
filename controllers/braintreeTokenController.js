const dotenv = require("dotenv");
const braintree = require("braintree");
dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID, 
  publicKey: process.env.PUBLIC_KEY,  
  privateKey: process.env.PRIVATE_KEY 
});
const braintreeTokenController = async (req, res) => {
    try {
      gateway.clientToken.generate({}, function (err, response) {
        if (err) {
          return res.status(500).send(err);
        }
        res.send(response);
      });
    } catch (error) {
      console.log(error);
      res.status(500).send("Error in generating token");
    }
  };
  
  module.exports = braintreeTokenController;
  