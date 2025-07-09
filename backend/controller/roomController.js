import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { authenticate } from '../Middleware/Authenticate.js';
import otorisasiAdmin from '../Middleware/RolePermission.js';

const prisma = new PrismaClient();
const roomRoutes = Router();

roomRoutes.post("/create",authenticate, async (req, res) => {
  const { nama_ruangan, kapasitas, fasilitas, lokasi_ruangan } = req.body;

  if (!nama_ruangan || !kapasitas || !fasilitas || !lokasi_ruangan) {
    return res.status(400).json({
      message: 'Semua field harus diisi.',
    });
  }

  if (typeof kapasitas !== 'number' || kapasitas <= 0) {
    return res.status(400).json({
      message: 'Kapasitas harus berupa angka positif.',
    });
  }

  try {
    const newRoom = await prisma.ruangan.create({
      data: {
        nama_ruangan,
        kapasitas,
        fasilitas,
        lokasi_ruangan,
      },
    });

    res.status(201).json({
      message: 'Ruangan berhasil ditambahkan!',
      room: newRoom,
    });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({
      message: 'Terjadi kesalahan saat menambahkan ruangan.',
      error: error.message,
    });
  }
});

roomRoutes.get("/", authenticate, async (req, res) => {
  try {
    const ruangan = await prisma.ruangan.findMany();
    res.status(200).json(ruangan);
  } catch (error) {
    console.error('Error fetching ruangan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

roomRoutes.get('/roomdisplay', authenticate, async (req, res) => {
  try {
    const ruangan = await prisma.ruangan.findMany({
      take: 3
    });
    res.json(ruangan);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil data ruangan' });
  }
});

roomRoutes.put('/edit/:id', authenticate, otorisasiAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, capacity, location, facilities } = req.body;

  if (!name || !capacity || !location) {
    return res.status(400).json({ sukses: false, message: 'Semua field wajib diisi' });
  }

  try {
    const updatedRoom = await prisma.ruangan.update({
      where: { id: parseInt(id) },
      data: {
        nama_ruangan: name,
        kapasitas: parseInt(capacity),
        lokasi_ruangan: location,
        fasilitas: Array.isArray(facilities) ? facilities.join(', ') : facilities
      },
    });

    res.json({ sukses: true, data: updatedRoom });
  } catch (error) {
    console.error('🔥 Error update ruangan:', error);
    res.status(500).json({ sukses: false, message: 'Gagal update ruangan' });
  }
});

roomRoutes.get('/display/:id', authenticate, otorisasiAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const ruangan = await prisma.ruangan.findUnique({
      where: { id: parseInt(id) },
    });

    if (!ruangan) {
      return res.status(404).json({ sukses: false, message: 'Ruangan tidak ditemukan' });
    }

    res.json({ sukses: true, data: ruangan });
  } catch (error) {
    console.error('🔥 Error get ruangan:', error);
    res.status(500).json({ sukses: false, message: 'Gagal mengambil data ruangan' });
  }
});


export default roomRoutes;