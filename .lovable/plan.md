

# RexPet — Luxury AI Pet Portrait Platform

## Phase 1: Foundation & Database Schema

### Database Setup
- **Users profiles table** with fields for display name, avatar, credit balance
- **User roles table** (USER, ADMIN) with security definer function
- **Styles table** — predefined artistic styles (Oil Painting, Watercolor, Pop Art, Renaissance, etc.)
- **Credit transactions table** — logs all credit purchases, deductions, refunds with idempotency keys
- **Image originals table** — uploaded pet photos with expiry dates (30 days)
- **Generated images table** — AI outputs with status (PENDING/PROCESSING/COMPLETED/FAILED), expiry dates
- **Print orders table** — shipping details (encrypted), Stripe session ID, order status
- **Audit log table** — login attempts, credit usage, generation events, print orders
- Proper indexes on email, foreign keys, status fields, expiresAt
- RLS policies on all tables

### Authentication
- Supabase Auth with email/password signup and login
- Password minimum length enforcement (10 chars)
- Account lockout after 5 failed attempts (tracked via audit log + edge function)
- Role-based access control (USER, ADMIN)
- Auth state management with protected routes

### Storage
- **pet-originals** bucket for uploaded photos (private, RLS-protected)
- **generated-images** bucket for AI outputs (private, RLS-protected)
- File validation (type, size limits) on upload

---

## Phase 2: Landing Page & Brand Identity

### Luxury Landing Page
- Emotional hero section with large typography, soft shadows, premium spacing
- Brand colors: warm, luxurious palette (golds, deep blues, soft whites)
- Animated example gallery showcasing before/after pet transformations
- Credit pricing section with clear tier options
- FAQ accordion section
- Strong CTA buttons throughout ("Transform Your Pet", "Get Started")
- Fully responsive (mobile, tablet, desktop breakpoints)
- Accessible: semantic HTML, aria-labels, keyboard navigation, color contrast

---

## Phase 3: Credit System & Stripe Integration

### Credit Purchase Flow
- Credit packages displayed with pricing (e.g., 1 credit €9.99, 5 credits €39.99, 10 credits €69.99)
- Stripe Checkout Sessions with idempotency keys
- Webhook handler edge function to verify signatures and credit accounts
- Transactional credit deduction (prevents race conditions)
- All transactions logged in credit_transactions table
- Edge cases handled: webhook replay, concurrent requests, balance exactly 1

---

## Phase 4: Image Generation Flow (Async)

### Upload & Style Selection
- Modal with drag & drop image upload
- File validation (type, size) with inline errors
- Style picker — predefined gallery + custom prompt option
- Preview of uploaded image

### AI Generation Pipeline (Edge Functions)
1. **Prompt Improvement** — Edge function calls Lovable AI (gemini-3-flash-preview) to enhance user's style prompt
2. **Credit Deduction** — Transactional deduction before generation begins
3. **Generation Record** — Created with PENDING status
4. **Image Generation** — Edge function calls Lovable AI (gemini-2.5-flash-image) for 1K image
5. **Storage** — Generated image saved to Supabase Storage
6. **Status Update** — Record updated to COMPLETED or FAILED
7. **Failure Handling** — Automatic credit refund on FAILED status

### Status Polling
- Frontend polls generation status endpoint every few seconds
- Visual progress indicator (skeleton loader → result)
- Status badges: PENDING, PROCESSING, COMPLETED, FAILED

---

## Phase 5: Dashboard

### Layout
- Right sidebar navigation: Dashboard, History, Settings
- Top-right CTA: "Want your physical masterpiece?"
- Responsive layout across all breakpoints

### Dashboard View
- Recent generations with status indicators
- Credit balance display
- Quick-action upload button

### History View
- Paginated list of all generations
- Filter by status
- Download button for completed images
- Expiry countdown badges

### Settings View
- Profile management
- Password change
- Account deletion (hard delete of all data)

### States
- Loading states with skeleton loaders
- Empty states with helpful CTAs
- Error states with retry options

---

## Phase 6: Print Order Flow

### 3-Step Modal
1. **Step 1** — Price display (€79 example), shipping estimate, live preview of selected image
2. **Step 2** — Select from completed generation history
3. **Step 3** — Validated shipping address form + Stripe Checkout

### Backend
- Edge function creates idempotent Stripe Checkout Session
- Webhook verifies signature, prevents duplicate orders
- Order status tracking (PENDING, PAID, SHIPPED, DELIVERED)
- Shipping data encrypted in database

---

## Phase 7: Background Jobs & Data Retention

### Cleanup Jobs (pg_cron)
- Scheduled edge function runs daily
- Deletes expired images (30+ days) from storage and database
- Cleans up failed/orphaned generation records

### Audit Logging
- All security-relevant events logged: login attempts, credit usage, generation requests, print orders
- No secrets logged

---

## Phase 8: Admin & Security Hardening

### Admin Panel (ADMIN role only)
- User management overview
- Generation statistics
- Print order tracking
- Audit log viewer

### Security
- Zod validation on all edge function inputs (reject unknown fields)
- RLS policies enforcing row-level access
- Rate limiting on auth endpoints via edge function logic
- Secure HTTP headers
- CSP headers configured
- Parameterized queries only (Supabase client API)

---

## Phase 9: Polish & Performance

### Performance
- Lazy-loaded dashboard components
- Skeleton loaders throughout
- CDN-ready image URLs from Supabase Storage
- Optimized queries (no SELECT *, proper indexes)
- Connection pooling (Supabase built-in)

### Accessibility
- Full keyboard navigation
- Semantic HTML throughout
- ARIA labels on interactive elements
- Sufficient color contrast (WCAG AA)

### Error Handling
- Structured error responses from all edge functions
- Graceful handling of: insufficient credits, AI timeout, AI failure, expired images, token expiry during checkout

