import { Temporal_enabled, Temporal_taskqueue } from "../config/env.js";
import { getTemporalClient } from "../config/temporal.js";
import type { host_slotGeneration } from "../services/slot.service.js";
async function startWorkflow(workflowName: string,workflowId: string,args:unknown[]){
    if(!Temporal_enabled){
        console.warn("[temporal]temporal is disabled,skiping workflow start");
        return null;
    }
    try{
        const client=await Promise.race([
            getTemporalClient(),
            new Promise<never>((_,reject)=>setTimeout(()=> reject(new Error('temporal client connection timeout')),5000))
        ]);
        const handle=await client.workflow.start(workflowName,{
            taskQueue:Temporal_taskqueue,
            workflowId,
            args,
        });
        return handle.workflowId;
    }catch(err){
        console.error(`[temporal] error starting workflow:${workflowName} with id:${workflowId},error:${err}`);
        return null;
    }
} 
 export async function StartregenerateHostSlotWorkflow(input:host_slotGeneration){
        return startWorkflow(
            "regenerateUserSlotsWorkflow",
            `regenerate-User-Slots-${input.host_id}-${Date.now()}`,
            [input],
        );
}
export async function StartBookingNotificationWorkflow(booking_id:number){
    return startWorkflow(
        "bookingNotificationWorkflow",
        `booking-notification-${booking_id}-${Date.now()}`,
        [booking_id],
    );
}
