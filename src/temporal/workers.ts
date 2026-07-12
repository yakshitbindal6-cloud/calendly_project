import { NativeConnection,Worker } from "@temporalio/worker";
import { Temporal_Address, Temporal_namespace, Temporal_taskqueue } from "../config/env.js";
import * as activities from "./activities/index.js";
import { fileURLToPath } from "node:url";
async function runWorker(){
    const connection=await NativeConnection.connect({
        address:Temporal_Address
    });
    const worker=await Worker.create({
        connection,
        namespace:Temporal_namespace,
        taskQueue:Temporal_taskqueue,
        activities:activities,
        workflowsPath:fileURLToPath(new URL("./workflows/index.ts",import.meta.url))
    })
    await worker.run();
}
runWorker().catch((err=>{
    console.error('[temporal] error starting worker',err);
    process.exit(1);
}))