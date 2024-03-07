const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config()
const secretkey = process.env.KEY;

const Productschema = new mongoose.Schema({

    productName:{
        type:String,
        require : true
    },
    productPrice:{
        type:Number,
        require : true
    },
   
    productDescription:{
        type:String,
        require : true
    },
    category:{
        type:String,
        require : true
    },
    productImage:{
        type:String,
        require : true
    },

});

Productschema.methods.generatetoken = function () {
    try {
        let producttoken = jwt.sign({ _id: this._id }, secretkey);
        return producttoken;
    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoose.model("Product",Productschema);