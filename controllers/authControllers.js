const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address,secretword } = req.body;
    if (!username || !email || !password || !phone || !address ||!secretword) {
      res
        .status(500)
        .send({ success: false, message: "All details are required" });
    }
    const existing = await userModel.findOne({ email });
    if (existing) {
      res.status(500).send({ success: false, message: "Email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      secretword
    });

    res.status(201).send({ success: true, message: "successfully registered" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(500)
        .send({ success: false, messsage: "email and password are required" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(404).send({ success: false, message: "No user found" });
    }

    const check = await bcrypt.compare(password, user.password);

    if (!check) {
      res.status(404).send({ success: false, message: "Incorrect password" });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .send({ success: true, message: "Login successfully", token });
  } catch (error) {
    res.status(500).send({ success: true, message: error.message });
  }
};

module.exports = { registerController, loginController };
