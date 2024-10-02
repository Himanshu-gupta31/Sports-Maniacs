/*
  Warnings:

  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Member";

-- CreateTable
CREATE TABLE "FindPals" (
    "id" TEXT NOT NULL,
    "sports" TEXT NOT NULL,
    "numberofplayers" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "FindPals_pkey" PRIMARY KEY ("id")
);
