const mongoose=require('mongoose')

const userSchema= mongoose.Schema({

name:
 {type:String,required:[true,"please add a name"]},
email:{
    type:String,required:[true,"please add a email"],unique:true},
password:{
    type:String,required:[true,"please add a password"]},
person:{
        type:String,required:[true,"please add your status"]},
},{
     timestamps: true 
})
const User=mongoose.model("User",userSchema);
module.exports={User}