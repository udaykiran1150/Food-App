const express=require('express');
const authMiddleware=require('../middlewares/authMiddleware');
const { createFood, getAllFoods, getFoodById, getFoodByRestaurentId, updateFoodById, deleteFoodById, placeOrder, changeOrderStatus } = require('../controllers/foodController');
const adminMiddleware = require('../middlewares/adminMiddleware');
const router=express.Router();
router.post('/createfood',authMiddleware,createFood)
router.get('/getall',getAllFoods)
router.get('/getfood/:id',getFoodById)
router.get('/getfoodrestaurent/:id',getFoodByRestaurentId)
router.put('/updatefood/:id',authMiddleware,updateFoodById)
router.delete('/deletefood/:id',authMiddleware,deleteFoodById)
router.post('/placeorder',authMiddleware,placeOrder)

//changing order status by admin only

router.post('/chagestatus/:id',authMiddleware,adminMiddleware,changeOrderStatus)

module.exports=router;