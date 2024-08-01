const categoryModel = require("../models/categoryModel");

const deletecategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting",
      error,
    });
  }
};

module.exports = deletecategoryController;
