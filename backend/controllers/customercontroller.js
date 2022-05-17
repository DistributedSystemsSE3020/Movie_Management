const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const Customer = require('../models/Customer');
const sendEmail = require("../utils/sendEmail")

//customer sign in controller
exports.customersignin = async(req, res) => {
    const {email, password} = req.body;

    // Check if email and password is provided
    if (!email || !password)
        return res.status(400).json({message: "Please provide an email and password" });

    try{
        //finding customer by email
        const customer = await Customer.findOne({email}).select("+password");
        
        //if customer doesn't exist
        if (!customer) 
            return res.status(404).json({message: "User doesn't exist"});

        //compare the provided password with the password in the database
        const ispasswordCorrect = await bcrypt.compare(password, customer.password);

        //if passwords don't match
        if (!ispasswordCorrect)
            return res.status(400).json({message: "Invalid credentials"});

        //creating a token
        const token = jwt.sign({email: customer.email, id: customer._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the customer object and token as the response
        res.status(200).json({success: true, result: customer, token})
    }catch(error){
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//customer sign up controller
exports.customersignup = async(req,res) => {
    const {firstname, lastname, email, nic, phone, address, password, imgUrl} = req.body;

    try {
        //checking email already exists
        const checkEmail = await Customer.findOne({email})
        const checkNIC = await Customer.findOne({nic})

        if(checkEmail)
            return res.status(409).json({message: "User with this email already exists"})
        
        if(checkNIC)
            return res.status(409).json({message: "User with this NIC already exists"})

        //creating a new customer
        const customer = await Customer.create({firstname, lastname, email, nic, phone, address, password, imgUrl});

        //creating a token
        const token = jwt.sign({email: customer.email, id: customer._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //sending the customer object and token as the response
        res.status(200).json({success: true, result: customer, token})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message})
    }
}

//update customer controller
exports.updateCustomer = async(req,res) => {
    let customerID = req.params.id;

    const {firstname, lastname, email, nic, phone, address, imgUrl} = req.body;

    //object with provided data
    const updateCustomer = {
        firstname, lastname, email, phone, address, imgUrl
    }

    try {
        //find customer by customerID and update the customer with provided data
        await Customer.findByIdAndUpdate(customerID, updateCustomer);

        //sending the status message successful
        res.status(200).json({success: true, message: "Profile updated successfully"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//delete customer controller
exports.deleteCustomer = async(req,res) => {
    let customerID = req.params.id;

    try {
        //find customer by customerID and delete it
        await Customer.findByIdAndDelete(customerID);

        //sending the status message successful
        res.status(200).json({success: true, message: "customer deleted"})
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
}

//Forgot Password controller
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
        //finding customer by email
        const customer = await Customer.findOne({ email });
  
        //if customer doesn't exist
        if (!customer)
            return res.status(404).json({message: "No user with this email"});
  
        // Reset Token Gen and add to database hashed (private) version of token
        const resetPasswordToken = customer.getResetPasswordToken();
    
        await customer.save();
    
        // Create reset url to email to provided email
        const resetPasswordUrl = `http://localhost:3000/customer/passwordreset/${resetPasswordToken}`;
    
        // HTML Message
        const message = `
            <h1>You have requested a password reset</h1>
            <p>Please make a put request to the following link:</p>
            <a href=${resetPasswordUrl} clicktracking=off>${resetPasswordUrl}</a>
        `;
    
        try {
            //sending the the email
            await sendEmail({to: customer.email, subject: "Password Reset Request", text: message});
    
            res.status(200).json({ success: true, data: "Email Sent" });
        } catch (error) {
            
            //if the email sending failed remove reset token
            customer.resetPasswordToken = undefined;
            customer.resetPasswordExpire = undefined;
    
            await customer.save();
    
            res.status(500).json({message: "Email could not be sent", error: error.message});
        }
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//Reset Password controller
exports.resetPassword = async (req, res) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetPasswordToken).digest("hex");
  
    try {
        //check whether a user exists with same reset password token and expiration time greater than current time
        const customer = await Customer.findOne({resetPasswordToken,resetPasswordExpire: { $gt: Date.now() },});
  
        if (!customer)
            return res.status(400).json({message: "Invalid Token", error: error.message});

        //saving the new password
        customer.password = req.body.password;

        //remove the reset password token
        customer.resetPasswordToken = undefined;
        customer.resetPasswordExpire = undefined;
    
        await customer.save();

        //creating a token
        const token = jwt.sign({email: customer.email, id: customer._id}, process.env.JWT_SECRET, {expiresIn: "1h"})
    
        res.status(201).json({success: true, result: customer, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong", error: error.message});
    }
};

//fetch customers controller
exports.fetchAll = async(req,res) => {

    try {
        //find all customers in the database
        const customers = await Customer.find();

        res.status(200).json({success: true, result: customers})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}

//fetch one customer controller
exports.fetchOne = async(req,res) => {
    let customerID = req.params.id;

    try {
        //find customer with the specific id
        const customer = await Customer.findById(customerID);

        res.status(200).json({success: true, result: customer})
    } catch (error) {
        res.status(500).json({success: false, message: "Something went wrong", error: error.message});
    }
}