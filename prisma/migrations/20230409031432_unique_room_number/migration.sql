/*
  Warnings:

  - A unique constraint covering the columns `[nomor_kamar]` on the table `Kamar` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Kamar_nomor_kamar_key` ON `Kamar`(`nomor_kamar`);
