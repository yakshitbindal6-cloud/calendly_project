import { getbyid } from "../repositories/user.repository.js";
import { notFound, forbidden } from "../utils/api_error.js";
import {
  createAvailabilityException,
  findAvailabilityExceptionByUser,
  findAvailabilityExceptionById,
  removeAvailabilityException,
  updateAvailabilityException,
} from "../repositories/availability_exception.repository.js";
import type { create_availability_exceptionDto, update_availability_exceptionDto } from "../dtos/availability_exception_dto.js";

export async function create_availability_exception(user_id: number, data: create_availability_exceptionDto) {
  const user = await getbyid(user_id);
  if (!user) {
    throw notFound("user not found");
  }
  return createAvailabilityException(user_id, data);
}

export async function find_availability_exception_byUser(user_id: number) {
  const user = await getbyid(user_id);
  if (!user) {
    throw notFound("user not found");
  }
  return findAvailabilityExceptionByUser(user_id);
}

export async function find_availability_exception_byID(user_id: number, availability_exception_id: number) {
  const availabilityException = await findAvailabilityExceptionById(availability_exception_id);
  if (!availabilityException) {
    throw notFound("availability exception not found");
  }
  if (availabilityException.user_id !== user_id) {
    throw forbidden("you are not authorized to access this availability exception");
  }
  return availabilityException;
}

export async function update_availability_exception(user_id: number, availability_exception_id: number, data: update_availability_exceptionDto) {
  const availabilityException = await findAvailabilityExceptionById(availability_exception_id);
  if (!availabilityException) {
    throw notFound("availability exception not found");
  }
  if (availabilityException.user_id !== user_id) {
    throw forbidden("you are not authorized to update this availability exception");
  }
  return updateAvailabilityException(availability_exception_id, data);
}

export async function remove_availability_exception(user_id: number, availability_exception_id: number) {
  const availabilityException = await findAvailabilityExceptionById(availability_exception_id);
  if (!availabilityException) {
    throw notFound("availability exception not found");
  }
  if (availabilityException.user_id !== user_id) {
    throw forbidden("you are not authorized to delete this availability exception");
  }
  return removeAvailabilityException(availability_exception_id);
}
