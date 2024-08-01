const productModel = require("../models/productModel");

const searchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await productModel.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } }, 
        { description: { $regex: keyword, $options: 'i' } },
      ],
    }).select("-photo");
    
    res.json(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error in search product api',
      error,
    });
  }
};

module.exports = searchController;
