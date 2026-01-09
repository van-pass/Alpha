/*
  Warnings:

  - A unique constraint covering the columns `[whatsappNumber]` on the table `Drivers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Drivers_whatsappNumber_key" ON "Drivers"("whatsappNumber");
