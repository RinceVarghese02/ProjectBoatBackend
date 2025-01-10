var express = require('express');
var router = express.Router();
var userModel=require('../models/user')

/* GET home page. */
router.post('/login', function(req, res, next) {
  var {name,password}=req.body;
  // console.log(name,password)
  userModel.find({name:name,password:password })
  .then((data)=>{
    if(data.length>0){
      res.send({message:'user logged in successfully',isLogin:true,name:data[0].name});
    }
    else{
      res.send({message:'user logged in failed',isLogin:false});
    }
  })
});

router.post('/register', function(req, res, next) {
  var {name,email,password}=req.body;
  var newuser= new userModel({
    name:name,
    email:email,
    password:password,
  })
  var saveuser=newuser.save()
  .then(()=>{
    console.log('usercreated',newuser);
    res.send({message:'database created',isSignup:true})
  })
  .catch((err)=>{
    console.log(err)
    res.send({message:'database not created',isSignup:false})
  })
 
});

module.exports = router;
