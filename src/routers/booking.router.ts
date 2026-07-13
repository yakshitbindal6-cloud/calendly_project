import { Router } from "express";
import { create_booking } from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require_user_id.js";
import { create_bookingSchema } from "../dtos/booking_dto.js";

export const bookingRouter = Router();

bookingRouter.post("/", requireUserId, validate(create_bookingSchema), create_booking);