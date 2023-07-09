const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email : {type : String,required : true},
    password : {type : String,required : true},
    name : {type : String},
    userRole : {type : String,default : 'User'}
})

const userModel = mongoose.model('Users',userSchema);
module.exports = userModel;