import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import { authenticate } from "../Middleware/Authenticate.js"
import otorisasiAdmin from "../Middleware/RolePermission.js"


const prisma = new PrismaClient()
const userRoutes = Router()

userRoutes.get('/user', authenticate, async (req, res)=>{
    try {
        const myData = await prisma.user.findUnique({
        where: {id: req.user.id}, 
        select:{id:true, name:true,email:true, role:true, nim: true, telepon: true, programStudi:true, }
    })
        res.status(200).json(myData)
     } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
     }
})

userRoutes.get('/user/all', authenticate, async (req, res)=>{
    try {
        const myData = await prisma.user.findMany({
        select:{id:true, name:true,email:true, role:true, nim: true, telepon: true, programStudi:true, }
    })
        res.status(200).json(myData)
     } catch (error) {
        res.status(500).json({ error: 'Failed to fetch user data' });
     }
})

userRoutes.get('/user/:id', authenticate, otorisasiAdmin, async (req, res) => {
    try {
        const rawId = req.params.id
        const id = parseInt(rawId)

        if (isNaN(id)) {
        return res.status(400).json({ error: "ID tidak valid" })
        }

        const user = await prisma.user.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
        })

        if (!user) return res.status(404).json({ error: "User tidak ditemukan" })

        res.json(user)
    } catch (err) {
        console.error("[GET USER ERROR]", err)
        res.status(500).json({ error: "Terjadi kesalahan server" })
    }
})


userRoutes.post('/user/edit/:id', authenticate, otorisasiAdmin, async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, email, role } = req.body

        if (!name || !email || !role) {
        return res.status(400).json({ error: "Semua field harus diisi" })
        }

        console.log("Update user:", { id, name, email, role })

        const updated = await prisma.user.update({
        where: { id },
        data: { name, email, role }
        })

        res.json({ message: "User berhasil diperbarui", updated })
    } catch (err) {
        console.error("[EDIT USER ERROR]", err)
        res.status(500).json({ error: "Gagal memperbarui user" })
    }
})



export default userRoutes