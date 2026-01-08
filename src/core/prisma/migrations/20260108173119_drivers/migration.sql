-- CreateTable
CREATE TABLE "Drivers" (
    "id" SERIAL NOT NULL,
    "plate" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "whatsappNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Drivers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_plate_key" ON "Drivers"("plate");

-- CreateIndex
CREATE UNIQUE INDEX "Drivers_email_key" ON "Drivers"("email");
