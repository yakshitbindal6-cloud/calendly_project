import { SendBookingCancellationEmail, SendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";

export async function SendBookingConfirmationEmailActivity(booking_id: number) {
    await SendBookingConfirmationEmail(booking_id);
}

export async function SendBookingCancellationEmailActivity(booking_id: number) {
    await SendBookingCancellationEmail(booking_id);
}
