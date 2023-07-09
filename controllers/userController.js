const express = require('express');
const userModel = require('../models/userModel');
const userService = require('../services/userService');

const signUp = async (req,res,next) => {
  try{
    let {name,email,password} = req.body;
   
    let response = await userService.createNewUser(name,email,password);
   
    return res.status(response.status).json({
      status : response.status,
      message : response.message
    })
 
  }catch(error){
     return res.status(400).json({
      status : 500,
      message : error.message
     })
  }
}

const signIn = async (req,res,next) => {
  try{
    let {email,password} = req.body;
    let response = await userService.signInUser(email,password);
   
    return res.status(response.status).json({
      status : response.status,
      message : response.message,
      jwtToken : response.jwtToken
    })

  }catch(error){
    return res.status(500).json({
      status : 500,
      message : error.message
     })
  }
}


module.exports = {
  signUp,
  signIn
}