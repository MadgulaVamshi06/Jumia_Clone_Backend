const productModel = require("../models/productModel");


const deleteproductController = async ( req, res)=>{
 try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
        success: true,
        message:"Product Deleted Successfully"
    })
 } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting photo",
      error,
    });
  }
 }

module.exports = deleteproductController