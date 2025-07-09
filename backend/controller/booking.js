// routes/bookingRoutes.js
import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { PrismaClient } from '@prisma/client'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { authenticate } from '../Middleware/Authenticate.js'

const bookingRoutes = express.Router()
const prisma = new PrismaClient()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../uploads')
    fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext
    cb(null, filename)
  }
})

const upload = multer({ storage })

bookingRoutes.post('/', authenticate, upload.single('surat_permohonan'), async (req, res) => {
  try {
    const user = req.user
    if (!user?.id) return res.status(401).json({ sukses: false, pesan: "User tidak terautentikasi" })

    const {
      tanggal,
      jamMulai,
      jamSelesai,
      idRuangan,
      agenda,
      deskripsi
    } = req.body

    const file = req.file

    const peminjaman = await prisma.peminjaman.create({
      data: {
        tanggal: new Date(tanggal),
        jam_mulai: jamMulai,
        jam_selesai: jamSelesai,
        agenda,
        deskripsi,
        id_user: user.id,
        id_ruangan: parseInt(idRuangan),
        surat_permohonan: file ? `/uploads/${file.filename}` : null
      }
    })

    res.status(201).json({ sukses: true, data: peminjaman })
  } catch (error) {
    console.error("🔥 Error booking:", error)
    res.status(500).json({ sukses: false, pesan: 'Gagal booking ruangan' })
  }
})

export default bookingRoutes
