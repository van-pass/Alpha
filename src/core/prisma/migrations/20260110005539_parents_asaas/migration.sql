/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cpf]` on the table `Parents` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Parents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `Parents` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Parents" ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "customerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Parents_customerId_key" ON "Parents"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Parents_cpf_key" ON "Parents"("cpf");
