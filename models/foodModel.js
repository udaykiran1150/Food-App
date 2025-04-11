const mongoose = require("mongoose");

const fooSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Food tittle is required"],
    },
    description: {
      type: String,
      required: [true, "Food Description is needed"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    isAvailable:{
        type:Boolean,
        default:false
    },
    imgUrl:{
        type:String,
        default:"nothing.jpg"
    },
    foodTags:{
       type:String
    },
    category:{
        type:String
    },
    code:{
        type:String,
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingcount:{
        type:Number
    },
    restaurent:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Restaurent"
    }
  },
  { timestamps: true }
);

module.exports=mongoose.model('Foods',fooSchema)