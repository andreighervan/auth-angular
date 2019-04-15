const mongoose=require('mongoose');

const Schema=mongoose.Schema;
const userSchema=mongoose.Schema({
    email:String,
    password:String
})

module.exports=mongoose.model('user',userSchema,'users');