/*
  Warnings:

  - You are about to drop the column `mainActivity` on the `companies_cnaes` table. All the data in the column will be lost.
  - You are about to drop the column `predominantActivity` on the `companies_cnaes` table. All the data in the column will be lost.
  - You are about to drop the column `sanitaryActivity` on the `companies_cnaes` table. All the data in the column will be lost.
  - Added the required column `main_activity` to the `companies_cnaes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `predominant_activity` to the `companies_cnaes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sanitary_activity` to the `companies_cnaes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "companies_cnaes" DROP COLUMN "mainActivity",
DROP COLUMN "predominantActivity",
DROP COLUMN "sanitaryActivity",
ADD COLUMN     "main_activity" BOOLEAN NOT NULL,
ADD COLUMN     "predominant_activity" BOOLEAN NOT NULL,
ADD COLUMN     "sanitary_activity" BOOLEAN NOT NULL;
