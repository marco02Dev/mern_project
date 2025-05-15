# Frontend

This folder contains the complete **frontend codebase** of the application, structured into **three separate entry points**:

* `client`: Public-facing application for users to browse and sign up.
* `user`: Authenticated user area for accessing enrolled courses.
* `admin`: Restricted dashboard for administrative tasks.

Shared resources are centralized in the `shared` folder to promote code reuse and consistency across all entry points.

## Tech Stack

* **React** as the front-end framework.
* **Vite** as the build tool, leveraging its **Multi-Page Application (MPA)** mode and **Rollup**-based bundling.
* **TypeScript**, **Styled Components**, **Redux Toolkit**, and other modern front-end libraries.

## Structure

```
frontend/
├── admin/
├── client/
├── user/
├── shared/
```

## Multi-Page & SPA Strategy

The project uses **Vite's MPA mode** to generate **three independent JavaScript bundles**, one for each entry point (`client`, `user`, `admin`). Each of these bundles powers its own **Single Page Application (SPA)**, meaning that:

* Navigation within each entry point is **handled client-side** using React Router.
* The user only downloads the code relevant to their current context.
* Each SPA is fully isolated, improving **security**, **performance**, and **maintainability**.

In **production mode**, only the required bundle is served:

* `user` is served only after successful authentication.
* `admin` is served only after both authentication and server-side **role-based authorization**.

## Aliases

To simplify and standardize imports, the following path aliases are defined in `vite.config.ts`:

* `@shared`: points to `shared`
* `@client`: points to `client/src`
* `@user`: points to `user/src`
* `@admin`: points to `admin/src`

These aliases improve code readability and avoid long relative paths.

## Purpose

This architecture enables:

* Secure and modular front-end deployment.
* Internal SPA navigation within each application.
* Shared logic without code duplication.
* Scalable maintenance for complex applications with multiple user types.

---
