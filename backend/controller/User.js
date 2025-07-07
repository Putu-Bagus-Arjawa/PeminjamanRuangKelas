import { PrismaClient } from "@prisma/client"
import { authenticate } from "../Middleware/Authenticate"

const prisma = new PrismaClient()
const userRoutes = Router()

userRoutes.get('/user', authenticate, async (req, res)=>{
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
export default userRoutes