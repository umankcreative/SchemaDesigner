# Landing Page Schema Editor

## Overview

A visual landing page schema editor built with React, TypeScript, and Express.js that allows users to create and customize landing pages through a drag-and-drop interface. The application provides a complete schema-based system for building landing pages with customizable components, themes, and content management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The client-side is built with React and TypeScript using Vite as the build tool. The architecture follows a modular component-based design:

- **Component Library**: Pre-built landing page components (navigation, hero, features, pricing, etc.) located in `client/src/components/landing-components/`
- **Schema Editor**: Visual editor with drag-and-drop functionality using react-dnd for component placement and reordering
- **UI Framework**: Shadcn/ui components with Radix UI primitives for consistent design system
- **Styling**: Tailwind CSS with custom CSS variables for theming support
- **State Management**: React Query for server state and custom hooks for local state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
The server is built with Express.js and follows a RESTful API design:

- **API Routes**: CRUD operations for schema management located in `server/routes.ts`
- **Storage Layer**: Abstracted storage interface with in-memory implementation (`server/storage.ts`)
- **Schema Validation**: Zod schemas for runtime type validation and data integrity
- **Development Setup**: Vite integration for hot module replacement in development

### Data Storage Solutions
The application uses a flexible storage architecture:

- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema Definition**: Shared schema types between client and server using Zod
- **Migrations**: Drizzle-kit for database schema migrations
- **Current Implementation**: In-memory storage for development with database-ready interface

### Schema-Based Content Management
The core architecture revolves around a JSON schema system:

- **Global Themes**: Centralized color palette and typography settings
- **Component Schemas**: Strongly-typed content definitions for each landing page component
- **Version Control**: Built-in history tracking with undo/redo functionality
- **Content Validation**: Runtime validation ensuring data integrity

### Component System Design
Landing page components are designed as pure functions that receive:

- **Content Data**: Component-specific content from the schema
- **Theme Data**: Component-specific styling configuration
- **Global Theme**: Site-wide design tokens

This separation allows for maximum flexibility and reusability while maintaining consistency.

## External Dependencies

### Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM with excellent TypeScript integration
- **drizzle-kit**: Database migration and introspection tools

### UI and Styling
- **@radix-ui/***: Comprehensive set of unstyled, accessible UI primitives
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **class-variance-authority**: Type-safe variant management for component styling
- **clsx**: Utility for constructing className strings conditionally

### State Management and Data Fetching
- **@tanstack/react-query**: Powerful data synchronization for React applications
- **wouter**: Minimalist routing library for React applications

### Development and Build Tools
- **vite**: Fast build tool with excellent development experience
- **tsx**: TypeScript execution engine for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds

### Form Management and Validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **react-hook-form**: Performant forms library with minimal re-renders
- **zod**: TypeScript-first schema validation library

### Drag and Drop Functionality
- **react-dnd**: Flexible drag and drop library for React
- **react-dnd-html5-backend**: HTML5 backend for react-dnd

### Additional Utilities
- **date-fns**: Modern JavaScript date utility library
- **nanoid**: Secure, URL-friendly unique string ID generator
- **multer**: Node.js middleware for handling multipart/form-data