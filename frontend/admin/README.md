# Admin

This folder contains the **Admin entry point** of the application, strictly reserved for users with administrative privileges. Access is **protected by both authentication and server-side role verification**.

## Contents

* **index.html**: The HTML file that serves as the entry point for the Admin interface.
* **src/**: The source code for the Admin dashboard, including components, pages, and logic related to course management.

## Access and Behavior

In **production mode**, access to the Admin bundle is allowed **only after**:

1. A successful **authentication**.
2. A **server-side check** confirming that the authenticated user has the `admin` role.

If either check fails, the server **will not serve** the Admin JavaScript bundle.

## Purpose

The **Admin** module provides tools and interfaces for managing course content, including:

* Creating new courses.
* Editing existing courses.
* Deleting courses.
* Updating course details.

This section ensures that only authorized administrators can perform critical operations on course data.

---
