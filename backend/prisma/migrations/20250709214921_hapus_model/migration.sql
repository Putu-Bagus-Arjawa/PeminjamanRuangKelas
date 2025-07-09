/*
  Warnings:

  - You are about to drop the `notifikasi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `persetujuan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `notifikasi` DROP FOREIGN KEY `Notifikasi_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `persetujuan` DROP FOREIGN KEY `Persetujuan_id_peminjaman_fkey`;

-- DropForeignKey
ALTER TABLE `persetujuan` DROP FOREIGN KEY `Persetujuan_id_user_fkey`;

-- DropTable
DROP TABLE `notifikasi`;

-- DropTable
DROP TABLE `persetujuan`;
