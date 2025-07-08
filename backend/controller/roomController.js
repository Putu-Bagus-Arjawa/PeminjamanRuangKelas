import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const prisma = new PrismaClient();
const roomRoutes = Router();

roomRoutes.post("/create", async (req, res) => {
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

roomRoutes.get("/", async (req, res) => {
  try {
    const ruangan = await prisma.ruangan.findMany();
    res.status(200).json(ruangan);
  } catch (error) {
    console.error('Error fetching ruangan:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default roomRoutes;