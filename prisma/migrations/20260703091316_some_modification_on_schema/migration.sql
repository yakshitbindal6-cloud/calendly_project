/*
  Warnings:

  - You are about to drop the column `endTime` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `invitee_id` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `slot` table. All the data in the column will be lost.
  - You are about to drop the column `day` on the `slot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[event_id,start_time,end_time]` on the table `slot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timezone` to the `availability_pref` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slot_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `slot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_invitee_id_fkey";

-- AlterTable
ALTER TABLE "availability_pref" ADD COLUMN     "timezone" TEXT NOT NULL,
ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "endTime",
DROP COLUMN "invitee_id",
DROP COLUMN "startTime",
ADD COLUMN     "calendarEventId" TEXT,
ADD COLUMN     "cancelledAt" TIMESTAMP(3),
ADD COLUMN     "meetingLink" TEXT,
ADD COLUMN     "slot_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "holiday" ADD COLUMN     "reason" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'UTC',
ALTER COLUMN "date" SET DATA TYPE DATE,
ALTER COLUMN "start_time" DROP NOT NULL,
ALTER COLUMN "start_time" SET DATA TYPE TEXT,
ALTER COLUMN "end_time" DROP NOT NULL,
ALTER COLUMN "end_time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "slot" DROP COLUMN "date",
DROP COLUMN "day",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "holiday_user_id_date_idx" ON "holiday"("user_id", "date");

-- CreateIndex
CREATE INDEX "slot_user_id_event_id_start_time_idx" ON "slot"("user_id", "event_id", "start_time");

-- CreateIndex
CREATE INDEX "slot_event_id_start_time_is_booked_idx" ON "slot"("event_id", "start_time", "is_booked");

-- CreateIndex
CREATE UNIQUE INDEX "slot_event_id_start_time_end_time_key" ON "slot"("event_id", "start_time", "end_time");

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot"("slot_id") ON DELETE CASCADE ON UPDATE CASCADE;
