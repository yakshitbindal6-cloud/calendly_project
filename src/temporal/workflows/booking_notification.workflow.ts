import { proxyActivities} from "@temporalio/workflow";
import type * as activities from "../activities/index.js";

const { SendBookingConfirmationEmailActivity } = proxyActivities<typeof activities>({
    retry: {maximumAttempts: 3},
    startToCloseTimeout: "10 minute",
});
const { SendBookingCancellationEmailActivity } = proxyActivities<typeof activities>({
    retry: {maximumAttempts: 3},
    startToCloseTimeout: "10 minute",
});
export async function bookingNotificationWorkflow(booking_id: number){
    await SendBookingConfirmationEmailActivity(booking_id);
}
export async function bookingCancellationNotificationWorkflow(booking_id: number){
    await SendBookingCancellationEmailActivity(booking_id);
}