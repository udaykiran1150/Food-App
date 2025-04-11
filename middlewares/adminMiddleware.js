const userModel=require('../models/userModel')

module.exports=async(req,res,next)=>
{
    try {
        const id=req.body.id;
        const user=await userModel.findById(id);
        if(!user)
        {
            return res.status(401).send({success:false,message:"un AUthorized user"})
        }
        if(user.userType!='admin')
        {
            return res.status(401).send({success:false,message:"only admin can access"})
        }
        else
        {
            next()
        }


    } catch (error) {
        console.log(error);
        res.status(500).send({success:false,message:"Error in Admin middle ware"})
    }
}
