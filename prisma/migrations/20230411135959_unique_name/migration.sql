/*
  Warnings:

  - A unique constraint covering the columns `[nama_tipe_kamar]` on the table `Tipe_Kamar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Tipe_Kamar_nama_tipe_kamar_key` ON `Tipe_Kamar`(`nama_tipe_kamar`);
