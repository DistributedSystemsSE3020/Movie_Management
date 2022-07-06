const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    movieid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'movie',
        required : true

    },
    
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'customer',
        required : true
    },

    quantity : {
        type : Number,
        required : true
    },

    type : {
        type : String,
        required : true
    },

    total : {
        type : Number,
        required : true
    }


})

const Cart = mongoose.model("cart",CartSchema)
module.exports = Cart