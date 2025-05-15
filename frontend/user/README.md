# User

This folder contains the **entry point dedicated to registered users** of the application. Access to this part of the app is **restricted** and available **only after successful authentication**.

## Contents

* **index.html**: The HTML entry point for the User interface.
* **src/**: The source code for the authenticated User area, including components, pages, and logic specific to logged-in users.

## Access and Behavior

In **production mode**, the server will serve the JavaScript bundle for this entry point **only after successful authentication**. The authentication process occurs through the main public entry point (`client`), where users log in.

## Purpose

The **User** module provides functionality for:

* Viewing and managing the courses the user is enrolled in.
* Accessing personalized content and features available only to authenticated users.

This section ensures a **secure and focused experience** for users already registered on the platform.

---
