-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "host_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "locationType" TEXT NOT NULL DEFAULT 'online',
    "locationValue" TEXT,
    "bufferbeforeTime" INTEGER NOT NULL DEFAULT 0,
    "bufferafterTime" INTEGER NOT NULL DEFAULT 0,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
