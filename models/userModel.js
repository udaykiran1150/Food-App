const mongoose=require ('mongoose')
const { type } = require('os')


const userSchema=new mongoose.Schema({
    username:{type:String,required:[true,'User name is required']},
    email:{type:String,required:[true,'email is required'] ,unique:true},
    password:{type:String,required:[true,'password is required']},
    address:{type:Array},
    phone:{type:String,required:[true,"phone number is required"]},
    userType:{
        type:String,
        required:[true,"user is requires"],
        enum:['client','vendor','admin','driver'],
        default:'client'
    },
    profile:{
       type:String,
       default:'data:image/png;base64,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'
    },
    secretword:{
        type:String,
        required:[true,"secret word is required"]
    }

},{timestamps:true})

module.exports=mongoose.model('user',userSchema)