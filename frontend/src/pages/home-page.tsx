import { ReactElement } from "react";
import { SignInSection } from "../components/sign-in-section";
import { LatestCoursesSection } from "../components/latest-courses-section";
import { SeeAllCoursesSection } from "../components/see-all-courses-section";
import { BrowseCategoriesSection } from "../components/browse-categories-section";

export const HomePage = (): ReactElement => {
    return <div>
        <SignInSection />
        <LatestCoursesSection />
        <SeeAllCoursesSection />
        <BrowseCategoriesSection />
    </div>

}