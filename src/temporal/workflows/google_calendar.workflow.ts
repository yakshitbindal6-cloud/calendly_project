import { proxyActivities } from "@temporalio/workflow";
import type * as calendarActivities from "../activities/calendar.activities.js"

const {CreateGoogleCalendarEventActivity, DeleteGoogleCalendarEventActivity} = proxyActivities<typeof calendarActivities>({
    retry: { maximumAttempts: 3 },
    startToCloseTimeout: "10 minute",
})

export async function CreateGoogleCalenderWorkflow(booking_id:number){
    await CreateGoogleCalendarEventActivity(booking_id);
}

export async function DeleteGoogleCalendarEventWorkflow(booking_id:number){
    await DeleteGoogleCalendarEventActivity(booking_id);
}