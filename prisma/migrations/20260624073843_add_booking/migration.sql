/*
  Warnings:

  - The primary key for the `event` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "event" DROP CONSTRAINT "event_pkey",
DROP COLUMN "id",
ADD COLUMN     "event_id" SERIAL NOT NULL,
ADD CONSTRAINT "event_pkey" PRIMARY KEY ("event_id");

-- CreateTable
CREATE TABLE "booking" (
    "booking_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "invitee_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "date" TIMESTAMP(3) NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("booking_id")
);

-- CreateTable
CREATE TABLE "availability_pref" (
    "pref_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "isrecurring" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_pref_pkey" PRIMARY KEY ("pref_id")
);

-- CreateTable
CREATE TABLE "holiday" (
    "holiday_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "holiday_pkey" PRIMARY KEY ("holiday_id")
);

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability_pref" ADD CONSTRAINT "availability_pref_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday" ADD CONSTRAINT "holiday_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
