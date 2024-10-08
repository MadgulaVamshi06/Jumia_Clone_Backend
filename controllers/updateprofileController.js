const userModel = require("../models/userModel");
const {hashPassword} = require("../helpers/authHelper.js");


const updateprofileController = async(req,res)=>{
try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting profile",
      error,
    });
}
}

module.exports =updateprofileController