const categoryModel = require("../models/categoryModel");
const productModel = require("../models/productModel");

const productcategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    const products = await productModel.find({ category: category._id }).populate("category");
    
    res.status(200).send({
      success: true,
      message: "Category Product",
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting Products",
      error,
    });
  }
};

module.exports = productcategoryController;
