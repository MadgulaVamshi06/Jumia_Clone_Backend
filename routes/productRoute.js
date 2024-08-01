const express = require("express");
const { requireSignIn, isAdmin } = require("../middleware/authToken");
const createproductController = require("../controllers/createproductController");
const formidableMiddleware = require("express-formidable");
const getproductController = require("../controllers/getproductController");
const getsingleproductController = require("../controllers/getsingleproductController");
const getproductphotoController = require("../controllers/getproductphotoController");
const deleteproductController = require("../controllers/deleteproductController");
const updateproductController = require("../controllers/updateproductController")
const getproductfilterController = require('../controllers/getfilteredproductController')
const countController = require("../controllers/countController")
const productlistController = require("../controllers/productlistController")
const searchController = require("../controllers/searchController");
const realtedproductController = require("../controllers/realtedproductController");
const productcategoryController = require("../controllers/productcategoryController");
const braintreeTokenController = require("../controllers/braintreeTokenController")
const  braintreePaymentController = require("../controllers/braintreePaymentController");
const getOrdersController = require("../controllers/getOrdersController");
const getAllOrdersController = require("../controllers/getAllOrdersController");
const orderStatusController = require("../controllers/orderStatusController");
const router = express.Router();

// routes
router.post("/create-product", requireSignIn, isAdmin, formidableMiddleware(), createproductController);

// get products
router.get("/get-product",getproductController)


// get single product
router.get("/get-product/:slug",getsingleproductController)

//get photo 
router.get("/get-product-photo/:pid",getproductphotoController)


// delete product
router.delete("/delete/:pid",requireSignIn, isAdmin, formidableMiddleware(),deleteproductController)


// update  product
router.put("/update-product/:pid", requireSignIn, isAdmin, formidableMiddleware(), updateproductController);

// filter product
router.post("/product-filter",getproductfilterController)

//product count
router.get("/product-count",countController)

//product-per-page
router.get("/product-list/:page",productlistController)

//search product
router.get("/search/:keyword",searchController)

//similar product
router.get("/related-product/:pid/:cid",realtedproductController)

//category wise product
router.get("/category-product/:slug",productcategoryController)

//payment route
router.get("/braintree/token",braintreeTokenController)


// payment 
router.post('/braintree/payment',requireSignIn,braintreePaymentController)

//orders
router.get("/orders",requireSignIn,getOrdersController)

//all orders
router.get("/all-orders",requireSignIn,isAdmin,getAllOrdersController)

// status update

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

module.exports = router;


