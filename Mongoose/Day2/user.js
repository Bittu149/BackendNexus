const mongoose = require('mongoose');
const {Schema} = mongoose;
// Schema level validations
const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:20

    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        min:18,
        max:80

    },
    gender:{
        type:String,
        enum:["male","female","others"]
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
       type:String,
       default:"This is default photo url"
    }

},{timestamps:true})

const User = mongoose.model("User", userSchema);

module.exports = User;