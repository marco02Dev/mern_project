import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignInPage";
import { ContactPage } from "./pages/ContactPage";
import { Productpage } from "./pages/ProductPage";

export const Router = (): ReactElement => {
    return <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:category" element={<CoursesPage />} />
        <Route path="/courses/:category/:product" element={<Productpage />} />


        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/login' element={<LogInPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path="*" element={<NotFoundPage />} />
    </Routes>
}