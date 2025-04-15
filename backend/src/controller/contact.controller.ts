import { Controller } from "../types/controller.type";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../utils/send-success-message.util";
import { validateEmail } from "../utils/validate-email.util";
import { isString } from "../utils/is-string.util";
import { sendErrorMessage } from "../utils/send-error-massage.util";
import { sendEmailService } from "../config/transporter.config";
import { transporterData } from "../config/env.config";

export const sendEmail: Controller = async (req: Request, res: Response) => {

    type EmailData = {
        name: string,
        email: string,
        message: string
    }

    const { name, email, message }: EmailData = req.body;

    if(isString(name) && isString(message) && validateEmail(email)) {

        try {
            await sendEmailService({
                to: transporterData?.user as string,
                subject: `Web Courses Contact us form request - Name: ${name}, Email: ${email}`,
                message: `You have received a new message from ${name} (${email}):\n\n"${message}"`
            });

            await sendEmailService({
                to: email,
                subject: "Email sent - Thank you for contacting us",
                message: `Dear ${name},\n\nThank you for contacting us. We have received your message:\n\n"${message}"\n\nWe will get back to you soon!`
            });

            sendSuccessMessage({response: res, statusCode: 200});
        } catch {
            sendErrorMessage({response: res, statusCode: 500});     
        }

    } else {
        sendErrorMessage({response: res, statusCode: 400})
    }
}