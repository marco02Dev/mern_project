import { ReactElement } from "react";
import { SignInSection } from "../components/sections/sign-in-section";
import { LatestCoursesSection } from "../components/sections/latest-courses-section";
import { SeeAllCoursesSection } from "../components/sections/see-all-courses-section";
import { BrowseCategoriesSection } from "../components/sections/browse-categories-section";

export const HomePage = (): ReactElement => {
    return <div>
        <SignInSection />
        <LatestCoursesSection />
        <SeeAllCoursesSection />
        <BrowseCategoriesSection />
    </div>

}