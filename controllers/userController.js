const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//Getting user details
const getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({ success: false, message: "no user found" });
    }
    //hiding password

    // user.password=undefined
    res
      .status(200)
      .send({
        success: true,
        message: "User Details fetched successfully",
        user,
      });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.id });
    if (!user) {
      return res.status(401).send({ success: false, message: "No user found" });
    }
    const { username, phone, address } = req.body;
    if (username) user.name = username;
    if (phone) user.phone = phone;
    if (address) user.address = address;
    await user.save();

    res.status(200).send({ success: true, message: "updated successfully" });
  } catch (error) {
    res.status(500).send({ success: false, message: error.message });
  }
};

const UpdatePassword = async (req, res) => {
  console.log(req.body);
  try {
    const user = await userModel.findOne({ _id: req.body.id });

    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "no user found to update" });
    }
    const { oldpassword, newpassword } = req.body;
    if (!oldpassword || !newpassword) {
      return res
        .status(401)
        .send({ success: false, message: "Provide all details" });
    }
    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect Old Password" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .send({ success: true, message: "password upated successfylly" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: error.message, error });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newpassword, secretword } = req.body;
    if (!email || !newpassword || !secretword) {
      return res
        .status(401)
        .send({ success: false, message: "provide all details" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "No user is found " });
    }
    if (user.secretword != secretword) {
      return res
        .status(401)
        .send({ success: false, message: "invalid secretword" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res
      .status(200)
      .send({ success: true, message: "Reset password successfully" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};


const deleteUser=async(req,res)=>
{
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({success:true,message:'successfully deleted account'})
    } catch (error) {
        return res.status(500).send({success:false,message:error.message})
    }
}
module.exports = {
  getUserController,
  UpdateUser,
  UpdatePassword,
  resetPassword,
  deleteUser
};
