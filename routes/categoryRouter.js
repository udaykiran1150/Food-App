const express=require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router=express.Router();
const { createCategory, getCategoryById, updateCategoryById, deleteCategoryById, getAllCategories } = require('../controllers/categoryController');
router.post('/create',authMiddleware,createCategory);
router.get('/getcategory/:id',getCategoryById)
router.put('/updatecategory/:id',authMiddleware,updateCategoryById)
router.delete('/delete/:id',authMiddleware,deleteCategoryById)
router.get('/getAll',getAllCategories)
module.exports=router;