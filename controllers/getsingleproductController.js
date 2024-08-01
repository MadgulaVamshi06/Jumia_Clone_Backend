const productModel = require("../models/productModel");

const getsingleproductController = async (req,res) => {
  try {
    const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
    res.status(200).send({
        success: true,
        message: "single product",
        product
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting single products",
      error,
    });
  }
};

module.exports = getsingleproductController;
