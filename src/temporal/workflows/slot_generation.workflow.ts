import type { host_slotGeneration } from "../../services/slot.service.js";
import { proxyActivities} from "@temporalio/workflow";
import type * as slotActivities from "../activities/slot.activities.js";

const { regenerateHostSlotActivity } = proxyActivities<typeof slotActivities>({ 
    retry: {maximumAttempts: 3},
    startToCloseTimeout: "10 minute",
});
export async function regenerateUserSlotsWorkflow(input:host_slotGeneration){
    await regenerateHostSlotActivity(input);
}


// note:proxyActivities is used to call activities from workflows.
//      the workflow does not directly call the activity function
//      instead it calls the activity through a proxy function
//     when call proxied activity function, workflow scheduler will
//     schedule the activity task in task queue and activity worker 
//     will pick up the task and execute the activity task 