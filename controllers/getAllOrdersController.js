const orderModel = require("../models/orderModel");

const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1});

    res.json({
      success: true,
      message: "Orders retrieved successfully",
      orders,
    });
  } catch (error) {
    console.error("Error while getting all Orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while getting all Orders",
      error: error.message,
    });
  }
};

module.exports = getAllOrdersController;
