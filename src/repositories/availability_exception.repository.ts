import { prisma } from "../config/database.js";
import type { create_availability_exceptionDto, update_availability_exceptionDto } from "../dtos/availability_exception_dto.js";

export async function createAvailabilityException(user_id: number, data: create_availability_exceptionDto) {
  const availabilityException = await prisma.availability_exception.create({
    data: {
      user_id,
      ...data,
    },
  });
  return availabilityException;
}

export async function updateAvailabilityException(availability_exception_id: number, data: update_availability_exceptionDto) {
  const availabilityException = await prisma.availability_exception.update({
    where: {
      availability_exception_id,
    },
    data,
  });
  return availabilityException;
}

export async function removeAvailabilityException(availability_exception_id: number) {
  await prisma.availability_exception.delete({
    where: {
      availability_exception_id,
    },
  });
}

export async function findAvailabilityExceptionByUser(user_id: number) {
  const availabilityExceptions = await prisma.availability_exception.findMany({
    where: { user_id },
    orderBy: [{ date: "asc" }],
  });
  return availabilityExceptions;
}

export async function findAvailabilityExceptionById(availability_exception_id: number) {
  const availabilityException = await prisma.availability_exception.findUnique({
    where: {
      availability_exception_id,
    },
  });
  return availabilityException;
}
