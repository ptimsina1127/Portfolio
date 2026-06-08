# Frontend Components Reference

## NavbarComponent

**File:** `frontend/src/app/components/navbar/navbar.component.ts`

A responsive fixed-top navigation bar with:
- **Scroll awareness**: Uses `@HostListener('window:scroll')` to toggle background opacity and detect active section via `offsetTop` comparison
- **Active link tracking**: Highlights the current section link in the primary color
- **Mobile menu**: Hamburger toggle with slide-down menu on small screens
- **Smooth scroll links**: Anchor-based navigation to `#hero`, `#about`, `#skills`, `#experience`, `#projects`, `#contact`

**State:** `isScrolled`, `mobileOpen`, `activeSection`

---

## HeroComponent

**File:** `frontend/src/app/components/hero/hero.component.ts`

Profile introduction section displaying:
- **Avatar** (circular, with primary border/shadow)
- **Name** (with primary color highlight)
- **Bio**
- **GitHub public repo count**
- **Social links**: GitHub, LinkedIn, Twitter (X)
- **Loading state**: Animated spinner while profile data loads
- **Fallback**: Hardcoded default profile if API fails

**Data source:** `GET /api/profile` via `PortfolioService.getProfile()`

---

## AboutComponent

**File:** `frontend/src/app/components/about/about.component.ts`

Static "About Me" section with:
- Personal introduction text (hardcoded in template)
- **Resume download** button linking to `assets/Handshake_Pravat_Resume.pdf`

No services or dynamic data needed.

---

## SkillsComponent

**File:** `frontend/src/app/components/skills/skills.component.ts`

Displays tech stack in a responsive 4-column grid of **category cards**:
- **Languages**: Java, TypeScript, JavaScript, Python, SQL
- **Frameworks**: Spring Boot, Angular, React, Hibernate, Tailwind CSS
- **Tools**: Git, Docker, Postman, Maven, VS Code
- **Databases**: MySQL, PostgreSQL, MongoDB

**Data source:** Static data from `models/skill.data.ts` (no API call)

---

## ExperienceComponent

**File:** `frontend/src/app/components/experience/experience.component.ts`

An alternating vertical timeline with:
- **Center line** and circular indicators
- **Work entries** (primary-500 accent) and **education entries** (emerald-500 accent)
- **Alternating layout**: Even indices on left, odd on right (desktop)
- Each entry shows: type badge, date range, title, organization, location, bullet description

**Data source:** Static data from `models/experience.data.ts`

---

## ProjectsComponent

**File:** `frontend/src/app/components/projects/projects.component.ts`

GitHub repository showcase with:
- **Search input**: Filters projects by name or description (client-side)
- **Language filter buttons**: Dynamically populated from `GET /api/projects/languages`
- **Project cards**: Name, description, star/fork counts, topic tags, language badge (color-coded), "View on GitHub" link
- **Empty state**: "No projects found" message when filters yield no results
- **Language colors**: Map of language → hex color for the dot indicator

**Data source:** `GET /api/projects` and `GET /api/projects/languages`

---

## ContactComponent

**File:** `frontend/src/app/components/contact/contact.component.ts`

Contact form with:
- **Fields**: Name (required), Email (required), Subject, Message (required)
- **Client-side validation**: Checks required fields before submit
- **Loading state**: Spinner on submit button while request in flight
- **Success state**: Confirmation card with "Send Another" button
- **Two-way binding**: `ngModel` on all form fields

**Data source:** `POST /api/contact` via `PortfolioService.sendContactMessage()`
