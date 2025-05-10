import { ReactElement, useEffect } from "react";
import { TextSection } from "../components/sections/TextSection";
import { HeroSection } from "../components/sections/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { setIsLoginPage } from "../store/slices/route-status.slice";
import { Dispatch } from "@reduxjs/toolkit";
import { LoginForm } from "../components/forms/LoginForm";
import { useAuth, UseAuth } from "../hooks/auth/useAuth";

export const LogInPage = (): ReactElement => {
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    const { isLoggedIn }: UseAuth = useAuth();
    const isLoginPage: boolean = useSelector((state: RootState) => state.routeStatus.isLoginPage)

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
            imageSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746268525/hero-section_ewsf79.webp`}
            imageAlt="Minimalist desk setup with monitor and coding posters"
            secondaryColor
        />

        <LoginForm 
            imgSrc={`https://res.cloudinary.com/dqwoo44z8/image/upload/v1746269092/form-section_xgjtv0.webp`}
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