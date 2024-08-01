const productModel = require("../models/productModel");

const getproductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate('category')
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      TotalProducts : products.length,
      message: "Getting all products",
      products,

    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting products",
      error,
    });
  }
};

module.exports = getproductController;
