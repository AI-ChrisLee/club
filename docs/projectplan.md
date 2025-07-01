# Build What You Need Club - Project Plan

## Project Overview

A minimalist community platform built with Next.js and Shadcn/UI to help entrepreneurs cancel expensive SaaS subscriptions by building their own tools. The platform demonstrates its own philosophy by being built in 4 hours to replace $419/month community software.

**Target:** 1000 members @ $97/month = $97K MRR in 30 days

---

## High-Level Checkpoints

### Checkpoint 1: Foundation & Setup ✅
**Timeline:** Day 1 (2 hours)
**Goal:** Project setup with all core dependencies and initial structure

### Checkpoint 2: Authentication & Payments ✅
**Timeline:** Day 1-2 (4 hours)
**Goal:** User signup, login, and Stripe payment integration

### Checkpoint 3: Daily Builds Vault ✅
**Timeline:** Day 2-3 (3 hours)
**Goal:** Core value delivery - upload, list, and download builds

### Checkpoint 4: Community Features ✅
**Timeline:** Day 3-4 (3 hours)
**Goal:** Threads, comments, and basic community interaction

### Checkpoint 5: Live Sessions & Classroom ✅
**Timeline:** Day 4-5 (2 hours)
**Goal:** Video embeds and simple LMS functionality

### Checkpoint 6: Polish & Launch ✅
**Timeline:** Day 5 (2 hours)
**Goal:** Final touches, testing, and production deployment

---

## Detailed Task Breakdown

### Checkpoint 1: Foundation & Setup

#### Development Tasks:
- [ ] Initialize Next.js 14 project with TypeScript
- [ ] Install and configure Shadcn/UI
- [ ] Set up Supabase project and connection
- [ ] Configure environment variables
- [ ] Create basic folder structure (/app, /components, /lib)
- [ ] Set up Tailwind with monospace font and brutalist theme
- [ ] Create layout component with minimal navigation
- [ ] Configure Vercel deployment pipeline
- [ ] Set up Git repository

#### Key Decisions:
- App Router (Next.js 14)
- Server Components by default
- Minimal client-side state
- No CSS animations

---

### Checkpoint 2: Authentication & Payments

#### Development Tasks:
- [ ] Set up Supabase Auth with email/password
- [ ] Create signup/login forms (no OAuth)
- [ ] Extend auth.users with profiles table
- [ ] Add is_active and stripe_customer_id fields
- [ ] Integrate Stripe checkout with Stripe Links
- [ ] Create webhook endpoint for payment confirmation
- [ ] Implement subscription status check middleware
- [ ] Create simple member/non-member gate
- [ ] Add founding member flag logic
- [ ] Test payment flow end-to-end

#### Database Schema:
```sql
-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users primary key,
  is_active boolean default false,
  is_founding_member boolean default false,
  stripe_customer_id text,
  created_at timestamp default now()
);
```

---

### Checkpoint 3: Daily Builds Vault

#### Development Tasks:
- [ ] Create builds table in Supabase
- [ ] Build admin upload interface (drag & drop)
- [ ] Implement file storage with signed URLs
- [ ] Create public builds list page
- [ ] Add search by SaaS name
- [ ] Implement download counter
- [ ] Add "I built this" tracking
- [ ] Create download authorization check
- [ ] Add cost savings calculator display
- [ ] Implement optimistic UI updates

#### Database Schema:
```sql
-- Builds table
create table builds (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  saas_name text not null,
  monthly_cost integer not null,
  file_url text not null,
  download_count integer default 0,
  created_at timestamp default now()
);

-- Implementations table
create table implementations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles,
  build_id uuid references builds,
  created_at timestamp default now()
);
```

---

### Checkpoint 4: Community Features

#### Development Tasks:
- [ ] Create threads table with 4 hardcoded categories
- [ ] Build thread creation form (markdown only)
- [ ] Implement thread listing (recent activity sort)
- [ ] Create comments system
- [ ] Add basic markdown rendering
- [ ] Implement Row Level Security (RLS)
- [ ] Create category filtering
- [ ] Build member-only access control
- [ ] Add thread activity tracking
- [ ] Test community interactions

#### Database Schema:
```sql
-- Threads table
create table threads (
  id uuid primary key default gen_random_uuid(),
  category text check (category in ('daily_builds', 'show_build', 'target_list', 'help_debug')),
  author_id uuid references profiles,
  title text not null,
  content text not null,
  last_activity timestamp default now(),
  created_at timestamp default now()
);

-- Comments table
create table comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads,
  author_id uuid references profiles,
  content text not null,
  created_at timestamp default now()
);
```

---

### Checkpoint 5: Live Sessions & Classroom

#### Development Tasks:
- [ ] Create live sessions page with embed
- [ ] Add hardcoded schedule display
- [ ] Link live chat to threads system
- [ ] Create classroom/courses structure
- [ ] Integrate Wistia video embeds
- [ ] Implement localStorage progress tracking
- [ ] Build simple video navigation
- [ ] Add recording links section
- [ ] Create admin interface for video management
- [ ] Test video playback across devices

---

### Checkpoint 6: Polish & Launch

#### Development Tasks:
- [ ] Implement high-contrast brutalist design
- [ ] Add loading states (minimal)
- [ ] Create 404 and error pages
- [ ] Set up Resend for transactional emails
- [ ] Configure production environment variables
- [ ] Run security audit (RLS, API keys)
- [ ] Performance optimization (static generation)
- [ ] Create admin dashboard for metrics
- [ ] Deploy to Vercel production
- [ ] Final testing of all flows

---

## Agent Instructions

### Marketing Background Agent

**Objective:** Create compelling copy and marketing materials that embody the anti-SaaS philosophy.

**Tasks:**
1. **Landing Page Copy**
   - Write brutalist, direct headlines
   - Create pricing comparison ($97 vs $419)
   - List "SaaS Graveyard" of replaced tools
   - Write manifesto-style value props

2. **Email Templates**
   - Welcome email (no fluff)
   - Daily build announcements
   - Implementation success stories
   - "You saved $X this month" emails

3. **Social Proof Content**
   - Member testimonials format
   - "I cancelled X" celebration posts
   - Running cost savings counter
   - Download/implementation metrics

**Style Guide:**
- Angry at SaaS companies
- Excited about building
- Zero corporate speak
- Show actual numbers
- Brutally honest

**Deliverables:**
- Landing page copy doc
- Email template suite
- Social media post templates
- Metrics display copy

---

### Researcher Agent

**Objective:** Understand target users' pain points and validate our approach.

**Research Areas:**

1. **SaaS Spending Analysis**
   - Average entrepreneur SaaS spend
   - Most commonly overpaid tools
   - Feature usage statistics
   - Cancellation friction points

2. **Community Platform Usage**
   - What features actually get used
   - Engagement patterns
   - Drop-off points
   - Value perception

3. **DIY Builder Motivations**
   - Technical skill levels
   - Time vs money calculations
   - Previous building attempts
   - Success/failure patterns

4. **Competitor Analysis**
   - Circle, Skool, Discord pricing
   - Feature comparison
   - User complaints
   - Switching costs

**Deliverables:**
- User pain point report
- SaaS replacement priority list
- Community engagement insights
- Competitor weakness matrix

---

### Feature Planning Agent

**Objective:** Plan post-MVP roadmap based on member feedback and usage data.

**Planning Framework:**

1. **Success Metrics Tracking**
   - Member growth rate
   - Build download rates
   - Implementation success
   - SaaS cancellation reports

2. **Feature Evaluation Criteria**
   - Does it help cancel a SaaS?
   - Can it be built in < 4 hours?
   - Will 50%+ of members use it?
   - Does it add complexity?

3. **Potential Features (Post-1000 Members)**
   - Basic email notifications
   - Annual pricing option
   - Build request voting
   - Success story showcases
   - Team accounts (maybe)

4. **Anti-Features (Never Build)**
   - Mobile app
   - AI recommendations
   - Social features
   - Gamification
   - API access

**Deliverables:**
- 30-day feature roadmap
- 60-day growth plan
- 90-day optimization list
- Feature rejection list with reasons

---

## Implementation Timeline

### Week 1: Build & Launch
- Days 1-2: Foundation + Auth
- Days 3-4: Core Features
- Day 5: Polish + Deploy
- Days 6-7: First builds + marketing

### Week 2-4: Growth Phase
- Daily builds at 7 AM
- Member onboarding optimization
- Community engagement
- Performance monitoring

### Month 2: Scale & Optimize
- Analyze usage patterns
- Implement top requests
- Optimize conversion
- Plan sustainable growth

---

## Risk Mitigation

1. **Technical Simplicity**
   - No complex features
   - Server-side rendering
   - Minimal JavaScript
   - Static where possible

2. **Payment Security**
   - Stripe handles all payments
   - No credit card storage
   - Webhook signature validation
   - Simple subscription model

3. **Community Management**
   - No private messaging
   - Simple moderation tools
   - Clear community guidelines
   - Member reporting system

4. **Platform Stability**
   - Vercel auto-scaling
   - Supabase managed database
   - CDN for static assets
   - Error monitoring setup

---

## Success Criteria

### Launch Day
- [ ] Platform accepts payments
- [ ] First build uploaded
- [ ] Members can access content
- [ ] No critical bugs

### Day 30
- [ ] 1000 paying members
- [ ] $97K MRR achieved
- [ ] 30 builds delivered
- [ ] 50% member engagement

### Day 90
- [ ] Sustainable growth
- [ ] Member retention > 80%
- [ ] 10K+ implementations
- [ ] Profitable operation

---

## Final Notes

Remember: We're building a tool that proves its own point. Every decision should be filtered through "Does this help someone cancel a SaaS subscription today?"

The platform IS the manifesto. Ship broken. Fix live. Build daily.