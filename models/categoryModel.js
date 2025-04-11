const mongoose=require('mongoose')

const categorySchema=new mongoose.Schema({
   title:{
    type:String,
    required:[true,"Category title is required"]
   },
   imgUrl:{
    type:String,
    required:[true,"Image Url is required"],
    default:"www.image.url.com"
   }

},{timestamps:true})


const categoryModel=mongoose.model('category',categorySchema)
module.exports=categoryModel;