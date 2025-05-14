import { ReactElement } from "react";
import { HeroSection } from "@shared/components/sections/HeroSection";
import { useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setIs404 } from "@shared/store/slices/route-status.slice";

export const NotFoundPage = (): ReactElement => {
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIs404(true));
        return (): void => {
            dispatch(setIs404(false))
        };
    }, [dispatch]);


    return <>
        <HeroSection
            eyebrowText="Oops!"
            title="Page Not Found"
            description="The page you're looking for doesn't exist or has been moved. Return to the homepage and try again."
            imageSrc={"https://res.cloudinary.com/dqwoo44z8/image/upload/v1746648096/hero-image_qrfg8j.webp"}
            imageAlt="Illustration of a page not found"
            secondaryColor
            buttonLabel="Go to home page"
            buttonLink="/"
        />
    </>
}