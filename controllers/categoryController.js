const categoryModel = require("../models/categoryModel");
const createCategory = async (req, res) => {
  try {
    const { title, imgUrl } = req.body;

    if (!title || !imgUrl) {
      res
        .status(401)
        .send({ success: false, message: "title and image url needed" });
    }
    const category = await categoryModel.create({ title, imgUrl });
    await category.save();

    res
      .status(200)
      .send({
        success: true,
        message: "category created sucessfully",
        category,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error at create Category API", error });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId) {
      res
        .status(401)
        .send({ success: false, message: "prove id or no category found" });
    }
    const category = await categoryModel.findById(categoryId);
    res
      .status(200)
      .send({
        success: true,
        message: "Fetched category successfully ",
        category,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting Categories", error });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, imgUrl } = req.body;

    if (!id) {
      res.status(401).send({ success: false, message: " Provide id" });
    }

    const category = await categoryModel.findById(id);
    if (!category) {
      res.status(401).send({ success: false, message: " No category found" });
    }
    if (title) {
      category.title = title;
    }
    if (imgUrl) {
      category.imgUrl = imgUrl;
    }
    await category.save();
    res
      .status(200)
      .send({
        success: true,
        message: "Category update successfully",
        category,
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "error at update category api", error });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res
        .status(400)
        .send({ success: false, message: "please send Category id" });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      res
        .status(401)
        .send({
          success: false,
          message: "No Catgoey found with the given ID",
        });
    }
    await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error at deleting Category", error });
  }
};

const getAllCategories =async(req,res)=>
{
    try {
        const categories=await categoryModel.find();
        res.status(200).send({success:true,message:"Fetched all categories successfully",totalCategories:categories.length,categories})

    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:"Error at getting all categories"})
    }
}
module.exports = {
  createCategory,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
  getAllCategories
};
