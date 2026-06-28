import type{Request,Response,NextFunction} from 'express'
import { notFound } from '../utils/api_error.js'
export function rout_notfound(req:Request,res:Response,next:NextFunction){
    next(notFound("route not found"))
}