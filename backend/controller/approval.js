import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { authenticate } from "../Middleware/Authenticate.js";
import otorisasiAdmin from "../Middleware/RolePermission.js";

const prisma = new PrismaClient();
const approveRoutes = Router();


// GET satu data peminjaman berdasarkan ID
approveRoutes.get("/:id", authenticate, otorisasiAdmin, async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await prisma.peminjaman.findUnique({
      where: { id },
      include: {
        user: true,
        ruangan: true
      }
    });

    if (!data) return res.status(404).json({ sukses: false, pesan: "Peminjaman tidak ditemukan" });

    res.json({
      sukses: true,
      data: {
        id: data.id,
        room: data.ruangan.nama_ruangan,
        user: data.user.name,
        date: data.tanggal.toISOString().split("T")[0],
        timeStart: data.jam_mulai,
        timeFinish: data.jam_selesai,
        status: data.status === "DISETUJUI" ? "Approved"
              : data.status === "DITOLAK" ? "Rejected"
              : "Pending",
        description: `${data.agenda} ${data.deskripsi || ''}`.trim()
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ sukses: false, pesan: "Gagal ambil data peminjaman" });
  }
});




approveRoutes.put("/:id", authenticate, otorisasiAdmin, async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (!id || !status) {
    return res.status(400).json({ sukses: false, message: "ID dan status wajib diisi" });
  }

  let newStatus;
  if (status === "Approved") newStatus = "DISETUJUI";
  else if (status === "Rejected") newStatus = "DITOLAK";
  else newStatus = status; 

  try {
    const update = await prisma.peminjaman.update({
      where: { id: Number(id) }, 
      data: { status: newStatus }
    });

    res.json({ sukses: true, message: "Status berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ sukses: false, message: "Gagal memperbarui status" });
  }
});


export default approveRoutes;
