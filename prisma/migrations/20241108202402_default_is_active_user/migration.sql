/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "deletedAt",
ADD COLUMN     "isActive" BOOLEAN DEFAULT true;
