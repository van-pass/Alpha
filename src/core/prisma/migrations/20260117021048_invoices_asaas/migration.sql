-- CreateEnum
CREATE TYPE "InvoicesStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'MANUAL_PAID');

-- CreateTable
CREATE TABLE "Invoices" (
    "id" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "netAmount" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "InvoicesStatus" NOT NULL DEFAULT 'PENDING',
    "url" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);
