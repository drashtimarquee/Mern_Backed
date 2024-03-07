const { compare } = require("bcryptjs");
const Productmodel = require("../models/productmodel");
const Paymentmodel = require('../models/Paymentmodel');
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.SECRET_STRIPE_KEY)

exports.demo = (req, res) => {
    res.send("user running");
}

exports.Addproduct = async (req, res) => {

    try {
        const { productName, productPrice, productDescription, category } = req.body;
        const file = req.file.filename;
        if (!productName || !productPrice || !productDescription || !category) {
            return res.status(400).send("Fill Your All Fields");
        }
        const newproduct = new Productmodel({
            productName, productPrice, productDescription, category, productImage: file,
        })
        const saveproduct = await newproduct.save();
        res.status(200).send({ message: "Succesfully Create Product", saveproduct });

    } catch (error) {
        res.status(400).send({ error, message: "Error To Create Product" })
    }
}

exports.Allproduct = async (req, res) => {

    try {
        const products = await Productmodel.find({}).sort({ createdAt: -1 });
        res.status(200).send({ message: "All Product Get Succesfully", products });

    } catch (error) {
        res.status(400).send({ message: "Error To Get All Products", error })
    }
}

exports.categorydata = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Productmodel.find({ category }).sort({ createdAt: -1 });

        res.status(200).send({ message: `Products For Category ${category} Retrieved Successfully.`, products });
    } catch (error) {
        res.status(400).send({ message: "Error Fetching Category Data", error });
    }
}

exports.singleproduct = async (req, res) => {

    try {
        const { id } = req.params;
        const product = await Productmodel.findOne({ _id: id });
        res.status(200).send({ message: " Single Product Found ", product })

    } catch (error) {
        res.status(400).send({ message: " Error To Get One Product", error })
    }
}

exports.Editproduct = async (req, res) => {

    try {
        const { id } = req.params;
        const { productName, productPrice, productDescription, category, productImage } = req.body;
        const file = req.file ? req.file.filename : productImage;
        const updateproduct = await Productmodel.findByIdAndUpdate(
            { _id: id }, { productName, productPrice, productDescription, category, productImage: file }
        );
        res.status(200).send(updateproduct);

    } catch (error) {
        res.status(404).send({ message: "Error To Update Product", error });
    }

}

exports.Deleteproduct = async (req, res) => {

    try {
        await Productmodel.findByIdAndDelete({ _id: req.params.id })
        res.status(200).send("Product Delete Succesfully");

    } catch (error) {
        res.status(400).send({ message: "Error To Delete Function", error })
    }
}

exports.searchdata = async (req, res) => {
    try {
        const { keyword } = req.params;
        const result = await Productmodel.find({
            $or: [
                { productName: { $regex: keyword, $options: "i" } },
                { productDescription: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } }
            ]
        })
        res.json(result);
        console.log(result);
    } catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: "Error In Search Product API", error });
    }
}

exports.checkout = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        const line_items = req.body.cart.map(item => {
            return {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.productName,
                        description: item.productDescription,
                    },
                    unit_amount: item.productPrice * 100,
                },
                quantity: item.count,
            }
        })

        const session = await stripe.checkout.sessions.create({
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 0,
                            currency: 'usd',
                        },
                        display_name: 'Free shipping',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 5,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 7,
                            },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: {
                            amount: 1500,
                            currency: 'usd',
                        },
                        display_name: 'Next day air',
                        delivery_estimate: {
                            minimum: {
                                unit: 'business_day',
                                value: 1,
                            },
                            maximum: {
                                unit: 'business_day',
                                value: 1,
                            },
                        },
                    },
                },
            ],

            payment_method_types: ['card'],
            phone_number_collection: {
                enabled: true,
            },
            line_items,
            mode: 'payment',
            success_url: 'http://localhost:3000/Success',
            cancel_url: 'http://localhost:3000/Cart',

        });

        const payment = new Paymentmodel({
            sessionId: session.id,
            userId: req.body.userId,
            cart: req.body.cart,
            shippingAddress: {
                firstName: req.body.Fname,
                lastName: req.body.Lname,
                phoneNumber: req.body.Phnno,
                email: req.body.Email,
                address: req.body.Address,
                city: req.body.City,
                state: req.body.State,
                zipcode: req.body.Zipcode,
            },
            status: 'Pending',
        });

        await payment.save();
        console.log('Stripe Session:', session);
        res.status(200).send({ url: session.url });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(400).send({ error: error.message });
    }
}

exports.sessionid = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const sessionData = await Paymentmodel.findOne({ sessionId });

        if (sessionData) {
            res.status(200).json({ success: true, sessionData });
        } else {
            res.status(404).json({ success: false, message: "Session not found" });
        }
    } catch (error) {
        console.error('Error fetching session data:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}