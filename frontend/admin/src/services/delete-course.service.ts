import { Dispatch, SetStateAction } from "react";
import { endpoints } from "@shared/config/endpoints.config";
import { checkSession } from "@shared/utils/cookies/check-session.util";
import { reloadLoginPage } from "@shared/utils/browser/reload-login-page.util";
import { errorMessages } from "@shared/config/error-messages.config";

type DeleteCourseServiceProps = {
    courseId: string,
    setProductDeleted: Dispatch<SetStateAction<boolean>>,
    setProductDeletedErrorMessage: Dispatch<SetStateAction<string | undefined>>
    isAdmin: boolean
}

export const deleteCourseService = async ({
    courseId, 
    setProductDeleted, 
    isAdmin,
    setProductDeletedErrorMessage
}: DeleteCourseServiceProps) => {

    if (!checkSession()) {
        setProductDeletedErrorMessage(errorMessages.sessionExpired);
        reloadLoginPage();
        return;
    }

    if(courseId && isAdmin) {
        try {
            const response = await fetch(`${endpoints.coursesEndpoint}/${courseId}`, {
                method: "DELETE",
                credentials: "include"
            });

            if(response.ok) {
                setProductDeleted(true);
            }

        } catch {
            setProductDeletedErrorMessage("Server Error");
        }
    } else if(!isAdmin && courseId) {
        setProductDeletedErrorMessage("Permission denied");
        return;
    } else if(isAdmin && !courseId) {
        setProductDeletedErrorMessage("Something went wrong");   
    } else {
        setProductDeletedErrorMessage("Something went wrong");    
    }

}