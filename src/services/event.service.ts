import { createEvent, getEventsByHost, getEventBySlug} from '../repositories/event.repository.js';
import type { create_eventDto, event_slugDto } from '../dtos/event_dto.js';
import { getbyid } from '../repositories/user.repository.js';
import { badRequest, notFound } from '../utils/api_error.js';
export async function make_event(user_id:number,data:create_eventDto){
    const user=await getbyid(user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return createEvent(user_id,data);
}
export async function get_user_events(user_id:number){
    const user=await getbyid(user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return getEventsByHost(user_id);
}
export async function get_event_by_slug(slug:event_slugDto['slug']){
    return getEventBySlug(slug);
}