/*
  Warnings:

  - You are about to drop the column `date` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `booking` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `host_id` on the `event` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestEmail` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestName` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "event" DROP CONSTRAINT "event_host_id_fkey";

-- AlterTable
ALTER TABLE "booking" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guestEmail" TEXT NOT NULL,
ADD COLUMN     "guestName" TEXT NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "date",
DROP COLUMN "host_id",
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
