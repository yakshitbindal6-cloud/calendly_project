import { Router } from "express";
import { get_public_event } from "../controllers/event.controller.js";

export const publicEventRouter: Router = Router();

publicEventRouter.get('/users/:user_id/events/:slug', get_public_event);