const Usermodel = require("../models/usermodels");
const jwt = require('jsonwebtoken');
require("dotenv").config();


exports.authlogin = (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.KEY)
        req.user = decode;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: "login first" })
    }
}

exports.admin = async (req, res, next) => {
    try {
        const user = await Usermodel.findById(req.user._id);
        if (user.Role !== 1) {
            return res.status(401).send({
                success: false,
                message: "unauthorizes access"
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
        return res.status(401).send({ message: "unauthorizes access" })
    }
}