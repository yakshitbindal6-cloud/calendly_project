/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "availability_pref" DROP CONSTRAINT "availability_pref_user_id_fkey";

-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_invitee_id_fkey";

-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_fkey";

-- DropForeignKey
ALTER TABLE "holiday" DROP CONSTRAINT "holiday_user_id_fkey";

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "id",
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_invitee_id_fkey" FOREIGN KEY ("invitee_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability_pref" ADD CONSTRAINT "availability_pref_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "holiday" ADD CONSTRAINT "holiday_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
