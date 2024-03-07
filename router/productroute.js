const express = require("express");
const route = express.Router();


const { authlogin, admin } = require("../middleware/userauth");
const { Addproduct, Allproduct, singleproduct, Editproduct, Deleteproduct, categorydata, searchdata, checkout, sessionid } = require("../controller/productcontroller");
const upload = require("../middleware/photoup")

route.post("/create-checkout-session", checkout)
route.post("/addproduct", upload.single("productImage"), authlogin, admin, Addproduct)
route.get("/allproduct", Allproduct)
route.get("/singleproduct/:id", singleproduct)
route.put("/editproduct/:id", upload.single("productImage"), authlogin, admin, Editproduct);
route.delete("/deleteproduct/:id", authlogin, admin, Deleteproduct)
route.get("/product/:category", categorydata)
route.get("/search/:keyword", searchdata)
route.get("/payment/:sessionId", sessionid)

module.exports = route;