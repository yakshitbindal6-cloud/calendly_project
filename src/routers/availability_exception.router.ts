import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require_user_id.js";
import {
  add_availability_exception,
  list_user_availability_exceptions,
  delete_availability_exception,
  patch_availability_exception,
  get_availability_exception_byID_controller,
} from "../controllers/availability_exception.controller.js";
import { create_availability_exceptionSchema, update_availability_exceptionSchema } from "../dtos/availability_exception_dto.js";

export const availabilityExceptionRouter = Router();

availabilityExceptionRouter.post("/", requireUserId, validate(create_availability_exceptionSchema), add_availability_exception);
availabilityExceptionRouter.get("/", requireUserId, list_user_availability_exceptions);
availabilityExceptionRouter.get("/:availability_exception_id", requireUserId, get_availability_exception_byID_controller);
availabilityExceptionRouter.patch("/:availability_exception_id", requireUserId, validate(update_availability_exceptionSchema), patch_availability_exception);
availabilityExceptionRouter.delete("/:availability_exception_id", requireUserId, delete_availability_exception);
