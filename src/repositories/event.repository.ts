import { prisma } from "../config/database.js";
import type { create_eventDto, event_slugDto, update_eventDto } from "../dtos/event_dto.js";
import { notFound } from "../utils/api_error.js";
export async function createEvent(user_id:number,data:create_eventDto){
    const event= await prisma.event.create({
        data:{
            user_id,
            ...data
        }
    })
    return event;
}
export async function updateEvent(event_id:number,data:update_eventDto){
    const event=await prisma.event.update({
        where:{event_id},
        data
    })
    return event;
}
export async function removeEvent(event_id:number){
    await prisma.event.delete({
        where:{event_id}
    })
}
export async function getEventsByHost(user_id:number){
    const events = await prisma.event.findMany({
        where: {
            user_id
        },
        include: {
            slots: true,
            bookings: true
        }
    })
    return events;
}
export async function getEventById(event_id:number){
    const event=await prisma.event.findUnique({
        where:{
            event_id
        },
        include: {
            slots: true,
            bookings: true
        }
    })
    if(!event)throw notFound("event not found");
    return event;
}
export async function getEventBySlug(slug:event_slugDto['slug']){
    const event = await prisma.event.findUnique({
        where: {
            slug
        },
        include: {
            slots: true,
            bookings: true,
            host: true
        }
    })
    if (!event) throw notFound("Event not found");
    return event;
}
export async function SlugExistsforHost(user_id:number,slug:event_slugDto['slug']){
    const exist=await prisma.event.findFirst({
         where:{
            user_id,
            slug
        }
    })
    return exist !== null;;
   
}