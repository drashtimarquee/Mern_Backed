const express = require("express");
const { register, Login, Alluser, singleuser, Edituser, forgotpassword, getorder, Allorder, orderstatus } = require("../controller/usercontroller");
const { demo } = require("../controller/usercontroller");
const { authlogin, admin } = require("../middleware/userauth");

const route = express.Router();

route.get("/use", demo);

route.post("/register", register);
route.get("/alluser", Alluser)

route.post("/Login", Login);
route.post("/forgotpassword", forgotpassword)

route.post("/userorder", getorder)
route.get("/allorder", Allorder)
route.put("/updateOrderStatus/:id", authlogin, admin, orderstatus)

route.put("/edituser",authlogin, Edituser)
route.get("/loginverify", authlogin, (req, res) => {
    res.send({ ok: "User Verify Successfully" });
});

route.get("/adminverify", authlogin, admin, (req, res) => {
    res.send({ ok: "Admin Verify Successfully" });
});

route.get("/alluser", Alluser)

module.exports = route;