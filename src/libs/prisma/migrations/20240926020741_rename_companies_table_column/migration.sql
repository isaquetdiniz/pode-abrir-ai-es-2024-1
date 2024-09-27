/*
  Warnings:

  - You are about to drop the column `batchNumber` on the `companies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "batchNumber",
ADD COLUMN     "batch_number" TEXT;
