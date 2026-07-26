import { createGoogleCalendarEvent} from "../../services/google.service.js";
import { updateBookingCalendarDetails } from "../../repositories/booking.repository.js";
import { ApiError } from "../../utils/api_error.js";
import { deleteGoogleCalendarEvent } from "../../services/google.service.js";
import { clearBookingCalendarDetails } from "../../repositories/booking.repository.js";

export async function CreateGoogleCalendarEventActivity(booking_id:number){
    const result = await createGoogleCalendarEvent(booking_id);

    if (result instanceof ApiError) {
        // propagate the error to the workflow/worker
        throw result;
    }

    return await updateBookingCalendarDetails(booking_id, {
        meetingLink: result.meetingLink,
        calendarEventId: result.calendarEventId,
    });
}

export async function DeleteGoogleCalendarEventActivity(booking_id:number){
    const result = await deleteGoogleCalendarEvent(booking_id);

    // if service returned ApiError, propagate
    if (result instanceof ApiError) {
        throw result;
    }

    // if there was no event to delete, still clear local fields
    await clearBookingCalendarDetails(booking_id);

    return { ok: true };
}