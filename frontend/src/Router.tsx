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
import { AccountPage } from "./pages/AccountPage";
import { AdminPage } from "./pages/AdminPage";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Navigate } from "react-router-dom";
import { User } from "./types/user.types";


export const Router = (): ReactElement => {
    const isLoggedIn: boolean = useSelector((state: RootState) => state.login.isLoggedIn);
    const user: User | undefined = useSelector((state: RootState) => state.login.user);
    const role: string | undefined = user?.role;

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:category" element={<CoursesPage />} />
            <Route path="/courses/:category/:product" element={<Productpage />} />

            <Route path="/login" element={isLoggedIn ? role === "customer" ? <Navigate to="/account" /> : <Navigate to="/admin" /> : <LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            {isLoggedIn && role === "customer" && (
                <Route path="/account" element={<AccountPage />} />
            )}

            {isLoggedIn && role === "admin" && (
                <>
                    <Route path="/account" element={<Navigate to="/admin" />} />
                    <Route path="/admin" element={<AdminPage />} />
                </>
            )}

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};