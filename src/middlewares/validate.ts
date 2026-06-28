import type{Request, Response, NextFunction} from "express"
import { badRequest } from "../utils/api_error.js";
import type {  ZodType } from "zod";
export const validate=(schema:ZodType) => (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req.body);
    if(!result.success){
        throw badRequest("Validation failed", result.error.issues);
    }
    req.body = result.data;
    next();
}
export const validateParams=(schema:ZodType) => (req:Request,res:Response,next:NextFunction)=>{
    const result = schema.safeParse(req.params);
    if(!result.success){
        throw badRequest("Validation failed", result.error.issues);
    }
    req.params = result.data as typeof req.params;
    next();
}
