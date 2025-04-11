export const testUserController=(req,res)=>
{
   try {
        res.status(200).send({success:true,message:"Test api is working"})
   } catch (error) {
     res.send({success:false,message:error.message})
   }
}