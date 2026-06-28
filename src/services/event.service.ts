import { createEvent, getEventsByHost, getEventBySlug} from '../repositories/event.repository.js';
import type { create_eventDto, user_eventsDto } from '../dtos/event_dto.js';
import { getbyid } from '../repositories/user.repository.js';
import { badRequest, notFound } from '../utils/api_error.js';
export async function make_event(data:create_eventDto){
    const user=await getbyid(data.user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return createEvent(data);
}
export async function get_user_events(user_id:user_eventsDto["id"]){
    const user=await getbyid(user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return getEventsByHost(user_id);
}
export async function get_event_by_slug(slug:string){
    return getEventBySlug(slug);
}