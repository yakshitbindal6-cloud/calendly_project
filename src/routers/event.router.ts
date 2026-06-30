import { Router } from "express";
import { validate } from '../middlewares/validate.js';
import { requireUserId } from '../middlewares/require_user_id.js';
import { add_event, getEvent_byuser, delete_event, patch_event, get_public_event } from "../controllers/event.controller.js";
import { create_eventScema, update_eventScema } from "../dtos/event_dto.js";
export const event_Router=Router();

event_Router.post('/', requireUserId, validate(create_eventScema), add_event);
event_Router.get('/', requireUserId, getEvent_byuser);
event_Router.patch('/:event_id', requireUserId, validate(update_eventScema), patch_event);
event_Router.delete('/:event_id', requireUserId, delete_event);
event_Router.get('/public/:user_id/:slug', get_public_event);