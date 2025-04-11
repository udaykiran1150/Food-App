const JWT=require('jsonwebtoken')

module.exports=async(req,res,next)=>
{
    try {
         
         const authHeader = req.headers["authorization"];
         if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).send({ success: false, message: "Authorization token missing or invalid" });
          }
          const token=authHeader.split(" ")[1];
         JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>
        {
            if(err)
            {
                return res.status(401).send({success:false,message:"Not Authorized" ,err})
            }
            else
            {
                req.body.id=decode.id;
                next()
            }
        })

    } catch (error) {
        return res.status(500).send({success:false,message:error.message})
    }
}

