import type { host_slotGeneration } from "../../services/slot.service.js";
import { proxyActivities} from "@temporalio/workflow";
import type * as activities from "../activities/index.js";

const { regenerateHostSlotActivity } = proxyActivities<typeof activities>({
    retry: {maximumAttempts: 3},
    startToCloseTimeout: "10 minute",
});
export async function regenerateUserSlotsWorkflow(input:host_slotGeneration){
    await regenerateHostSlotActivity(input);
}