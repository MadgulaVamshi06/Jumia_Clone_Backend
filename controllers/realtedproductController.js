const productModel = require("../models/productModel");
const mongoose = require('mongoose');

const realtedproductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(pid) || !mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).send({
        success: false,
        message: "Invalid product or category ID",
      });
    }

    const products = await productModel.find({
      category: cid,
      _id: { $ne: pid }
    }).select("-photo").limit(3).populate("category");

    res.status(200).send({
      success: true,
      message: "Similar products found",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting related products",
      error,
    });
  }
};

module.exports = realtedproductController;
