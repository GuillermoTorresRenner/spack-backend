/*
  Warnings:

  - Added the required column `lastPassword` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "lastPassword" TEXT NOT NULL,
ADD COLUMN     "nextPasswordChangeDate" TIMESTAMP(3) DEFAULT now() + interval '2 months';
