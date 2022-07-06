const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MobileSchema = new Schema ({
    customerID:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
        //type: String,
        required: false
    },

    type:{
        type:String,
        required:true,
       
    },

    pin:{
        type:String,
        required:true,

    },

    phonenumber:{
        type:String,
        required:true,
    },

    name:{
        type: String,
        required: true,
    }
})

const MobilePay = mongoose.model("mobile", MobileSchema);
module.exports = MobilePay;