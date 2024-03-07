const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretkey = process.env.KEY;

const OrderSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: true,
    },
    Lname: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Phnno: {
        type: Number,
        required: true
    },
    Address: {
        type: String,
        required: false
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Zipcode: {
        type: Number,
        required: true
    },
    Status: {
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
        default: 'Pending',
    },
});

OrderSchema.methods.generatetoken = function () {
    try {
        let ordertoken = jwt.sign({ _id: this._id }, secretkey);
        return ordertoken;
    } catch (error) {
        console.error(error);
        throw new Error("Token generation failed");
    }
};

const Ordermodel = mongoose.model("order", OrderSchema);
module.exports = Ordermodel;