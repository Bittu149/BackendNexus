const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true

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
        type:String
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    photo:{
       type:String 
    }

})

const User = mongoose.model("User", userSchema);

module.exports = User;