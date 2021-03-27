
const User = require("../models/User");
const bcrypt = require ("bcryptjs");
const jwt = require("jsonwebtoken");
const { json } = require("express");
require('dotenv').config({path: './config/.env'})
const secretOrKey = process.env.secretOrKey;


//controller register

exports.register = async (req, res) => {
    const { pseudo, email,password,phoneNumber,citation,photoProfil} = req.body;
    const searchEmail = await User.findOne({email});
    if(searchEmail) return res.status(401).json({
      msg : "That email address is already registered "
    })

    try {
        const newUser = new User({
          pseudo,
          email,
          password,
          phoneNumber, 
          citation,
          photoProfil,
         
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password,salt);
        newUser.password =hash;
        await newUser.save();
        res.status(201).json({ msg: "User added successfully" });
    } catch (error) {
        console.log(error);
        res.status(501).json({ msg: "User add failed" });
      }
    };    


    // controleer login 

    exports.login= async (req,res) =>{
   const {email , password }=req.body;
   const user = await User.findOne({email});
   if(!user) return res.status(405).json({ msg:"wrong Email"})

   const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch) return res.status(405).json({msg : "wrong password"});
   try{

   const payload = {
     pseudo : user.pseudo,
     email:user.email,
     id :user._id,
   }
  const token = await jwt.sign (payload, secretOrKey)
 res.status(200).json({
token : `Bearer  ${token}`})

   }
   catch(error){
     console.log('Login error ',error);
     res.status(500).json({
       msg:"login failed"
     })
   }

    }

    // get info user sauf password :
exports.getInfoUser = async(req,res)=>{
  let{_id}=req.params;
  try{
    const userInfo= await User.findById({_id}).select('-password')
    res.status(231).json(userInfo)
  }
  catch(error){
    res.status(431).json({msg:"get info user not found"})
  }
}

// update info user : 
exports.updateInfoUser = async(req,res)=>{
  let{_id}=req.params;
try{
 const user= await User.findByIdAndUpdate({_id},{$set:{...req.body}})
  
// changer payload par les nouveau info
  const payload = {
    pseudo : user.pseudo,
    email:user.email,
    id :user._id,
  }
 const token = await jwt.sign (payload, secretOrKey)
res.status(200).json({
token : `Bearer  ${token}`})

  }
catch(error){
  res.status(432).json({msg:"update info user failed"})}
}


    //Patie Admin : 

    // get all user
    exports.getAllUSers= async (req,res)=>{
      
      try{
        // select pour recuperer tous les utilisateurs (-password) sauf password
        const users = await User.find().select('-password')
        res.status(230).json(users);
      }
      catch(error){
        console.log(error)
        res.status(430).json({
          msg:"get all users failed"
      })
    }}


    // delete user : 
  exports.deleteUser=async(req,res)=>{
      let {_id} =req.params;
      try{
     await User.findByIdAndDelete({_id})
    res.status(233).json({msg:"user deleted with success"})
    }
    catch(error){
      res.status(433).json({msg:"delete user failed"})
    }

  }
