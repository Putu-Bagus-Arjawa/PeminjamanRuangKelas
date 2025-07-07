import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import jewete from "jsonwebtoken"


dotenv.config()
const prisma = new PrismaClient()


export const authenticate = async (req,res, next)=>{
    const token=  req.cookies.token
    if(!token) return res.status(401).json({message: "Required authenticate"})
        try {
            const decoded = jewete.verify(token, process.env.JWT_RAHASIA)
            const user = await prisma.user.findUnique({where:{id:decoded.id}})
            if(!user) return res.status(404).json({message: "User Not Found"})
            req.user = decoded
            next()
        } catch (error) {
             return res.status(401).json({ error: 'Invalid token' }); 
    }
}




