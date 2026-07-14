import { DateTime } from "luxon";
import { slot_Days } from "../config/env.js";
import { find_active_availability } from "../repositories/availability.repository.js"; 
import { findBookedSlotsByHostInRange, upsertSlot, findSlotsByEventInRange, updateSlotStatus } from "../repositories/slots.repository.js";
import { ExeptionsInRange } from "../repositories/availability_exception.repository.js";
import { apply_exceptions, overlap_booked, splitToSlots, windowFromAvail, type Timewindow } from "./slot_generation.service.js";
import { getEventsByHost } from "../repositories/event.repository.js";
import { getbyid } from "../repositories/user.repository.js";
import { badRequest, notFound } from '../utils/api_error.js';
export interface host_slotGeneration{
    host_id:number
    from ?:string,
    to?:string
}

export async function slotRegeneration(input:host_slotGeneration){
    const host = await getbyid(input.host_id);
    if(!host)throw notFound("user not fount");
    const from=input.from? DateTime.fromISO(input.from,{zone:'utc'}).startOf('day'):DateTime.now().startOf('day').toUTC();
    const to=input.to? DateTime.fromISO(input.to,{zone:'utc'}).endOf('day'):from.plus({days: slot_Days }).endOf('day').toUTC();

    const [ActiveAvailable_Host,Host_events,BookedSlots,Exceptions]=await Promise.all([
        find_active_availability(input.host_id),
        getEventsByHost(input.host_id),
        findBookedSlotsByHostInRange(input.host_id,from.toJSDate(),to.toJSDate()),
        ExeptionsInRange(input.host_id,from.toJSDate(),to.toJSDate())
    ])
    // convert slots to timewindows ->compalible with luxon
    const bookedWindows:Timewindow[]=BookedSlots.map((slot)=>{
        return{
            start_time:DateTime.fromJSDate(slot.start_time,{zone:'utc'}),
            end_time:DateTime.fromJSDate(slot.end_time,{zone:'utc'})
        }
    })

    for (const event of Host_events) {
        const generatevalidkey=new Set<string>();
       for(let cursor=from;cursor<=to;cursor=cursor.plus({days:1})){
            const dateKey=cursor.toISODate();
            const dayExeptions=Exceptions.filter((ex)=>DateTime.fromJSDate(ex.date,{zone:'utc'}).toISODate()===dateKey);
            const dayExeptionswithTimezone=dayExeptions.map((ex)=>{
                return{
                    type:ex.type,
                    start_time:ex.start_time,
                    end_time:ex.end_time,
                    timezone:ex.timezone
                }
            })
            let windows:Timewindow[]=[];
            //convert availability to timewindows ->compalible with luxon
            for(const availability of ActiveAvailable_Host){
                windows.push(...windowFromAvail(cursor,availability.weekday,availability.start_time,availability.end_time,availability.timezone))
            }
            //apply exceptions to windows
            windows=apply_exceptions(cursor,windows,dayExeptionswithTimezone);
            const slots_generated=splitToSlots(
                windows,
                event.duration,
                event.bufferbeforeTime,
                event.bufferafterTime
            ).filter((slot)=>slot.start_time>=DateTime.utc()&&!overlap_booked(slot,bookedWindows,event.bufferbeforeTime,event.bufferafterTime));
            await Promise.all(
                        slots_generated.map((slot) => {
                        const start=slot.start_time.toUTC().toJSDate();
                        const end=slot.end_time.toUTC().toJSDate();
                        const key=`${event.event_id}|${start.toISOString()}|${end.toISOString()}`;
                        generatevalidkey.add(key);
                        return upsertSlot(input.host_id,event.event_id,start,end);
               })   
    )
}   
                const allslots = await findSlotsByEventInRange(event.event_id, from.toJSDate(), to.toJSDate(), ["available","blocked"]);
                await Promise.all(allslots.map((slot)=>{
                    const key=`${slot.event_id}|${slot.start_time.toISOString()}|${slot.end_time.toISOString()}`;
                    if(!generatevalidkey.has(key)){
                        return updateSlotStatus(slot.slot_id,"blocked")
                    }
                    })
                )
}
}