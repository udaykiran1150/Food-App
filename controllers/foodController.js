const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFood = async (req, res) => {
  try {
    const {
      title,
      imgUrl,
      price,
      description,
      isAvailable,
      foodTags,
      category,
      code,
      rating,
      ratingcount,
      restaurent,
    } = req.body;

    if (!title || !price || !description || !restaurent) {
      res
        .status(400)
        .send({ success: false, message: "Please provide all fields" });
    }
    const food = await foodModel.create({
      title,
      imgUrl,
      price,
      description,
      isAvailable,
      foodTags,
      category,
      code,
      rating,
      ratingcount,
      restaurent,
    });
    res
      .status(200)
      .send({ success: true, message: "successfully added a food", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error at food creation api", error });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();
    if (!foods) {
      res.status(404).send({ success: false, message: "No foods avaialble" });
    }
    res.status(200).send({
      success: true,
      message: "fetched all foods successfully",
      foods,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting all foods" });
  }
};

const getFoodById = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      res.status(401).send({ success: false, message: "provide Id" });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
      res
        .status(400)
        .send({ success: false, message: "No found with that Id" });
    }
    res
      .status(200)
      .send({ success: true, message: "Food Fetched successfully ", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting all foods" });
  }
};

const getFoodByRestaurentId = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(401).send({ success: false, message: "provide Id" });
    }
    const food = await foodModel.find({ restaurent: id });
    if (!food) {
      res
        .status(400)
        .send({ success: false, message: "No found with that Id" });
    }
    res
      .status(200)
      .send({ success: true, message: "Food Fetched successfully ", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting all foods" });
  }
};

const updateFoodById = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      imgUrl,
      price,
      description,
      isAvailable,
      foodTags,
      category,
      code,
      rating,
      ratingcount,
      restaurent,
    } = req.body;
    if (!id) {
      res.status(401).send({ success: false, message: "Provide food ID" });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      res
        .status(401)
        .send({ success: false, message: "No food found with that id" });
    }
    const updateFood = await foodModel.findByIdAndUpdate(
      id,
      {
        title,
        imgUrl,
        price,
        description,
        isAvailable,
        foodTags,
        category,
        code,
        rating,
        ratingcount,
        restaurent,
      },
      { new: true }
    );
    res
      .status(200)
      .send({ success: true, message: "Food updated Successfully", food });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error at upddate food Api", error });
  }
};

const deleteFoodById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res
        .status(401)
        .send({ success: false, message: "Please provide Food Id" });
    }
    const food = await foodModel.findById(id);
    if (!food) {
      res.status(401).send({ success: false, message: "No food found " });
    }
    await foodModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Food deleted Successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error at delete Food API" });
  }
};

//Dealing order model

//placing order

const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart ) {
      res
        .status(401)
        .status({
          success: false,
          message: "please provide cart and payment details",

        });
    }
    let total = 0;
    cart.map((i) => {
      total += i.price;
    });

    const order = await orderModel.create({
      foods: cart,
      payments:total,
      buyer: req.body.id,
    });
    await order.save();
    res
      .status(200)
      .send({ success: true, message: "Order placed successfully",order});
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in placing order", error });
  }
};


const changeOrderStatus=async(req,res)=>
{
  try {
    const orderId=req.params.id;
    if(!orderId)
    {
      res.status(400).send({success:false,message:"please provide orderId"})
    }
    const {status}=req.body;
    if(!status){
      res.status(400).send({success:false,message:"please provide status"})
    }
    const order=await orderModel.findById(orderId)
    order.status=status;
    await order.save();
    res.status(200).send({success:true,message:"Order status update successfully",order})
  } catch (error) {
    
  }
}
module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  getFoodByRestaurentId,
  updateFoodById,
  deleteFoodById,
  placeOrder,
  changeOrderStatus
};
