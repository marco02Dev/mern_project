import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { transporterData } from "./env.config";

type SendEmailServiceData = {
    to: string,
    subject: string,
    message: string
}

export const sendEmailService = async ({to, subject, message}: SendEmailServiceData) => {
    const transporter: Transporter = nodemailer.createTransport({
        service: transporterData.service, 
            auth: {
            user: transporterData.user,    
            pass: transporterData.password, 
            }
    });

    const mailOptions: SendMailOptions = {
        from: transporterData.user,
        to: to,
        subject: subject,
        text: message
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent")
    } catch(error) {
        throw error;
    }
}