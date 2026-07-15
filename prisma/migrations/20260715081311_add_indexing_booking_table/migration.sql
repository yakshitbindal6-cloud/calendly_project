-- CreateIndex
CREATE INDEX "booking_user_id_event_id_slot_id_idx" ON "booking"("user_id", "event_id", "slot_id");

-- CreateIndex
CREATE INDEX "booking_user_id_status_idx" ON "booking"("user_id", "status");
