/*
  Warnings:

  - You are about to drop the `holiday` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "holiday" DROP CONSTRAINT "holiday_user_id_fkey";

-- DropTable
DROP TABLE "holiday";

-- CreateTable
CREATE TABLE "availability_exception" (
    "availability_exception_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "type" TEXT NOT NULL,
    "start_time" TEXT,
    "end_time" TEXT,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_exception_pkey" PRIMARY KEY ("availability_exception_id")
);

-- CreateIndex
CREATE INDEX "availability_exception_user_id_date_idx" ON "availability_exception"("user_id", "date");

-- AddForeignKey
ALTER TABLE "availability_exception" ADD CONSTRAINT "availability_exception_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
