const mongoose=require('mongoose');

const newuser=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
})

const userModel=mongoose.model('user',newuser);

module.exports=userModel;