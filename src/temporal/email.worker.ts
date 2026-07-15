import { NativeConnection, Worker } from "@temporalio/worker";
import { Temporal_Address, Temporal_namespace, Temporal_email_taskqueue } from "../config/env.js";
import * as emailActivities from "./activities/email.activities.js";
import { fileURLToPath } from "node:url";

async function runEmailWorker() {
    const connection = await NativeConnection.connect({
        address: Temporal_Address
    });
    const worker = await Worker.create({
        connection,
        namespace: Temporal_namespace,
        taskQueue: Temporal_email_taskqueue,
        activities: emailActivities,
        workflowsPath: fileURLToPath(new URL("./workflows/index.ts", import.meta.url))
    });
    await worker.run();
}

runEmailWorker().catch((err) => {
    console.error('[temporal][email-worker] error starting worker', err);
    process.exit(1);
});
