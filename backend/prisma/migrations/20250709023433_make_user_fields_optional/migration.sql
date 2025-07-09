-- AlterTable
ALTER TABLE `peminjaman` ADD COLUMN `surat_permohonan` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `nim` VARCHAR(191) NULL,
    ADD COLUMN `programStudi` VARCHAR(191) NULL,
    ADD COLUMN `telepon` VARCHAR(191) NULL;
