const express = require("express");
const registerController = require("../controllers/registerController")
const loginController = require("../controllers/loginController");
const { requireSignIn,isAdmin } = require("../middleware/authToken");
const  forgotPasswordController  = require("../controllers/forgotPasswordController");
const updateprofileController = require("../controllers/updateprofileController");
//router object
const router = express.Router()

//routing
//Register || Method Post
router.post('/register',registerController)
router.post('/login',loginController)

// protected route for user 
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
  });

  // protected route for admin 
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

  //forgoet password route
  router.post("/forgot-password",forgotPasswordController)

  //update profile
  router.put("/profile",requireSignIn,updateprofileController)

module.exports = router ;
