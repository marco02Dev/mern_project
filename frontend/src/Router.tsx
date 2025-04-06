import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Courses } from "./pages/CoursesPage";
import { Categories } from "./pages/CategoriesPage";
import { About } from "./pages/AboutPage";
import { LogInPage } from "./pages/LogInPage";

export const Router = (): ReactElement => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LogInPage />} />
    </Routes>
}