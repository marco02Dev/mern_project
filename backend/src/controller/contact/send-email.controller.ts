import { Controller } from "../../types/controller.type";
import { Request, Response } from "express";
import { sendSuccessMessage } from "../../utils/send-success-message.util";
import { validateEmail } from "../../utils/validate-email.util";
import { isString } from "../../utils/is-string.util";
import { sendErrorMessage } from "../../utils/send-error-massage.util";
import { sendEmailService } from "../../config/libraries/transporter.config";
import { transporterData } from "../../config/system/env.config";
import logger from "../../config/libraries/winston.config";

/**
 * Controller for handling contact form submissions.
 *
 * This controller performs the following steps:
 *  - Validates the presence and correctness of `name`, `email`, and `message` fields.
 *  - Sends a notification email to the administrator using configured email service.
 *  - Sends a confirmation email to the user who submitted the form.
 *  - Logs each important action and any error using Winston.
 *
 * Requires the email transporter to be properly configured in `config/libraries/transporter.config.ts`.
 *
 * @function sendEmailController
 * @async
 * @param {Request} req - Express request object containing `name`, `email`, and `message` in `req.body`.
 * @param {Response} res - Express response object to send back success or error messages.
 * @returns {Promise<void>} - No direct return; response is sent via helper utilities.
*/

export const sendEmailController: Controller = async (req: Request, res: Response): Promise<void> => {

    type EmailData = {
        name: string,
        email: string,
        message: string
    };

    const { name, email, message }: EmailData = req.body;

    if (isString(name) && isString(message) && validateEmail(email)) {
        try {
            logger.info(`Contact form submission received from ${name} <${email}>`);

            await sendEmailService({
                to: transporterData?.user as string,
                subject: `Web Courses Contact us form request - Name: ${name}, Email: ${email}`,
                message: `You have received a new message from ${name} (${email}):\n\n"${message}"`
            });

            logger.info(`Notification email sent to admin for contact form submission from ${email}`);

            await sendEmailService({
                to: email,
                subject: "Email sent - Thank you for contacting us",
                message: `Dear ${name},\n\nThank you for contacting us. We have received your message:\n\n"${message}"\n\nWe will get back to you soon!`
            });

            logger.info(`Confirmation email sent to user ${email}`);

            sendSuccessMessage({ response: res, statusCode: 200 });

        } catch (error) {
            logger.error(`Error sending emails for contact form from ${email}: ${(error as Error).message}`);
            sendErrorMessage({ response: res, statusCode: 500 });
        }
    } else {
        logger.warn(`Invalid contact form data received: name=${name}, email=${email}`);
        sendErrorMessage({ response: res, statusCode: 400 });
    }
};
