/*
  Warnings:

  - Changed the type of `level` on the `FindPals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `beginingtime` on the `FindPals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endingtime` on the `FindPals` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'INTERMEDIATE', 'PROFESSIONAL');

-- AlterTable
ALTER TABLE "FindPals" DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL,
DROP COLUMN "beginingtime",
ADD COLUMN     "beginingtime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endingtime",
ADD COLUMN     "endingtime" TIMESTAMP(3) NOT NULL;
