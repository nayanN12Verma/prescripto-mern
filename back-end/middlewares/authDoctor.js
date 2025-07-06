import jwt from 'jsonwebtoken'

//Doctor authentication

const authDoctor = async(req,res,next)=>{
    try {
        const dToken = req.headers.dtoken;
        if(!dToken){
            return res.json({success:false, message:"Not Authorized Login again"})
        }
        const decoded = jwt.verify(dToken,process.env.JWT_SECRET)
         req.docId = decoded.id;
               next()
    } catch (error) {
    console.log(error)
    res.json({success:false, message:error.message})
    }
}
export default authDoctor;