const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id : {type : String},
    email : {type : String,required : true},
    password : {type : String,required : true},
    name : {type : String},
})

const userModel = mongoose.model('Users',userSchema);
module.exports = userModel;