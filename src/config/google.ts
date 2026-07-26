import {google} from "googleapis";
import { Google_Client_Id, Google_Client_Secret, Google_Redirect_URI} from "./env.js";

export const oauth2Client=new google.auth.OAuth2(
    Google_Client_Id,
    Google_Client_Secret,
    Google_Redirect_URI
)