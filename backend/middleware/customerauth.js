const jwt = require("jsonwebtoken");

//this will check the customer is verified
customerAuth = async (req,res,next) => {
    try {

        let token

        if(!req.headers.authorization)
            res.status(401).json({success: false, message: "No authorization header found"})

        //checking the token type is Customer
        if(req.headers.authorization.startsWith("Customer")){
            //token is an array, this will take the data in the first index
            token = req.headers.authorization.split(" ")[1];
        }
        
        //get data from token
        let decodedData;
        decodedData = jwt.verify(token, process.env.JWT_SECRET);

        //add customer id to request
        req.customerID = decodedData?.id;

        //if all data is valid pass to next step
        next();
    } catch (error) {
        res.status(401).json({success: false, message: "Customer Authentication failed", error: error.message})
    }
}

module.exports = customerAuth;