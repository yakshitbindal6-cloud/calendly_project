import { notFound, forbidden } from "../utils/api_error.js";
import { create, update, remove, find_availability_byUser, find_active_availability, find_availability_ById } from "../repositories/availability.repository.js";
import type { CreateAvailabilityDto, UpdateAvailabilityDto } from "../dtos/availability_dto.js";

export async function create_availability(user_id: number, data: CreateAvailabilityDto) {
  return create(user_id, data);
}

export async function get_user_availability(user_id: number) {
  return find_availability_byUser(user_id);
}

export async function get_user_active_availability(user_id: number) {
  return find_active_availability(user_id);
}

export async function get_availability_byID(user_id: number, pref_id: number) {
  const availability = await find_availability_ById(pref_id);
  if (!availability) {
    throw notFound("availability preference not found");
  }
  if (availability.user_id !== user_id) {
    throw forbidden("you are not authorized to access this availability preference");
  }
  return availability;
}

export async function update_availability(user_id: number, pref_id: number, data: UpdateAvailabilityDto) {
  const availability = await find_availability_ById(pref_id);
  if (!availability) {
    throw notFound("availability preference not found");
  }
  if (availability.user_id !== user_id) {
    throw forbidden("you are not authorized to update this availability preference");
  }
  return update(pref_id, data);
}

export async function remove_availability(user_id: number, pref_id: number) {
  const availability = await find_availability_ById(pref_id);
  if (!availability) {
    throw notFound("availability preference not found");
  }
  if (availability.user_id !== user_id) {
    throw forbidden("you are not authorized to delete this availability preference");
  }
  return remove(pref_id);
}
