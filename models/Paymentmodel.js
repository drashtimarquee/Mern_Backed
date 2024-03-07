const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
require("dotenv").config();
const secretkey = process.env.KEY;

const paymentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    cart: {
        type: Array,
        required: true,
    },
    shippingAddress: {
        firstName: String,
        lastName: String,
        phoneNumber: String,
        email: String,
        address: String,
        city: String,
        state: String,
        zipcode: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed'],
        default: 'Pending',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

paymentSchema.methods.generateToken = function () {
    try {
        let paymentToken = jwt.sign({ _id: this._id }, secretkey);
        return paymentToken;
    } catch (error) {
        console.error(error);
        throw new Error("Token generation failed");
    }
};

paymentSchema.statics.findBySessionId = async function (sessionId) {
    try {
        const payment = await this.findOne({ sessionId });
        return payment;
    } catch (error) {
        console.error(error);
        throw new Error("Error fetching payment by session ID");
    }
};


const Paymentmodel = mongoose.model('Payment', paymentSchema);
module.exports = Paymentmodel;

// const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');
// require("dotenv").config();
// const secretkey = process.env.KEY;

// const Paymentchema = new mongoose.Schema({

//     amount: Number,
//     customerId: String,
// }, { timestamps: true });

// Paymentchema.methods.generatetoken = function () {
//     try {
//         let paymenttoken = jwt.sign({ _id: this._id }, secretkey);
//         return paymenttoken;
//     } catch (error) {
//         console.error(error);
//         throw new Error("Token generation failed");
//     }
// };

// const Paymentmodel = mongoose.model("payment", Paymentchema);
// module.exports = Ordermodel;