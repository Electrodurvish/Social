import jwt  from 'jsonwebtoken';
export const verifyTojken = async (req,res,next) =>
{
    try {
        let token  = req.header("authorization");
        if(!token)
        {
            return  res.status(403).send("Access denied")
        }
        if(token.startsWith("Bearer ")){
        token = token.slice(7,token.length).trimleft();
        }
        const verified = jwt.verify(token,process.env.JWT_SCERET);
        req.user = verified;
        next();

    }
    catch (error) {
        res.status(500).send({error:err.message})
        ;
    }
}