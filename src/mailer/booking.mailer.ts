import { findBookingById } from "../repositories/booking.repository.js";
import { sendEmail } from "../config/nodemailer.js";
export async function SendBookingConfirmationEmail(booking_id: number){
    const booking = await findBookingById(booking_id);
    if(!booking|| booking.status!=="Confirmed")return;
    const when=booking.slot.start_time.toUTCString();

    await sendEmail(booking.guestEmail,`Booking Confirmation :${booking.booking_id}`,`
    <p>Your booking has been confirmed.</p>
    <p>Booking ID: ${booking.booking_id}</p>
    <p>Event: ${booking.event.title}</p>
    <p>Date and Time: ${when}</p>
    <p>Thank you for booking with us!</p>
    `)
}
export async function SendBookingCancellationEmail(booking_id: number){
    const booking = await findBookingById(booking_id);
    if(!booking|| booking.status!=="Cancelled")return;
    const when = booking.slot.start_time.toUTCString();

    await sendEmail(booking.guestEmail,`Booking Cancellation :${booking.booking_id}`,`
    <p>Your booking has been cancelled.</p>
    <p>Booking ID: ${booking.booking_id}</p>
    <p>Event: ${booking.event.title}</p>
    <p>Date and Time: ${when}</p>
    <p>We hope to see you again!</p>
    `)
}