/*
  Warnings:

  - The primary key for the `slot` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "booking" DROP CONSTRAINT "booking_slot_id_fkey";

-- AlterTable
ALTER TABLE "booking" ALTER COLUMN "slot_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "slot" DROP CONSTRAINT "slot_pkey",
ALTER COLUMN "slot_id" DROP DEFAULT,
ALTER COLUMN "slot_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "slot_pkey" PRIMARY KEY ("slot_id");
DROP SEQUENCE "slot_slot_id_seq";

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_slot_id_fkey" FOREIGN KEY ("slot_id") REFERENCES "slot"("slot_id") ON DELETE CASCADE ON UPDATE CASCADE;
