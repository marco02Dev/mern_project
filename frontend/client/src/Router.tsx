import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ContactPage } from "./pages/ContactPage";
import { Productpage } from "./pages/ProductPage";
import { Navigate } from "react-router-dom";
import { UseAuth, useAuth } from "@shared/hooks/auth/useAuth";

export const Router = (): ReactElement => {
    const { isLoggedIn, userData}: UseAuth = useAuth()

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:category" element={<CoursesPage />} />
            <Route path="/courses/:category/:product" element={<Productpage />} />

            <Route path="/login" element={isLoggedIn ? userData.role === "customer" ? <Navigate to="/account" /> : <Navigate to="/admin" /> : <LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};