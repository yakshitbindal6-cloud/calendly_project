import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require_user_id.js";
import {
  add_availability,
  list_user_availability,
  list_user_active_availability,
  get_availability_byID_controller,
  patch_availability,
  delete_availability,
} from "../controllers/availability.controller.js";
import { create_availabilitySchema, update_availabilitySchema } from "../dtos/availability_dto.js";

export const availabilityRouter = Router();

availabilityRouter.post("/", requireUserId, validate(create_availabilitySchema), add_availability);
availabilityRouter.get("/", requireUserId, list_user_availability);
availabilityRouter.get("/active", requireUserId, list_user_active_availability);
availabilityRouter.get("/:pref_id", requireUserId, get_availability_byID_controller);
availabilityRouter.patch("/:pref_id", requireUserId, validate(update_availabilitySchema), patch_availability);
availabilityRouter.delete("/:pref_id", requireUserId, delete_availability);
