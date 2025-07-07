-- CreateTable
CREATE TABLE `Ruangan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(191) NOT NULL,
    `kapasitas` INTEGER NOT NULL,
    `fasilitas` VARCHAR(191) NOT NULL,
    `lokasi_ruangan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
