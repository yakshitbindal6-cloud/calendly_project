import type { Request, Response, NextFunction } from "express";
import { badRequest, ApiError } from "../utils/api_error.js";

declare global {
  namespace Express {
    interface Request {
      user_id: number;
    }
  }
}

export function requireUserId(req: Request, res: Response, next: NextFunction) {
  const rawUserId = req.header("user-id") ?? req.header("x-user-id");
  if (!rawUserId) {
    throw new ApiError(401, "User ID header is required");
  }

  const user_id = Number(rawUserId);
  if (!Number.isInteger(user_id) || user_id <= 0) {
    throw badRequest("Invalid user ID header");
  }
  req.user_id = user_id;
  next();
}
