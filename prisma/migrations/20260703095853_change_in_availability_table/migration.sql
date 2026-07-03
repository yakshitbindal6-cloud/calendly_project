/*
  Warnings:

  - You are about to drop the column `day` on the `availability_pref` table. All the data in the column will be lost.
  - Added the required column `weekday` to the `availability_pref` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `holiday` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "availability_pref_user_id_day_idx";

-- AlterTable
ALTER TABLE "availability_pref" DROP COLUMN "day",
ADD COLUMN     "weekday" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "holiday" ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "availability_pref_user_id_weekday_idx" ON "availability_pref"("user_id", "weekday");
