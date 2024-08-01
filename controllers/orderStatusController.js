const orderModel = require("../models/orderModel");

const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
   
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { status }, 
      { new: true }
    );
    res.json(order);
  } catch (error) {
    console.error("Error while updating status of Orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while updating status of Orders",
      error
    });
  }
};

module.exports = orderStatusController;
