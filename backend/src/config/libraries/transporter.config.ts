import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import { transporterData } from "@config/system/env.config";
import logger from "@config/libraries/winston.config";

type SendEmailServiceData = {
    to: string,
    subject: string,
    message: string
}

/**
 * Handles the configuration and execution of sending an email using Nodemailer.
 * 
 * This function creates a transporter using service credentials provided in the environment
 * configuration and sends a basic text email. It is typically used by the application's
 * contact-related features (e.g., contact form submissions).
 * 
 * @param {Object} params - Email configuration.
 * @param {string} params.to - Recipient email address.
 * @param {string} params.subject - Subject of the email.
 * @param {string} params.message - Text content of the email.
 * 
 * @returns Resolves if the email is sent successfully.
 * 
 * @throws Will throw an error if the email cannot be sent.
 * 
 * @example
 * await sendEmailService({
 *   to: 'admin@example.com',
 *   subject: 'New Contact Message',
 *   message: 'A user has submitted the contact form.'
 * });
*/

export const sendEmailService = async ({to, subject, message}: SendEmailServiceData): Promise<void> => {
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
        logger.info(`A new email has been sent to ${to} with the subject: "${subject}"`);
    } catch(error) {
        logger.error(`Failed to send email to ${to} with subject: "${subject}". Error: ${error instanceof Error ? error.message : String(error)}`);
        throw error;
    }
}