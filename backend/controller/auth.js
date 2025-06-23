import {Router} from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv"
import bcrypt from "bcrypt"

import jewete from "jsonwebtoken"

dotenv.config()

const prisma = new PrismaClient()
const authRoutes = Router()



const buatToken = (userId, role)=>{
    return jewete.sign({id: userId, role}, process.env.JWT_RAHASIA, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}


authRoutes.post('/register', async (req, res)=>{
    const {name, email, password, role} = req.body
    try {
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


authRoutes.post('/login', async (req, res)=>{
     const {email, password} = req.body
    try {
        const user = await prisma.user.findUnique({
            where:{email}
        })

        if(!user || !(await bcrypt.compare(password, user.password))){
            return res.status(401).json({message: "Username or Password invalid"})
        }

        const token = buatToken(user.id, user.role);

        res.cookie("token", token, {httpOnly:true, sameSite:"strict", maxAge:1000*20})//satuan milisecond
        res.json({redirectUrl: user.role == "ADMIN"? "/admin"  : "/user", message:"Login succeed"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            error: 'Login Gagal',
            detail: error.message 
        });
    }
})

authRoutes.delete("/logout", (req, res)=>{
    res.clearCookie()
    res.json({message: "Anda berhasil logout"})
})

export default authRoutes