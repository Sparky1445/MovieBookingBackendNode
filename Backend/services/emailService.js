import axios from "axios";
import { NOTI_SERVICE } from "../config/serverConfig.js";

export const sendEmail = (subject, content, recipientEmail) => {
    axios.post(`${NOTI_SERVICE}/notiService/api/v1/notification`, {
        subject: subject,
        content: content,
        recipientEmail: recipientEmail,

    })
}


