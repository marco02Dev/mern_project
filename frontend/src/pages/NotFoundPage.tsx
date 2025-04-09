import { ReactElement } from "react";
import { StyledSection } from "../components/themed/StyledSection";
import { HeroSection } from "../components/sections/HeroSection";
import { endpoints } from "../config/endpoints.config";
import { useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setIs404 } from "../store/slices/route-status.slice";

export const NotFoundPage = (): ReactElement => {
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIs404(true));
        return (): void => {
            dispatch(setIs404(false))
        };
    }, [dispatch]);


    return <StyledSection secondaryColor>
        <HeroSection
            eyebrowText="Oops!"
            title="Page Not Found"
            description="The page you're looking for doesn't exist or has been moved. Return to the homepage and try again."
            imageSrc={`${endpoints.imagesEndpoint}/pages/404/not-found.webp`}
            imageAlt="Illustration of a page not found"
            secondaryColor
            buttonLabel="Go to home page"
            buttonLink="/"
        />

    </StyledSection>
}