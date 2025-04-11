const restaurentModel = require("../models/restaurentModel");

const restaurentCreate = async (req, res) => {
  try {
    const {
      title,
      imgUrl,
      foods,
      time,
      isOpen,
      pickup,
      delivery,
      logoUrl,
      rating,
      ratingCount,
      coords,
    } = req.body;

    if (!title || !coords) {
      return res
        .status(401)
        .send({ success: false, message: "Provide title and location" });
    }

    const restaurent = await restaurentModel.create({
      title,
      imgUrl,
      foods,
      time,
      isOpen,
      pickup,
      delivery,
      logoUrl,
      rating,
      ratingCount,
      coords,
    });
    await restaurent.save();
    res.status(200).send({
      success: true,
      message: "A new restaurent is registerred successfully",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

const getAllRestaurents = async (req, res) => {
  try {
    const restaurents = await restaurentModel.find();
    if (!restaurents) {
      return res
        .status(404)
        .send({ success: false, message: "No restaurents found" });
    }
    return res
      .status(200)
      .send({
        success: true,
        message: "fetched successfully",
        restaurents,
        totalCount: restaurents.length,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
const getRestaurentById = async (req, res) => {
    try {

        const Id=req.params.id;

     const restaurent=await restaurentModel.findById({_id:Id})
     if(!restaurent)
     {
        return res.status(402).send({success:false,message:"No restaurent found"});
     }

     return res.status(200).send({success:true,message:"Restaurent fetched successfully",restaurent})
    } catch (error) {
        return res.status(402).send({success:false,message:error.message});
    }
};

const deleteRestaurentById=async(req,res)=>
{
  try {
    const restaurentId=req.params.id;
    if(!restaurentId)
    {
      res.status(401).send({success:false,message:"Provide Id or no Restaurent not found"})
    }
    await restaurentModel.findByIdAndDelete(restaurentId)
    res.status(200).send({success:true,message:"Restaurent Deleted Successfully "})
  } catch (error) {
    console.log(error)
    res.status(500).send({success:false,message:"Error in Restaurent delete api",error})
  }
}


module.exports = { restaurentCreate, getAllRestaurents,getRestaurentById,deleteRestaurentById };
