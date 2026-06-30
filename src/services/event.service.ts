import slug from "slug"
import { createEvent, getEventsByHost, SlugExistsforHost, getEventById, removeEvent, findActiveHostAndSlug, updateEvent} from '../repositories/event.repository.js';
import type { create_eventDto, update_eventDto } from '../dtos/event_dto.js';
import { getbyid } from '../repositories/user.repository.js';
import { conflict, notFound,forbidden } from '../utils/api_error.js';
export async function get_user_events(user_id:number){
    const user=await getbyid(user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return getEventsByHost(user_id);
}
export async function create_event(user_id:number,data:create_eventDto){
    const slug_pass=data.slug?? slug(data.title)
    if(!slug_pass){
        throw conflict("could not generate a slug for the event");
    }
    const isSlug_taken=await SlugExistsforHost(user_id,slug_pass);
    if(isSlug_taken)throw conflict("event with this slug already exists, please use diffrent slug");
    return createEvent(user_id,{...data,slug:slug_pass});
}
export async function remove_event(user_id:number,event_id:number){
    const event=await getEventById(event_id);
    if (!event) {
        throw notFound("event not found");
    }
    if(event.user_id!==user_id){
        throw forbidden("you are not authorized to delete a event");
    }
    return removeEvent(event_id)
}
export async function update_event(user_id:number,event_id:number,data:update_eventDto){
    const event=await getEventById(event_id);
    if (!event) {
        throw notFound("event not found");
    }
    if(event.user_id!=user_id){
        throw forbidden("you are not authorized to update a event");
    }
    if(data.slug && data.slug!==event.slug){
        const isSlug_taken=await SlugExistsforHost(user_id,data.slug);
        if(isSlug_taken)throw conflict("event with this slug already exists, please use diffrent slug");
    }
    return updateEvent(event_id,data);
}
export async function getevent_public(user_id:number,slug:string){
    const event=await findActiveHostAndSlug(user_id,slug);
    if(!event){
        throw notFound("event not found");
    }
    const user=await getbyid(user_id);
    if (!user) {
        throw notFound("user not found");
    }
    return {
        event:{
            id:event.event_id,
            title:event.title,
            description:event.description,
            duration:event.duration

        },
        host:{
            email:user.email,
            name:user.name
        }
    }
}