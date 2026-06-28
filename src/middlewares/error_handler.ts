import type { Response,Request,NextFunction } from "express";
import { ApiError } from "../utils/api_error.js";
import { Node_env } from "../config/env.js";
export function errorhandler(err:Error,req:Request,res:Response,next:NextFunction){
    if(err instanceof ApiError){
        const body:Record<string,unknown>={
            success:false,
            message:err.message
        }
        if(err.details)body.details=err.details
        if(Node_env=='development')body.details=err.stack
        res.status(err.statusCode).json(body);
        return
    }
    console.error("error",err)
     const body:Record<string,unknown>={
            success:false,
            message:"something went wrong"
        }
    if(Node_env=='development')body.details=err.stack
        res.status(500).json(body)
}