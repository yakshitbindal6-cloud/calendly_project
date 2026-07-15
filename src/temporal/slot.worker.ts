import { NativeConnection, Worker } from "@temporalio/worker";
import { Temporal_Address, Temporal_namespace, Temporal_slot_taskqueue } from "../config/env.js";
import * as slotActivities from "./activities/slot.activities.js";
import { fileURLToPath } from "node:url";

async function runSlotWorker() {
    const connection = await NativeConnection.connect({
        address: Temporal_Address
    });
    const worker = await Worker.create({
        connection,
        namespace: Temporal_namespace,
        taskQueue: Temporal_slot_taskqueue,
        activities: slotActivities,
        workflowsPath: fileURLToPath(new URL("./workflows/index.ts", import.meta.url))
    });
    await worker.run();
}

runSlotWorker().catch((err) => {
    console.error('[temporal][slot-worker] error starting worker', err);
    process.exit(1);
});