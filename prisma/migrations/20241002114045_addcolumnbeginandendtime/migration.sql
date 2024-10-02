/*
  Warnings:

  - Added the required column `updatedAt` to the `FindPals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FindPals" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
