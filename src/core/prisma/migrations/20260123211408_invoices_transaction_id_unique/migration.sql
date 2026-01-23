/*
  Warnings:

  - A unique constraint covering the columns `[transactionId]` on the table `Invoices` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invoices_transactionId_key" ON "Invoices"("transactionId");
