import { PrismaClient } from '@prisma/client'
import { authenticate } from '../Middleware/Authenticate.js'
import otorisasiAdmin from '../Middleware/RolePermission.js'
import { Router } from 'express'

const prisma = new PrismaClient()
const riwayatRoutes = Router()

riwayatRoutes.get('/', authenticate, async (req, res) => {
  try {
    const userId = req.user.id
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const [total, data] = await Promise.all([
      prisma.peminjaman.count({ where: { id_user: userId } }),
      prisma.peminjaman.findMany({
        where: { id_user: userId },
        include: {
          user: true,
          ruangan: true
        },
        orderBy: { tanggal: 'desc' },
        skip,
        take: limit
      })
    ])

    const result = data.map((item) => ({
      id: item.id,
      user: item.user.name,
      email: item.user.email,
      room: item.ruangan.nama_ruangan,
      agenda: `${item.agenda} ${item.deskripsi ?? ""}`.trim(),
      status: item.status === "DISETUJUI" ? "Disetujui" : item.status === "DITOLAK" ? "Ditolak" : "Pending",
      date: new Date(item.tanggal).toLocaleDateString("id-ID")
    }))

    res.json({
      sukses: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: result
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ sukses: false, pesan: 'Gagal ambil riwayat' })
  }
})
riwayatRoutes.get('/admin', authenticate, otorisasiAdmin, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 5
    const skip = (page - 1) * limit

    const [total, data] = await Promise.all([
      prisma.peminjaman.count(),
      prisma.peminjaman.findMany({
        include: {
          user: true,
          ruangan: true
        },
        orderBy: { tanggal: 'desc' },
        skip,
        take: limit
      })
    ])

    const result = data.map((item) => ({
      id: item.id,
      user: item.user.name,
      email: item.user.email,
      room: item.ruangan.nama_ruangan,
      agenda: `${item.agenda} ${item.deskripsi ?? ""}`.trim(),
      status: item.status === "DISETUJUI" ? "Disetujui" : item.status === "DITOLAK" ? "Ditolak" : "Pending",
      date: new Date(item.tanggal).toLocaleDateString("id-ID"),
      suratUrl: item.surat_permohonan || null

    }));

    res.json({
      sukses: true,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      data: result
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ sukses: false, pesan: 'Gagal ambil data admin' })
  }
})











export default riwayatRoutes