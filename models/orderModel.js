const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    foods:[
      { type:mongoose.Schema.Types.ObjectId,
       ref:"Foods"}
    ],
    payments:{},
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    status:{
        type:String,
        enum:['preparing','on the way','delivered','prepare'],
        default:"preparing"
    }

},{timestamps:true})

module.exports=mongoose.model('order',orderSchema);