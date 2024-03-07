const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config()
const secretkey = process.env.KEY;

const Userschema = new mongoose.Schema({
    Fname: {
        type: String,
        require: true
    },
    Lname: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Address: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },

    Cpassword: {
        type: String,
        require: true
    },
    Role: {
        type: Number,
        default:0
    },
})

Userschema.methods.generatetoken = function () {
    try {
        let usertoken = jwt.sign({ _id: this._id }, secretkey);
        return usertoken;
    } catch (error) {
        console.log(error)
    }
}

const Usermodel = mongoose.model("user", Userschema);
module.exports = Usermodel;