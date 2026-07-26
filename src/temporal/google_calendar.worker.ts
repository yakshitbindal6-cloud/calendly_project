import { NativeConnection, Worker } from "@temporalio/worker";
import { Temporal_Address, Temporal_GoogleCalendar_taskqueue, Temporal_namespace} from "../config/env.js";
import  * as calendarActivities from "./activities/calendar.activities.js"
import { fileURLToPath } from "node:url";
async function run_calendarWorker(){
    const connection=await NativeConnection.connect({
        address:Temporal_Address,
    })
    const worker=await Worker.create({
        connection,
        namespace:Temporal_namespace,
        taskQueue:Temporal_GoogleCalendar_taskqueue,
        activities:calendarActivities,
        workflowsPath:fileURLToPath(new URL("./workflows/calendar.workflow.ts",import.meta.url))
    })
    await worker.run();
}
    run_calendarWorker().catch((err)=>{
        console.error('[temporal][calendar-worker] error starting worker', err);
        process.exit(1);
    })  