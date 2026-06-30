/*
  Warnings:

  - A unique constraint covering the columns `[user_id,slug]` on the table `event` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "event_slug_key";

-- CreateIndex
CREATE UNIQUE INDEX "event_user_id_slug_key" ON "event"("user_id", "slug");
