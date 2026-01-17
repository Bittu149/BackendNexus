const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require("bcrypt");
const  jwt = require('jsonwebtoken');
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

userSchema.methods.getJWT = function(){

    const secret = process.env.SECRET_KEY || "secretkey";
    const ans = jwt.sign({_id:this._id,emailId:this.emailId}, secret);
    return ans;
}

userSchema.methods.verifyPassword = async function(Uerpassword){
    const ans = await bcrypt.compare(Uerpassword, this.password);
    
    return ans;
}

//ak yaha pe static function hota hai 

const User = mongoose.model("User", userSchema);

module.exports = User;