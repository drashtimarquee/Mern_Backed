const { compare } = require("bcryptjs");
const { hashpassword } = require("../middleware/helper");
const Usermodel = require("../models/usermodels")
const Ordermodel = require("../models/ordermodel");
const Paymentmodel = require('../models/Paymentmodel');

exports.demo = (req, res) => {
    res.send("user running");
}

exports.register = async (req, res) => {
    try {
        const { Fname, Lname, Email, Address, Password, Cpassword } = req.body;
        if (!Fname || !Lname || !Email || !Address || !Password || !Cpassword) {
            return res.status(400).send({ message: "Please Enter All Details " });
        }
        const userexist = await Usermodel.findOne({ Email });
        if (userexist) {
            return res.status(400).send({ message: "User Already Exists" });
        }
        const hash = await hashpassword(Password);
        const newuser = new Usermodel({ Fname, Lname, Email, Address, Password: hash, Cpassword });
        const usersave = await newuser.save();
        res.status(200).send({ message: "User Registered Successfully", user: usersave });

    } catch (error) {
        res.status(400).send({ message: "User Register Fail", error });
    }
}

exports.Login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        if (!Email || !Password) {
            return res.status(400).send("Please Enter Your Email And Password");
        }
        const user = await Usermodel.findOne({ Email });
        if (!user) {
            return res.status(400).send("User Does Not Exist");
        }
        const match = await compare(Password, user.Password);
        if (!match) {
            return res.status(400).send({ message: "Invalid Password" });
        }
        const token = await user.generatetoken();
        res.status(200).send({ message: "User Login Successful", token, user });
    } catch (error) {
        res.status(400).send({ message: "User Login Failed", error });
    }
};

exports.Edituser = async (req, res) => {
    try {
        const { Fname, Lname, Email, Address } = req.body;
        const updateuser = await Usermodel.findByIdAndUpdate(req.user._id, { Fname, Lname, Address, Email }, { new: true })
        res.status(200).send({ message: " User Update Succesfully", updateuser });
    } catch (error) {
        res.status(400).send({ message: "User Update Failed", error })
    }
}

exports.Alluser = async (req, res) => {
    try {
        const user = await Usermodel.find({}).sort({ createdAt: -1 });
        res.status(200).send({ message: "All User Get Succesfully", user });
    } catch (error) {
        res.status(400).send({ message: "Error To Get All User", error });
    }
}

exports.forgotpassword = async (req, res) => {
    try {
        const { Email, newpassword } = req.body;
        if (!Email || !newpassword) {
            return res.status(400).send({ message: "Please Fill All Your Fields" });
        }
        const user = await Usermodel.findOne({ Email: Email });
        if (!user) {
            return res.status(400).send({ message: "User Not Existed, Please Signup" });
        }
        const hash = await hashpassword(newpassword);
        const updatepassword = await Usermodel.findByIdAndUpdate(user._id, { Password: hash }, { new: true });
        res.status(200).send({ message: "Password Reset Successfully", user: updatepassword });
    } catch (error) {
        res.status(400).send({ message: "Forgot Password Failed", error });
    }
};

exports.getorder = async (req, res) => {
    try {
        const { Fname, Lname, Email, Phnno, Address, City, State, Zipcode } = req.body;

        const neworder = new Ordermodel({
            Fname, Lname, Email, Phnno, Address, City, State, Zipcode, Status: 'Pending'
        });

        const ordersave = await neworder.save();
        res.status(200).send({ message: "User order Successfully", userorder: ordersave });
    } catch (error) {
        res.status(400).send({ message: "User order Fail", error });
    }
};

exports.Allorder = async (req, res) => {
    try {
        const order = await Paymentmodel.find({}).sort({ createdAt: -1 });
        res.status(200).send({ message: "All Order Get Succesfully", order });
    } catch (error) {
        res.status(400).send({ message: "Error To Get All Order", error });
    }
}

exports.orderstatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const orders = await Ordermodel.findById(id);

        res.status(200).send({ message: 'Order status updated successfully', orders });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
}