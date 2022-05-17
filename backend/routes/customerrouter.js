const CustomerRouter = require("express").Router();
const customerauth = require('../middleware/customerauth');
const { customersignup, customersignin, updateCustomer, deleteCustomer} = require('../controllers/customercontroller.js');
const { forgotPassword, resetPassword, fetchAll, fetchOne} = require('../controllers/customercontroller.js')

//customer sign up
CustomerRouter.post('/signupC', customersignup);

//customer sign in
CustomerRouter.post('/signin', customersignin);

//customer update profile
CustomerRouter.put('/updateprofile/:id', customerauth, updateCustomer);

//customer delete profile
CustomerRouter.delete('/deleteprofile/:id', customerauth, deleteCustomer);

//customer forgotPassword
CustomerRouter.post('/forgotpassword', forgotPassword);

//customer resetPassword
CustomerRouter.put('/resetpassword/:resetPasswordToken', resetPassword);

//find all customers
CustomerRouter.get('/', fetchAll);

//find one customer
CustomerRouter.get('/:id', fetchOne);


module.exports = CustomerRouter;