-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "sports" TEXT NOT NULL,
    "numberofplayers" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
