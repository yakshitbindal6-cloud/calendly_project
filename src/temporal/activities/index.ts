import { SendBookingCancellationEmail, SendBookingConfirmationEmail } from "../../mailer/booking.mailer.js";
import{ slotRegeneration, type host_slotGeneration} from "../../services/slot.service.js";

export async function regenerateHostSlotActivity(input: host_slotGeneration) {
    await slotRegeneration(input);
}
export async function SendBookingConfirmationEmailActivity(booking_id: number){
    await SendBookingConfirmationEmail(booking_id);
}
export async function SendBookingCancellationEmailActivity(booking_id: number){
    await SendBookingCancellationEmail(booking_id);
}