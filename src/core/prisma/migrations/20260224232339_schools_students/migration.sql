/*
  Warnings:

  - Added the required column `schoolId` to the `Students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Students" ADD COLUMN     "schoolId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Students" ADD CONSTRAINT "Students_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "Schools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
