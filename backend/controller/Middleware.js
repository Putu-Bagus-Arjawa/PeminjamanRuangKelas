import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import { Router } from "express";
import jewete from "jsonwebtoken"


dotenv.config()
const prisma = new PrismaClient()
const routes = Router()

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

const otorisasiAdmin =  (req, res, next)=>{
    if(req.user.role !== 'ADMIN') return res.status(403).json({message:"Anda tidak punya akses"})
    next()
}



routes.get('/user', authenticate, async (req, res)=>{
    try {
        const myData = await prisma.user.findUnique({
        where: {id: req.user.id}, 
        select:{id:true, name:true,email:true, role:true}
    })
        res.status(200).json(myData)
     } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
     }
})
export default routes