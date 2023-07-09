const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const {generateAuthToken} = require('../middlewares/authentication');


const createNewUser = async (name,email,password) => {

    try {
        const userExists = await userModel.findOne({email : email},{email : 1});
        if(userExists) return {
            status : 400,
            message : 'User already exists!'
        }

        let hashedPassword = await bcrypt.hash(password,10);
        let newUser = new userModel({
            name,
            email,
            password : hashedPassword,
            userRole : 'admin'
        });

        await newUser.save();

        return {
            status : 201,
            message : 'User created successfully!'
        }
    }catch(error){
        throw new Error('Failed to create user!')
    }
   
}

const signInUser = async (email,password) => {
    try{
      
       const getUserDetails = await userModel.findOne({email : email},{email : 1,password : 1,userRole : 1});
       if(!getUserDetails){
         return {
            status : 400,
            message : 'User not registered!'
         }
       }

       const passwordMatch = bcrypt.compare(password,getUserDetails.password);
       if(!passwordMatch){
         return {
            status : 400,
            message : 'Password does not match!'
         }
       }

       const getJwtToken = await generateAuthToken(getUserDetails.email,getUserDetails._id,getUserDetails.userRole);
       if(!getJwtToken)return {
         status : 400,
         message : 'Error in generating jwt token!'
       }
       
       return {
         status : 200,
         message : 'User logged in successfully!',
         jwtToken : getJwtToken
       }

    }catch(error){
        throw new Error(error.message);
    }
}

module.exports = {
    createNewUser,
    signInUser
}
