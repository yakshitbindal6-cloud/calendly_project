import {Router} from "express";
import { google_callback } from "../controllers/google.controller.js";
export const google_router=Router();
google_router.get('/callback',google_callback);