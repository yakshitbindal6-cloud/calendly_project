/*
  Warnings:

  - You are about to drop the column `is_booked` on the `slot` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "slot_event_id_start_time_is_booked_idx";

-- AlterTable
ALTER TABLE "slot" DROP COLUMN "is_booked",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'available';

-- CreateIndex
CREATE INDEX "slot_event_id_start_time_status_idx" ON "slot"("event_id", "start_time", "status");
