import { prisma } from "../config/database.js";
import type { create_eventDto, user_eventsDto } from "../dtos/event_dto.js";
import { notFound } from "../utils/api_error.js";
export async function createEvent(data:create_eventDto){
    const event= await prisma.event.create({
        data
    })
    return event
}
export async function getEventsByHost(user_id:user_eventsDto["id"]){
    const events = await prisma.event.findMany({
        where: {
            user_id
        },
        include: {
            slots: true,
            bookings: true
        }
    })
    return events
}
export async function getEventBySlug(slug:string){
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