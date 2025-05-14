import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { AboutPage } from "./pages/AboutPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LogInPage } from "./pages/LogInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { ContactPage } from "./pages/ContactPage";
import { Productpage } from "./pages/ProductPage";

/**
 * `ClientRouter` defines the main route structure for the public-facing `client` entrypoint
 *
 * This component is responsible for rendering all public routes accessible to unauthenticated users,
 * such as home, about, courses, authentication pages, and a 404 fallback.
 *
 * It uses React Router's `<Routes>` and `<Route>` components to map URL paths to page components.
 *
 * Routes included:
 * - `/` → HomePage
 * - `/about` → AboutPage
 * - `/contact` → ContactPage
 * - `/courses` → CoursesPage
 * - `/courses/:category` → CoursesPage
 * - `/courses/:category/:product` → ProductPage
 * - `/login` → LogInPage
 * - `/signup` → SignUpPage
 * - `*` → NotFoundPage (fallback for unknown routes)
 *
 * @returns {ReactElement} The configured routing tree for the `client` scope.
 *
 * @example
 * <Layout>
 *   <ClientRouter />
 * </Layout>
*/

export const ClientRouter: FC = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:category" element={<CoursesPage />} />
            <Route path="/courses/:category/:product" element={<Productpage />} />

            <Route path="/login" element={<LogInPage />} />
            <Route path="/signup" element={<SignUpPage />} />

            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};