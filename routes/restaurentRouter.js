const express=require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { restaurentCreate, getAllRestaurents, getRestaurentById, deleteRestaurentById } = require('../controllers/restaurentController');


const router=express.Router();

router.post('/create',authMiddleware,restaurentCreate)
router.get('/getall',getAllRestaurents);
router.get('/get/:id',getRestaurentById)
router.delete('/delete/:id',authMiddleware,deleteRestaurentById)
module.exports=router;