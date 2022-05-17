const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const MovieSchema =new Schema({

    name:{
        type:String,
        required:true,
    },
 
    director:{
        type:String,
        required:true
    },

    genre:{
        type:String,
        required:true
    },


    cast:{
        type:String,
        required:true
    },

    languages:{
        type:[String],
        required:true
    },

    description:{
        type:String,
        required:true
    },

    theaters:{
        type:[String],
        required:true
    },

    price:{
        type:String,
        required:true
    },


    availableDay:{
        type:[String],
        required:true
    },

    availableTimeFrom:{
        type:String,
        required:true
    },

    availableTimeTo:{
        type:String,
        required:true
    },

    imgUrl: {
        type: String,
        required: false
    },

})


const Movie = mongoose.model("movie",MovieSchema)
module.exports= Movie
