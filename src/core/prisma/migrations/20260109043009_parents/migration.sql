/*
  Warnings:

  - Added the required column `parentId` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "parentId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Parents" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Parents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Parents_whatsappNumber_key" ON "Parents"("whatsappNumber");

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Parents"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
