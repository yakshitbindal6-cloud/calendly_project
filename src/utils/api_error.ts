export class ApiError extends Error{
    readonly statusCode:number
    readonly details?:unknown
    constructor(statusCode:number,message:string,detail?:unknown){
        super(message);
        this.statusCode=statusCode;
        this.details=detail;
        this.name="ApiError"
        Error.captureStackTrace(this,this.constructor)
    }
}
export const badRequest = (message: string,details?: unknown) => new ApiError(400, message, details);
export const notFound = (message: string,details?: unknown) => new ApiError(404, message,details);
export const internalServerError=(message: "internal server error") => new ApiError(500, message);
export const conflict=(message:string,details?: unknown)=> new ApiError(409, message)
export const forbidden=(message:string,details?: unknown)=> new ApiError(409, message)