import { Router } from "express";
import { cancel_booking_controller, create_booking, list_host_bookings_controller } from "../controllers/booking.controller.js";
import { validate } from "../middlewares/validate.js";
import { requireUserId } from "../middlewares/require_user_id.js";
import { create_bookingSchema } from "../dtos/booking_dto.js";

export const bookingRouter = Router();

bookingRouter.post("/", requireUserId, validate(create_bookingSchema), create_booking);
bookingRouter.get("/host/bookings", requireUserId, list_host_bookings_controller);
bookingRouter.patch("/:booking_id/cancel", requireUserId, cancel_booking_controller);