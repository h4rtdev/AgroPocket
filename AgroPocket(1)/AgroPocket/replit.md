# AgroPocket

## Overview

AgroPocket is a web-based agricultural data management system that enables farmers and agricultural professionals to track and manage crops, inputs, harvests, and operational history. The application features a modern dark theme with green and yellow accents, providing a professional interface for comprehensive farm data management. Data is persisted client-side using browser LocalStorage, making it a lightweight solution that doesn't require backend infrastructure for data storage.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server
- Wouter for lightweight client-side routing
- TanStack Query for data fetching and state management patterns

**Component Architecture:**
- shadcn/ui component library built on Radix UI primitives for accessible, customizable UI components
- Component structure follows a clear separation: `components/ui/` for reusable UI primitives, `components/` for application-specific components
- Layout component provides responsive navigation with mobile hamburger menu and desktop horizontal navigation
- Protected routes enforce authentication requirements

**State Management:**
- Client-side authentication state managed through localStorage
- Form state handled by react-hook-form with Zod schema validation
- Application data (crops, inputs, harvests, history) persisted in localStorage with user-specific filtering

**Styling System:**
- Tailwind CSS with custom configuration for dark theme
- CSS custom properties (HSL color system) for theming
- Design system based on neutral grays with primary green (#22c55e) and secondary yellow (#fbbf24) accents
- Responsive breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)

### Backend Architecture

**Minimal Express Server:**
- Express.js server primarily serves as a development and static file server
- Vite middleware integration for hot module replacement in development
- Storage interface exists but implements in-memory storage (not actively used for data persistence)
- No active API routes - all data operations happen client-side

**Build Process:**
- Client built with Vite, outputs to `dist/public`
- Server bundled with esbuild for production deployment
- TypeScript configuration with path aliases for clean imports

### Data Storage & Schemas

**Client-Side Storage:**
- All user data persisted in browser localStorage
- Data segregated by user ID to support multi-user capability
- Storage modules: auth.ts (user authentication), storage.ts (CRUD operations for crops, inputs, harvests, history)

**Data Schemas (Zod):**
- User schema: id, name, email, password
- Crop schema: tracks planting information, area, status (planted/growing/harvested/failed)
- Input schema: fertilizers, pesticides, seeds, equipment with quantity, cost, and supplier tracking
- Harvest schema: links to crops, records quantity, quality, and market price
- History schema: audit trail of all create/update/delete operations

### Authentication & Authorization

**Client-Side Authentication:**
- SHA-256 password hashing using Web Crypto API
- Session persistence via localStorage
- Protected route component checks authentication status
- User registration with email validation and password confirmation
- Logout clears authentication state

**Security Considerations:**
- Client-side authentication suitable for demo/prototype but not production-ready
- No server-side session management or JWT tokens
- Passwords hashed but stored in browser localStorage

### External Dependencies

**UI Component Libraries:**
- @radix-ui/* suite: Accessible, unstyled UI primitives (dialogs, dropdowns, popovers, etc.)
- Lucide React: Icon library
- class-variance-authority: Utility for managing component variants
- cmdk: Command palette component

**Form Management:**
- react-hook-form: Form state management
- @hookform/resolvers: Zod integration for form validation
- zod: Schema validation and TypeScript type inference
- drizzle-zod: Schema generation utilities

**Database Preparation (Not Active):**
- drizzle-orm: SQL ORM configured but not used in current implementation
- @neondatabase/serverless: Postgres driver for Neon database
- drizzle-kit: Database migration tool
- connect-pg-simple: PostgreSQL session store (prepared but unused)

**Development Tools:**
- @replit/* plugins: Vite plugins for Replit development environment
- TypeScript with strict mode enabled
- ESM module system throughout

### Responsive Design Strategy

**Mobile (<768px):**
- Hamburger menu in Sheet component
- Stacked card layouts
- Large touch targets for form inputs and buttons
- Single-column data display

**Tablet (768-1024px):**
- Adaptive grid layouts
- Partial sidebar or compact navigation
- Two-column layouts where appropriate

**Desktop (>1024px):**
- Full horizontal navigation bar
- Multi-column layouts for data tables
- Expanded card grids (2-3 columns)
- Larger viewport for forms and dialogs

### Design System

**Color Palette:**
- Dark backgrounds: #000000 to #2a2a2a
- Primary green: #22c55e (success states, growth indicators)
- Secondary yellow: #fbbf24 (warnings, highlights)
- Text: white (#ffffff) to light gray (#a3a3a3)

**Typography:**
- Sans-serif font stack with multiple fallbacks
- Increased letter spacing for dark backgrounds
- Clear hierarchy: headings (2xl-4xl), body (base-lg), small text (sm-xs)

**Component Patterns:**
- Rounded corners (lg: 9px, md: 6px, sm: 3px)
- Subtle shadows and borders for depth
- Hover and active states with elevation effects
- Green focus rings for accessibility