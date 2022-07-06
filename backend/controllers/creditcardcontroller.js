const CardPayment = require("../models/CardPayment");

//adding a cardpayment
exports.addCardPayment = async(req, res) => {
    const{ customerID,amount,creditCardNumber} = req.body; 
    let today = new Date();
    const date = (today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear());
    try{
        //creating a new payment
        const payment = await CardPayment.create({customerID,amount,creditCardNumber, date});

        
        res.status(200).json ({success:true,message:"payment  added",payment})
     }catch(error){
         res.status(500).json({message: "unable to add the payment",error:error.message});
     }
}



