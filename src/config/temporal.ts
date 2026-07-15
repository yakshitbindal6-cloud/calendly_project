import {Connection,Client} from"@temporalio/client";
import {Temporal_Address,Temporal_namespace,Temporal_slot_taskqueue,Temporal_email_taskqueue} from"./env.js";
let client: Client | null = null;

export async function getTemporalClient(){
    if(client){
        return client;
    }
    const connection = await Connection.connect({
        address:Temporal_Address,
    });

     client = new Client({
        connection,
        namespace: Temporal_namespace,
    });

    return client;
}
export async function disconnectTemporal() {
    if(client) {
        await client.connection.close();
        client = null;
    }
}