/*
  Warnings:

  - You are about to drop the column `time` on the `FindPals` table. All the data in the column will be lost.
  - Added the required column `beginingtime` to the `FindPals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endingtime` to the `FindPals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FindPals" DROP COLUMN "time",
ADD COLUMN     "beginingtime" TEXT NOT NULL,
ADD COLUMN     "endingtime" TEXT NOT NULL;
