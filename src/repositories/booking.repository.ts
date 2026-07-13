import { prisma } from "../config/database.js";
import type { createBooking_dto } from "../dtos/booking_dto.js";
import type { Prisma } from "../../generated/prisma/client.js";

export async function runBookingTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
) {
  return prisma.$transaction(async (tx) => callback(tx));
}

export async function findSlotById(
  tx: Prisma.TransactionClient,
  slot_id: string
) {
  return tx.slot.findUnique({
    where: {
      slot_id,
    },
  });
}

export async function lockSlotRowForUpdate(
  tx: Prisma.TransactionClient,
  slot_id: string
) {
  return tx.$queryRaw<{ slot_id: string }[]>`
    SELECT slot_id
    FROM "slot"
    WHERE slot_id = ${slot_id}
    FOR UPDATE
  `;
}

export async function markSlotBookedIfAvailable(
  tx: Prisma.TransactionClient,
  slot_id: string
) {
  return tx.slot.updateMany({
    where: {
      slot_id,
      status: "available",
    },
    data: {
      status: "booked",
    },
  });
}

export async function markSlotBooked(
  tx: Prisma.TransactionClient,
  slot_id: string
) {
  return tx.slot.update({
    where: {
      slot_id,
    },
    data: {
      status: "booked",
    },
  });
}

export async function createBookingWithDetails(
  tx: Prisma.TransactionClient,
  user_id: number,
  event_id: number,
  data: createBooking_dto
) {
  return tx.booking.create({
    data: {
      user_id,
      event_id,
      slot_id: data.slot_id,
      guestName: data.guestName,
      guestEmail: data.guestEmail,
      status: "Confirmed",
    },
    include: {
      slot: true,
      event: true,
    },
  });
}