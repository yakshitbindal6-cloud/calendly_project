import nodemailer from "nodemailer";
import { Email_From, SMTP_Host,SMTP_Password,SMTP_Port, SMTP_User } from "./env.js";
let transporter: nodemailer.Transporter|null = null;

export function getTransporter() {
    if(transporter) {
        return transporter;
    }
    transporter = nodemailer.createTransport({
        host:SMTP_Host,
        port:SMTP_Port,
        secure:false,
        auth:SMTP_Host && SMTP_Password ? {
            user:SMTP_User,
            pass:SMTP_Password
        }:undefined
    })
    return transporter;
}
export async function sendEmail(to: string, subject: string, html: string){
    const transporter = getTransporter();
    await transporter.sendMail({
        from:Email_From,
        to,
        subject,
        html
    })
    console.log(`Email sent to ${to} with subject: ${subject}`);
}