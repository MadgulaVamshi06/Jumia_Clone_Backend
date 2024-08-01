const productModel = require("../models/productModel");

const countController = async (req,res) => {
  try {
    const total = await productModel.findOne({}).estimatedDocumentCount()
    res.status(200).send({
        success: true,
        total
      })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in product pagination or count",
      error,
    });
  }
};

module.exports = countController;
