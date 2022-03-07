/*
  Warnings:

  - You are about to alter the column `countEnrolled` on the `Course` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Course` MODIFY `countEnrolled` INTEGER NOT NULL;
