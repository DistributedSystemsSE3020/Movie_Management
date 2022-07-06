const MobileBill = require("../models/MobileBill");

exports.addMobilePayment = async(req, res) => {
    const{ customerID, type, pin, phonenumber, name} = req.body; 
    
    try{
        //creating a new payment menthod
        const card = await MobileBill.create({customerID, type, pin, phonenumber, name});

        
        res.status(200).json ({success:true,message:"mobile payment added",card})
     }catch(error){
         res.status(500).json({message: "unable to add mobile payment",error:error.message});
     }
}



// exports.fetchAll = async (req, res) => {
//     if (req.params && req.params.id) {
//         const mobilePays = await MobileBill.find({'customerID': req.params.id})
//             .then(data => {
//                 res.status(200).send({data: data});
//             }).catch(error => {
//                 res.status(500).send({error: error.message});
//             });
//     }
// }

// exports.fetchOne = async(req,res)=>{
//     let cardID =req.params.id;

//     await CreditCard.findById(cardID)
//     .then((card)=>{
//         res.status(200).json(card)

//     }).catch((error)=>{
//         res.status(500).json({message:"fetching failed",error:error.message});
//     })
// }