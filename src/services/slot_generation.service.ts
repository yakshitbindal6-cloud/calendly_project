import { DateTime, Interval } from 'luxon';

export interface Timewindow{
    start_time:DateTime,
    end_time:DateTime
}

export function parseTimeonDate(date:DateTime,time:string,timezone:string){
    const [hour,minute]=time.split(":").map(Number);
    return date.setZone(timezone).set({
        hour,
        minute,
        second:0,
        millisecond:0
    })
}
export function merge(windows:Timewindow[]) : Timewindow[]{
    if(windows.length===0)return [];
    const sorted=[...windows].sort((a,b)=>a.start_time.toMillis()- b.start_time.toMillis())
    const mergeResult:Timewindow[]=[sorted[0]!]
    for(let i=1;i<windows.length;i++){
        const current=sorted[i]!;
        const last=mergeResult[mergeResult.length-1]!;
        if(current.start_time<= last.end_time){
            last.end_time=current.end_time>=last.end_time? current.end_time:last.end_time
        }
        else{
            mergeResult.push(current);
        }
    }
    return mergeResult;
}
export function splitToSlots(windows:Timewindow[],Duration:number,bufferbeforeMin:number,bufferafterMin:number):Timewindow[]{
    const slots:Timewindow[]=[];
    const TotalMin=Duration+bufferafterMin+bufferbeforeMin;
    for(const window of windows){
        let cursor=window.start_time;
        while(cursor.plus({minutes:TotalMin})<=window.end_time){
            const slot_start=cursor.plus({minutes:bufferbeforeMin})
            const slot_end=slot_start.plus({minutes:Duration})
            slots.push({start_time:slot_start,end_time:slot_end});
            cursor=cursor.plus({minutes:Duration})
        }
    }
    return slots;
}
export function subtractToWindow(windows:Timewindow[],block:Timewindow):Timewindow[]{
    const result:Timewindow[]=[];
    for(const window of windows){
        const interval=Interval.fromDateTimes(window.start_time,window.end_time);
        const block_interval=Interval.fromDateTimes(block.start_time,block.end_time);
        if(!interval.overlaps(block_interval)){
            result.push(window);
            continue;
        }
        if(window.start_time<block.start_time){
            result.push({start_time:window.start_time,end_time:block.start_time});
        }
        if(window.end_time>block.end_time){
            result.push({start_time:block.end_time,end_time:window.end_time});
        }
    }
    return result.filter(w => w.end_time>=w.start_time); //drop zero length interval
}
export function overlap_booked(slot:Timewindow,booked:Timewindow[],bufferbeforeMin:number,bufferafterMin:number){
    const padded_start=slot.start_time.minus(bufferbeforeMin);
    const padded_end=slot.end_time.plus(bufferbeforeMin);

    return booked.some((b)=>{
        const interval=Interval.fromDateTimes(padded_start,padded_end);
        const bookedInterval=Interval.fromDateTimes(b.start_time,b.end_time);
        return interval.overlaps(bookedInterval);
    })
}
export function apply_exceptions(date:DateTime,base_windows:Timewindow[],exceptions:Array<{
    type:"BLOCK_FULL_DAY"| "BLOCK_PARTIAL"| "ADD_AVAILABLE_WINDOW",
    start_time:string|null,
    end_time:string|null,
    timezone:string
}>):Timewindow[]{
    let windows:Timewindow[]=[...base_windows];

    for(const ex of exceptions){
        if(ex.type=="BLOCK_FULL_DAY"){
           return [];
        }
        if(ex.type=="BLOCK_PARTIAL" && ex.start_time &&ex.end_time){
            const block={
                start_time:parseTimeonDate(date,ex.start_time,ex.timezone),
                end_time:parseTimeonDate(date,ex.end_time,ex.timezone)
            }
            windows=subtractToWindow(windows,block);
        }
        if(ex.type=="ADD_AVAILABLE_WINDOW" && ex.start_time &&ex.end_time){
            windows.push({
                start_time:parseTimeonDate(date,ex.start_time,ex.timezone),
                end_time:parseTimeonDate(date,ex.end_time,ex.timezone)
            })
        }
    }
    return merge(windows);
}