const express = require("express")
const { requireSignIn, isAdmin } = require("../middleware/authToken")
const categoryController = require("../controllers/categoryController")
const categoryupdateController = require('../controllers/categoryupdateController')
const getcategoryController = require("../controllers/allcategoryController")
const singlecategoryController = require('../controllers/singlecategoryController')
const deletecategoryController = require("../controllers/deletecategoryController")
//router object
const router = express.Router()


//create 
router.post('/create-category',requireSignIn,isAdmin,categoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,categoryupdateController)

//get category
router.get('/get-category',getcategoryController)


// get single cateogry
router.get('/single-category/:slug',requireSignIn,isAdmin,singlecategoryController)

// delete category
router.delete("/delete-category/:id",requireSignIn,isAdmin,deletecategoryController)
module.exports = router ;