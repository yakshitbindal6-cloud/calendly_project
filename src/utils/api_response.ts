import type{Response}from "express"
interface success<T>{
    success:true,
    data:T,
    message?:string
}
export function send_success<T>(res:Response,data:T,message?:string,statusCode=200):void{
    const body:success<T>={
        success:true,
        data
    }
    if(message)body.message=message
    res.status(statusCode).json(data)
}