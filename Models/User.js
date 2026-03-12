const mongoose = require('mongoose');
const validator = require('validator');
const schema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required.'],
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email:{
        type:String,
        required:[true, 'Email is Required.'],
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validator.isEmail, 'Please provide valid email.']

    },
    phone:{
        type:String,
        required:[true, 'Phone is Required.']
    },
    role:{
        type:String,
        enum:["user","guide","admin"],
        default:"user"
    },
    profile:{
        type:String,
        default:"default.jpg"
    },
    isActive:{
        type:Boolean,
        default:true
    }
},{
    timestamps:true
});