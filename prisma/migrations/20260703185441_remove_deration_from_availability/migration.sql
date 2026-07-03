/*
  Warnings:

  - You are about to drop the column `duration` on the `availability_pref` table. All the data in the column will be lost.
  - You are about to drop the column `isrecurring` on the `availability_pref` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "availability_pref" DROP COLUMN "duration",
DROP COLUMN "isrecurring",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "timezone" SET DEFAULT 'UTC';
