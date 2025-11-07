# AgroPocket Design Guidelines

## Design Direction
Modern dark theme with professional agricultural management aesthetic, emphasizing clarity and efficiency for farm data management.

## Color System
**Foundation:**
- Background: Black (#000000) to dark gray (#0a0a0a, #171717)
- Surface: Dark gray (#1f1f1f, #2a2a2a)
- Text: White (#ffffff) and light gray (#e5e5e5, #a3a3a3)

**Accent Colors:**
- Primary Green: #22c55e (bright green) to #16a34a (darker green)
- Secondary Yellow: #fbbf24 (amber) to #f59e0b (darker amber)
- Use green for success states, primary actions, data growth indicators
- Use yellow for warnings, highlights, pending states

## Typography
- Modern sans-serif font stack
- White/light gray text with strong contrast against dark backgrounds
- Clear hierarchy: Large headings (2xl-4xl), body text (base-lg), small labels (sm-xs)
- Improved readability with slightly increased letter spacing on dark backgrounds

## Layout & Spacing
**Responsive Breakpoints:**
- Mobile: <768px - Hamburger menu, stacked cards, large touch targets
- Tablet: 768-1024px - Adaptive grid, partial sidebar
- Desktop: >1024px - Full horizontal navigation, multi-column layouts

**Spacing System:**
- Use Tailwind spacing units: 2, 4, 6, 8, 12, 16 for consistent rhythm
- Generous padding on cards and sections for breathing room
- Compact mobile spacing, expanded desktop spacing

## Component Design

**Navigation:**
- Desktop: Top horizontal bar with dark background, green/yellow active states
- Mobile: Hamburger menu opening dark sidebar overlay
- User menu with avatar, logout option

**Cards:**
- Dark backgrounds (#1f1f1f, #2a2a2a)
- Soft rounded corners (rounded-lg, rounded-xl)
- Subtle shadows and borders
- Smooth hover transitions with slight elevation

**Forms:**
- Dark input fields with light borders
- Green focus states
- Yellow warning indicators
- Clear label hierarchy
- Success states in green, error states in red

**Buttons:**
- Primary: Green background with hover glow effect
- Secondary: Yellow accents for alternative actions
- Ghost/outline variants for tertiary actions
- Smooth transitions on hover/active states

**Data Displays:**
- Dark cards for statistics and metrics
- Green/yellow data visualizations
- Clear iconography using Lucide React
- Tabular data with alternating row colors for readability

**Toast Notifications (Sonner):**
- Dark backgrounds matching theme
- Green for success, yellow for warnings, red for errors
- Clear icons and messaging

## Module-Specific Design

**Authentication (Login/Register):**
- Centered card layout with glassmorphism effects
- Green CTA buttons
- Dark inputs with light borders
- Smooth page transitions

**Dashboard:**
- Multi-column grid for statistics cards
- Green/yellow data visualizations
- Recent activity feed with timestamps
- Quick action buttons with green accents

**Crops/Inputs/Harvests/History:**
- Consistent table/card layouts
- Filter and search bars with dark styling
- Add/edit forms in modal dialogs
- Status indicators using green/yellow

**Documentation Page:**
- Table of contents navigation sidebar
- Collapsible sections for easy scanning
- Code snippets with dark syntax highlighting
- Clear section headings with icons
- Responsive layout: sidebar on desktop, top nav on mobile
- Includes: System overview, features, tech stack, project structure, user guide, design principles, installation instructions, credits

## Visual Effects
- Subtle hover transitions (200-300ms)
- Smooth corner radius (rounded-lg default)
- Soft shadows for depth
- Minimal animations - focus on clarity
- Subtle glow effects on interactive elements (green/yellow)

## Accessibility
- Strong contrast ratios for text readability
- Focus indicators visible on all interactive elements
- Keyboard navigation support
- Consistent touch target sizes (minimum 44x44px on mobile)

## Critical Principles
- Maintain all existing functionality - only update visuals
- Keep code clean and modular
- Ensure full responsiveness across all breakpoints
- Consistent design language across all pages
- Professional, modern agricultural management aesthetic