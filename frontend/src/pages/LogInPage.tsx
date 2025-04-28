import { ReactElement, useEffect } from "react";
import { TextSection } from "../components/sections/TextSection";
import { endpoints } from "../config/endpoints.config";
import { HeroSection } from "../components/sections/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { setIsLoginPage } from "../store/slices/route-status.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { LoginForm } from "../components/forms/LoginForm";

export const LogInPage = (): ReactElement => {
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate()
    const login = useSelector((state: RootState) => state.login);
    const isLoginPage: boolean = useSelector((state: RootState) => state.routeStatus.isLoginPage)
    const { isLoggedIn }: { isLoggedIn: boolean } = login;

    useEffect(() => {
        dispatch(setIsLoginPage(true));

        if(isLoggedIn && isLoginPage) {
            navigate('/account');
        };

        return () => {
            dispatch(setIsLoginPage(false))
        }
    }, [isLoggedIn, isLoginPage]);

    return <>
        <HeroSection
            eyebrowText="Learn. Grow. Succeed."
            title="Your Journey Begins Now"
            description="Don't have an account?"
            buttonLabel="Signup now!"
            buttonLink="/signup"
            imageSrc={`${endpoints.imagesEndpoint}/pages/login/hero-section.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <LoginForm 
            imgSrc={`${endpoints.imagesEndpoint}/pages/contact/form-section.webp`}
        />

        <TextSection
            title="Master Your Skills Today!"
            description="Explore high-quality courses crafted to boost your skills and confidence. Whether you're starting fresh or leveling up, log in or sign up now to begin your learning journey with us!"
            buttonLabel="See all courses"
            buttonLink="/courses"
            secondaryColor
        />
    </>
}