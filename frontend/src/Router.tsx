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
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { Navigate } from "react-router-dom";


export const Router = (): ReactElement => {

    const isLoggedIn: boolean = useSelector((state: RootState) => state.login.isLoggedIn);

    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />

        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:category" element={<CoursesPage />} />
        <Route path="/courses/:category/:product" element={<Productpage />} />

        <Route path='/account' element={<AccountPage />} />

        <Route path='/login' element={isLoggedIn ? <Navigate to="/account" /> : <LogInPage />} />
        <Route path='/signup' element={<SignUpPage />} />

        <Route path="*" element={<NotFoundPage />} />
    </Routes>
}