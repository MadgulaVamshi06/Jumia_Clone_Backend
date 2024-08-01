const orderModel = require("../models/orderModel");

const getOrdersController = async (req,res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error while getting Orders",
        error,
      });
  }
};

module.exports = getOrdersController;
