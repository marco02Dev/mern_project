# Shared

This folder contains **shared resources** used across the three entry points of the front-end application: **Client**, **Admin**, and **User**. All contents in this folder are **publicly accessible** and aim to promote **code reuse**, **consistency**, and **maintainability** throughout the application.

## Contents

* **Animations**: CSS animation rule sets and keyframes defined using the Styled Components library. These are typically used within styled components but are designed to be reusable across the application.
* **Components**: Reusable React components shared among the entry points.
* **Config**: Centralized configuration files containing constants derived from environment variables, color palettes, sizes, and other application-wide settings.
* **Services**: Functions that handle API interactions or other shared business logic.
* **Hooks**: Custom React hooks that encapsulate shared logic.
* **Store**: Shared Redux slices that define global state accessible from any entry point.
* **Utils**: General-purpose utility functions for common tasks.
* **Styles**: Global styles applied across all entry points, typically imported in the main `layout.tsx` component.
* **Types**: TypeScript type definitions shared across the application for consistency and type safety.

## Purpose

Centralizing these shared resources ensures consistency, reduces code duplication, and improves scalability and maintainability across the entire front-end codebase.

---
