import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import { Courses } from "../pages/courses";
import { Categories } from "../pages/categories";
import { About } from "../pages/about";
import { LogIn } from "../pages/log-in";

export const Router = (): ReactElement => {
    return <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/categories/:category" element={<Categories />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<LogIn />} />
    </Routes>
}