/*
  Warnings:

  - Added the required column `day` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "slot" ADD COLUMN     "day" TEXT NOT NULL;
