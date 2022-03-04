/*
  Warnings:

  - A unique constraint covering the columns `[userId,friendId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Friend` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friend" ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Friend_userId_friendId_key" ON "Friend"("userId", "friendId");
