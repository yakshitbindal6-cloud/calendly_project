import { Router } from "express";
import { validate, validateParams } from '../middlewares/validate.js';
import {  add_event, getEvent_byuser, getEvent_by_slug } from "../controllers/event.controller.js";
import { create_eventScema, user_eventScema, event_slugParams } from "../dtos/event_dto.js";
export const event_Router=Router();
event_Router.post('/',validate(create_eventScema),add_event);
event_Router.get('/slug/:slug',validateParams(event_slugParams),getEvent_by_slug);
event_Router.get('/:id',validateParams(user_eventScema),getEvent_byuser);