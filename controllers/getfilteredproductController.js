const productModel = require("../models/productModel")


const getproductfilterController =async (req,res)=>{
try {
    const {checked, radio}= req.body
    let argument = {}
    if (checked.length > 0) argument.category = checked; 
    if (radio.length) argument.price = { $gte: radio[0], $lte: radio[1] };
    
    const products = await productModel.find(argument);
    res.status(200).send({
      message : "filtered success",
      success : true,
      products,
    })
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in filtering product",
      error,
    });
}
}

module.exports = getproductfilterController