import {Router} from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

dotenv.config()

const prisma = new PrismaClient()
const authRoutes = Router()

authRoutes.post('/register', async (req, res)=>{
    try {
        const {name, email, password, role} = req.body

        const nameCheck =  await prisma.user.findFirst({
            where:{name}
        })

        if (nameCheck) {
            return res.status(409).json({ message: "Nama sudah digunakan" }); 
        }

        const emailCheck =  await prisma.user.findUnique({
            where:{email}
        })

        if (emailCheck) {
            return res.status(409).json({ message: "Email sudah digunakan" }); 
        }

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Semua field wajib diisi" });
        }

        if (password.length < 8 ) {
            return res.status(400).json({ message: "Password Terlalu Singkat" });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10)
        await prisma.user.create({
            data:{
                name,
                email,
                password: hashedPassword, 
                role
            }
        })

        res.status(201).json({message: "Anda Berhasil Register"})

    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Registrasi gagal',
            detail: error.message 
        });
    }
})


export default authRoutes