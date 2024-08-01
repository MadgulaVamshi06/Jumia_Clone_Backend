const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

const categoryupdateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;

    // Use the correct method name: findByIdAndUpdate
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating",
      error,
    });
  }
};

module.exports = categoryupdateController;
