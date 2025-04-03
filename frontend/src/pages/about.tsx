import { ReactElement } from "react"
import { DisclaimerSection } from "../components/sections/disclaimer.section";
import { SeeAllCoursesSection } from "../components/sections/see-all-courses-section";
import { LatestCoursesSection } from "../components/sections/latest-courses-section";
import { BrowseCategoriesSection } from "../components/sections/browse-categories-section";

export const About = (): ReactElement => {
    return <>
        <DisclaimerSection />
        <LatestCoursesSection />
        <SeeAllCoursesSection />
        <BrowseCategoriesSection />
    </>
}