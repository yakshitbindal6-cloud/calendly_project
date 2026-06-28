-- CreateTable
CREATE TABLE "slot" (
    "slot_id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "is_booked" BOOLEAN NOT NULL DEFAULT false,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "slot_pkey" PRIMARY KEY ("slot_id")
);

-- AddForeignKey
ALTER TABLE "slot" ADD CONSTRAINT "slot_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;
