# Product Requirements Document (PRD)
## Build What You Need - Club Platform

### Document Information
- **Version**: 1.0
- **Date**: January 2025
- **Author**: Build What You Need Team
- **Status**: MVP Development

---

## 1. Executive Summary

### Product Vision
A minimalist community platform for entrepreneurs who are tired of paying for overpriced SaaS and want to build their own tools using AI. The platform itself is the first demonstration of this philosophy - built in 4 hours to replace $419/month community software.

### Core Philosophy
"Build What You Need" - Not what you might need. Not what looks cool. Only what solves today's problem.

### Business Model
- $97/month subscription
- First 1000 members locked at founding price
- Target: 1000 members in 30 days = $97,000 MRR

---

## 2. Problem Statement

### The SaaS Scam
Entrepreneurs are bleeding an average of $190,000/year on SaaS subscriptions for features they don't use, paying for complexity they don't need, and funding venture capitalists instead of building their businesses.

### Current Solutions Fail Because
- **Circle**: $419/month for community features filled with bloat
- **Skool**: Gamification and engagement tricks over substance  
- **Discord**: Built for gamers, not builders
- **Slack**: Communication maze, not focused building

### Our Solution
A platform so simple it can be built in 4 hours, proving that 90% of SaaS features are unnecessary complexity designed to justify high prices.

---

## 3. User Personas

### Primary Persona: The Bleeding Entrepreneur
- **Demographics**: 25-45, technical or technical-curious
- **Pain Points**: 
  - Paying $10K-200K/year in SaaS
  - Frustrated by feature bloat
  - Wants control over their tools
- **Motivation**: "I'd rather spend 2 hours building than pay $299/month forever"
- **Technical Level**: Can follow instructions, willing to learn

### Secondary Persona: The Skeptical Builder
- **Demographics**: Experienced developers tired of complexity
- **Pain Points**:
  - Knows they could build it but never start
  - Analysis paralysis on tool choices
- **Motivation**: "Finally, someone showing it's actually simple"

---

## 4. Product Goals & Success Metrics

### Primary Goals
1. Prove SaaS is overpriced by building the platform in 4 hours
2. Enable 1000 entrepreneurs to cancel at least one SaaS subscription
3. Create sustainable $97K MRR business in 30 days

### Success Metrics

#### Business Metrics
- **Day 1**: Platform live and accepting payments
- **Day 30**: 1000 members @ $97 = $97K MRR
- **Day 60**: 50% of members have built at least one tool
- **Day 90**: Average member has cancelled 3 SaaS subscriptions

#### Engagement Metrics
- **Build Rate**: 30% of members build first tool in week 1
- **Download Rate**: Each build downloaded by 20% of members
- **Implementation Rate**: 10% of members share "I built this"
- **Evangelist Rate**: 20% of members refer another member

#### Platform Health
- **Daily Active**: 40% of members visit daily
- **Weekly Active**: 80% of members visit weekly
- **Source Code Downloads**: 1000+ downloads/week
- **Thread Creation**: 50+ new threads/week

---

## 5. Core Features (MVP)

### 5.1 Authentication & Membership
**Purpose**: Simple gate between free and paid members

**Requirements**:
- Email/password only (no OAuth complexity)
- Stripe integration for payment
- Two states: Active member or not
- No complex roles or permissions

**Anti-Requirements**:
- No onboarding flow
- No email verification
- No 2FA
- No social login

### 5.2 Daily Builds Vault
**Purpose**: Deliver the core value - working code that replaces SaaS

**Requirements**:
- Upload interface for admin (drag & drop)
- List of all builds with SaaS name and cost
- Download counter
- Search by SaaS name only
- "I built this" button for social proof

**Anti-Requirements**:
- No versioning
- No code preview
- No online editor
- No git integration

### 5.3 Community Threads
**Purpose**: Focused discussion on building, not socializing

**Categories** (Hardcoded):
1. **Daily Builds** - Discussion on today's build
2. **Show Your Build** - Member implementations
3. **Target List** - SaaS to destroy next
4. **Help/Debug** - Technical support

**Requirements**:
- Markdown only (no rich text)
- Sort by recent activity only
- Basic comments
- No nested threads

**Anti-Requirements**:
- No private messages
- No @mentions
- No notifications
- No likes/reactions

### 5.4 Live Building Sessions
**Purpose**: Show the building process transparently

**Requirements**:
- Embedded stream (YouTube/Twitch)
- Schedule display (hardcoded)
- Chat via thread system
- Recording links

**Anti-Requirements**:
- No native streaming
- No screen share
- No breakout rooms
- No calendar integration

### 5.5 Classroom (LMS)
**Purpose**: Structured learning for common patterns

**Requirements**:
- Wistia video embeds
- Simple ordering
- Progress tracking (localStorage only)
- Direct navigation

**Anti-Requirements**:
- No quizzes
- No certificates
- No assignments
- No cohorts

---

## 6. Technical Architecture

### Tech Stack Decisions
| Component | Choice | Why |
|-----------|---------|-----|
| Frontend | Next.js 14 | Fast, simple, proven |
| Database | Supabase | Auth + DB + Storage in one |
| Payments | Stripe Links | No custom checkout to build |
| Email | Resend | Simple API, just works |
| Video | Wistia | Better than YouTube for courses |
| Hosting | Vercel | Zero config deployment |

### Data Model (Simplified)
```
profiles (extends Supabase auth.users)
  - is_active (payment status)
  - is_founding_member
  - stripe_customer_id

builds (the daily weapons)
  - title, saas_name, monthly_cost
  - file_url, download_count

threads (focused discussion)
  - category (enum: 4 types only)
  - title, content, last_activity

comments (simple responses)
  - thread_id, content

implementations (social proof)
  - user built which tool
```

### Security & Performance
- Row Level Security (RLS) on all tables
- Signed URLs for file downloads
- No client-side secrets
- Optimistic UI updates (no loading states)
- Static where possible

---

## 7. User Journey

### New Member Flow
1. **Land** → See the manifesto and today's build
2. **Convince** → "$499/month SaaS built in 4 hours"
3. **Join** → Email/password signup
4. **Pay** → Redirect to Stripe ($97/month)
5. **Enter** → Access the club immediately
6. **Download** → Get today's build source code
7. **Build** → Implement their first tool
8. **Share** → "I cancelled [SaaS name]"

### Daily Member Experience
```
7 AM: Notification - "Today's SaaS victim: [Name]"
↓
Check new build (2 min)
↓
Download source (5 sec)
↓
Implement if needed (2 hours)
↓
Share success (optional)
```

### Builder's Journey (Admin)
```
7 AM - 11 AM: BUILD
- Identify SaaS victim
- Build replacement
- Test it works

12 PM - 3 PM: SHARE
- Record building process
- Create video
- Post to YouTube

4 PM - 7 PM: DELIVER  
- Upload to club
- Post in Daily Builds thread
- Answer questions
- Show implementations
```

---

## 8. Design Principles

### Visual Design
- **Brutalist**: Function over form
- **Monospace**: Code is the hero
- **High Contrast**: Black/White + 1 accent
- **Dense**: Information over whitespace
- **Static**: No animations or transitions

### UX Principles
1. **3-Click Rule**: Any action in 3 clicks max
2. **No Modals**: Everything inline
3. **No Confirmations**: Decisive actions only
4. **No Empty States**: Always show something
5. **No Loading**: Optimistic updates

### Content Principles
- **Direct**: No marketing speak
- **Honest**: Show the struggle
- **Practical**: Working code only
- **Minimal**: Just enough documentation

---

## 9. The Anti-Features (What We Don't Build)

### Social Features We Reject
- ❌ User profiles beyond name
- ❌ Direct messaging
- ❌ Friend/Follow systems
- ❌ Activity feeds
- ❌ Notifications
- ❌ Likes/Hearts/Reactions
- ❌ Share to social buttons

### Complexity We Avoid
- ❌ Mobile app
- ❌ API for third-parties
- ❌ Webhooks for users
- ❌ Integrations
- ❌ Zapier/Make connectors
- ❌ Browser extensions
- ❌ Desktop app

### "Features" We Don't Need
- ❌ AI chatbot helper
- ❌ Recommendation engine
- ❌ Search beyond SaaS names
- ❌ Advanced filtering
- ❌ Data export
- ❌ Multi-language
- ❌ Dark mode toggle

---

## 10. Launch Strategy

### Day 0: Build in Public
- Stream the 4-hour build
- Document every decision
- Share the struggle
- Upload source code

### Day 1-7: Shock & Awe
- Daily build at 7 AM sharp
- Same format video every day
- Price anchoring: "They charge $X, I built it in 4 hours"
- Social proof: Download counters

### Day 8-30: Momentum
- Member implementations showcase
- Running "SaaS Graveyard" counter
- Total money saved ticker
- Founding member urgency

---

## 11. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|---------|------------|
| Platform breaks | High | Ship broken, fix live |
| Low conversion | Medium | Price is 1/4 of alternatives |
| Copycat platforms | Low | We're destroying the model |
| Technical complexity | Medium | Keep it stupid simple |
| Member churn | Medium | Daily value delivery |

---

## 12. Future Considerations (NOT MVP)

Things we might build after 1000 members:
- Basic search improvements
- Email notifications (opt-in only)
- Annual pricing option
- Team accounts (maybe)
- API access (probably not)

Things we'll NEVER build:
- AI recommendations
- Social features
- Mobile app
- Gamification
- Certification program

---

## 13. Definition of Done

### MVP Launch Criteria
- [ ] User can sign up and pay
- [ ] User can access daily builds
- [ ] User can download source code
- [ ] User can create threads
- [ ] Admin can upload builds
- [ ] Platform handles 1000 concurrent users
- [ ] Stripe webhooks working
- [ ] Deployed to production

### Success Criteria (Day 30)
- [ ] 1000 paying members
- [ ] 30 SaaS tools destroyed
- [ ] 10,000+ downloads
- [ ] 500+ implementations
- [ ] $97,000 MRR

---

## Appendix A: Technical Specifications

### API Endpoints
None. This is a server-rendered app. No API needed.

### Database Schema
See Section 6. Keep it flat. Keep it simple.

### File Storage
Supabase Storage. 50MB limit per build. Private bucket.

### Performance Requirements
- Page load: < 3 seconds
- Download start: < 1 second  
- Search results: < 500ms
- Zero client-side loading states

---

## Appendix B: Copy Guidelines

### Tone of Voice
- Angry at SaaS
- Excited about building
- Direct and honest
- Zero corporate speak

### Example Copy
❌ "Empowering entrepreneurs through innovative solutions"
✅ "Build what you need. Cancel the rest."

❌ "Our state-of-the-art platform"
✅ "Built in 4 hours. Works better than their $499 trash."

---

## Final Note

This platform is the manifesto. Every decision should answer: "Does this help someone cancel a SaaS subscription today?"

If not, we don't build it.

**Ship broken. Fix live. Build daily.**