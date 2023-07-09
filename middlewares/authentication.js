const jwtToken = require('jsonwebtoken');
const dotenv = require('dotenv').config();


const generateAuthToken = async (email,userId,userRole) => {
  try{
    const tokenPayload = {
        email,
        userId,
        userRole
    }

    const token = jwtToken.sign(tokenPayload,process.env.JWT_SECRET_KEY,{
        expiresIn : '24h'
    })
    
    return token;
  }catch(error){
    throw new Error('Error in generating jwt token!')
  }
}

const isAuthenticated = (allowedUserRoles) => {

    return async (req,res,next) => {
        try{
            let token = req?.headers?.authorization?.split(" ")[1];
            if(!token)return res.status(400).json({'message' : 'token is missing!'});
    
            let decodedToken = jwtToken.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decodedToken);
            req.user = decodedToken;
            
            const userRole = req.user.userRole;
            if(!allowedUserRoles.includes(userRole)){
                console.log(userRole);
                return res.status(403).json({
                    status : 403,
                    message : 'User is Forbidden!'
                })
            }
    
            next();
          }catch(error){
            return res.status(403).send({
                 status : 403,
                 message : 'Invalid jwt token!'
              })
          }
    }
    
}

module.exports = {
    generateAuthToken,
    isAuthenticated
}