const categoryModel = require("../models/categoryModel");

const singlecategoryController = async(req,res)=>{
try {
    const category = await categoryModel.findOne({slug:req.params.slug});
    res.status(200).send({
        success : true,
        message:"single category List success",
        category,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting  category",
      error,
    });
}
}

module.exports = singlecategoryController