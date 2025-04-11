const express=require('express');
const { getUserController, UpdateUser, UpdatePassword, resetPassword, deleteUser } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router=express.Router();

router.get('/getuser',authMiddleware,getUserController)

router.put('/updateuser',authMiddleware,UpdateUser)
router.post('/updatepassword',authMiddleware,UpdatePassword)
router.post('/resetpassword',authMiddleware,resetPassword)
router.delete('/deleteuser/:id',authMiddleware,deleteUser);

module.exports=router;