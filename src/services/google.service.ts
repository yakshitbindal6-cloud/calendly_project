import { Google_Refresh_Token ,Google_Calendar_id} from "../config/env.js";
import { Google_Client_Id, Google_Client_Secret, Google_Redirect_URI} from "../config/env.js";
import {oauth2Client} from "../config/google.js";
import { google } from "googleapis";
import { findBookingById } from "../repositories/booking.repository.js";
import { notFound } from "../utils/api_error.js";
export async function getGoogleAuthUrl() {
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        prompt: "consent",
        scope: ["https://www.googleapis.com/auth/calendar", 
            "https://www.googleapis.com/auth/calendar.events",
            "https://www.googleapis.com/auth/userinfo.email"
        ],
        state:'setup'
    });
    return url;
}
export async function exchangesetup(code:string){
    const client=oauth2Client;
    const {tokens}= await client.getToken(code);
    if(!tokens.refresh_token){
        throw new Error("no refresh token")
    }
    client.setCredentials(tokens);
    
    const oauth2 = google.oauth2({
        version: 'v2',
        auth: client
    });
    const {data}=await oauth2.userinfo.get();
    return {
        refreshToken: tokens.refresh_token,
        email: data.email 
    }
}
export function getGoogleCalendarClient(){
    const client=oauth2Client;
    client.setCredentials({
        refresh_token:Google_Refresh_Token,
    })
    return client;
}
export async function createGoogleCalendarEvent(booking_id:number){
    const booking =await findBookingById(booking_id);
    if(!booking||booking.status!=="Confirmed"){
        return notFound("booking not found");
    }
    const client=getGoogleCalendarClient();

    const calendar=google.calendar({
        version:'v3',
        auth:client
    })
    const event=await calendar.events.insert({
        calendarId:Google_Calendar_id,
        conferenceDataVersion: 1,
        sendUpdates:'all',
        requestBody:{
            summary:`${booking.event.title} with ${booking.user.name} is confirmed`,
            description:[
                booking.event.description,
            ].join('\n'),
            start:{
                dateTime:booking.slot.start_time.toISOString(),
                timeZone:booking.user.timezone
            },
            end: {
                dateTime: booking.slot.end_time.toISOString(),
                timeZone: booking.user.timezone,
            },
            attendees:[
                {email:booking.user.email,displayName:booking.user.name},
                {email:booking.guestEmail,displayName:booking.guestName}
            ],
            conferenceData:{
                createRequest:{
                    requestId:booking.booking_id.toString(),
                    conferenceSolutionKey: {
                        type: 'hangoutsMeet',
                    }
                }
            }
        }

    })

    const meetingLink = event.data.conferenceData?.entryPoints?.find((e) => e.entryPointType === 'video')?.uri ??
                    event.data.hangoutLink ?? null;

    if (!event.data.id || !meetingLink) {
        throw new Error('Failed to create Google Calendar event');
    }

    return {
        meetingLink,
        calendarEventId: event.data.id,
    };
}

export async function deleteGoogleCalendarEvent(booking_id:number){
    const booking = await findBookingById(booking_id);
    if(!booking){
        return notFound('booking not found');
    }

    const eventId = booking.calendarEventId;
    if(!eventId){
        // nothing to delete
        return { deleted: false, reason: 'no_event' };
    }

    const client = getGoogleCalendarClient();
    const calendar = google.calendar({ version: 'v3', auth: client });

    try {
        await calendar.events.delete({
            calendarId: Google_Calendar_id,
            eventId,
        });
        return { deleted: true };
    } catch (err) {
        // surface error to caller
        throw err;
    }
}