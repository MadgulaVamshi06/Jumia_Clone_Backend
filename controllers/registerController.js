const userModel = require("../models/userModel");
const {hashPassword} = require("../helpers/authHelper.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, answer,address } = req.body;

    //validation
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!answer) {
      return res.send({ message: "Answer is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save the user
    const user = await new userModel({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
      answer
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registration ",
      error: true,
    });
  }
};

module.exports = registerController;
