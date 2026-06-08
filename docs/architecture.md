# Architecture Documentation

## System Overview

The portfolio is a **single-page application (SPA)** powered by a **RESTful backend** with **MySQL persistence** and **GitHub API integration**. The entire stack is containerized with Docker for local development and deployed on an Oracle Cloud VM for production.

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐     ┌────────────┐
│   Browser    │────>│   Nginx      │────>│  Spring Boot │────>│   MySQL    │
│  (Angular)   │     │ (reverse     │     │  (REST API)  │────>│  (DB)      │
│   :4200/80   │<────│  proxy)      │<────│   :8080      │     │  :3306     │
└──────────────┘     │   :80/443    │     └──────┬───────┘     └────────────┘
                     └──────────────┘            │
                                                  │  HTTP
                                                  v
                                          ┌──────────────┐
                                          │  GitHub API   │
                                          │  (external)   │
                                          └──────────────┘
```

## Frontend Architecture (Angular 18)

### Component Tree

```
AppComponent (root layout)
├── NavbarComponent      — Fixed top nav, scroll-aware active section
├── HeroComponent        — Profile card (avatar, name, bio, social links)
├── AboutComponent       — About me text + resume download
├── SkillsComponent      — Category-based tech stack cards
├── ExperienceComponent  — Alternating timeline (work/education)
├── ProjectsComponent    — GitHub repo grid with search + language filter
└── ContactComponent     — Contact form (name, email, subject, message)
```

### Data Flow

```
┌──────────────┐     PortfolioService     ┌──────────────┐
│  Components  │◄───────── RxJS ─────────►│  HTTP Client  │
│  (read-only) │                          │  (GET/POST)   │
└──────────────┘                          └──────┬───────┘
                                                 │
                                           ┌─────▼──────┐
                                           │  /api/*     │
                                           │  Backend    │
                                           └────────────┘
```

### Static Data (No Backend Required)
- **Skills** (`skill.data.ts`) — Hardcoded skill categories with names and emoji icons
- **Experience** (`experience.data.ts`) — Hardcoded work history and education entries

### Dynamic Data (Fetched from API)
- **Hero/Profile** (`GET /api/profile`) — GitHub profile info
- **Projects** (`GET /api/projects`) — GitHub repositories
- **Languages** (`GET /api/projects/languages`) — Distinct languages for filter
- **Contact** (`POST /api/contact`) — Submit contact form

## Backend Architecture (Spring Boot 3.2)

### Layer Structure

```
Controller Layer           Service Layer           Repository Layer
┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│ ProfileController│────►│ GithubSyncSvc  │◄──────│ GithubProfile  │
│ ProjectController│────►│ ProjectService │◄──────│ ProjectRepo    │
│ ContactController│────►│ ContactService │◄──────│ ContactMsgRepo │
│ SyncController   │────►│ GithubSyncSvc  │       └────────────────┘
└────────────────┘       └───┬────────────┘
                              │
                              │ HTTP (RestTemplate)
                              v
                       ┌──────────────┐
                       │  GitHub API   │
                       │  api.github.  │
                       │  com/users/   │
                       └──────────────┘
```

### Request Flow Example: Loading Projects

1. User visits portfolio → `ProjectsComponent.ngOnInit()` fires
2. `PortfolioService.getProjects()` → `GET /api/projects`
3. Nginx proxies `/api/` → `http://backend:8080`
4. `ProjectController.getAllProjects()` → `ProjectService.getAllProjects()` → `ProjectRepository.findAllByOrderByStarsDesc()`
5. MySQL returns rows → JPA deserializes → JSON response
6. Angular displays grid with star/fork counts and language badges

### GitHub Sync Flow

```
Scheduler (cron)
     │
     ▼
GithubSyncService.syncAll()
     │
     ├── syncProfile()
     │     GET https://api.github.com/users/ptimsina1127
     │     → Upsert GithubProfile entity
     │
     └── syncProjects()
           GET https://api.github.com/users/ptimsina1127/repos
           → Filter out forks
           → Upsert Project entities (matched by githubId)
```

## Database Design

### Entity Relationships

```
┌───────────────────┐
│   GithubProfile   │  (standalone, single row)
├───────────────────┤
│ id (PK)           │
│ login             │
│ avatar_url        │
│ name              │
│ bio               │
│ public_repos      │
│ github_url        │
│ updated_at        │
└───────────────────┘

┌───────────────────┐
│     Project       │  (standalone)
├───────────────────┤
│ id (PK)           │
│ github_id (UQ)    │
│ name              │
│ description       │
│ html_url          │
│ homepage          │
│ language          │
│ stars             │
│ forks             │
│ topics            │
│ last_pushed       │
│ created_at        │
│ updated_at        │
└───────────────────┘

┌───────────────────┐
│  ContactMessage  │  (standalone)
├───────────────────┤
│ id (PK)           │
│ name              │
│ email             │
│ subject           │
│ message           │
│ created_at        │
└───────────────────┘
```

### JPA Configuration

- `spring.jpa.hibernate.ddl-auto=update` — Schema auto-generation
- Entities use `@PrePersist` / `@PreUpdate` for timestamps
- `Project.githubId` has a unique constraint for upsert logic during sync

## Deployment Architecture

### Docker Compose (Local)

```
docker-compose.yml
├── mysql:8.0
│   Port: 3306 → 3306
│   Volume: mysql_data
│   Healthcheck: mysqladmin ping
│
├── backend (build: ./backend)
│   Port: 8080 → 8080
│   Depends: mysql (healthy)
│   Env: DB URL via docker network (mysql:3306)
│
└── frontend (build: ./frontend)
    Port: 80 → 80
    Nginx serves built Angular files
    Proxies /api → http://backend:8080
```

### Production (Oracle Cloud VM)

```
┌─────────────────────────────────────┐
│         Oracle Cloud VM             │
│                                     │
│  Nginx (system, not Docker)         │
│  ├── port 80 (HTTP)                 │
│  ├── port 443 (HTTPS, self-signed)  │
│  ├── server_name: pravatk.com.np    │
│  ├── root: /home/ubuntu/...browser  │
│  └── /api/ → proxy_pass :8080       │
│                                     │
│  systemd: portfolio-backend.service │
│  ├── java -jar app.jar              │
│  ├── Env vars for DB (localhost:3307)│
│  └── Restart: on-failure            │
│                                     │
│  Docker: portfolio-mysql            │
│  ├── Port: 3307 (host) → 3306       │
│  └── DB: portfolio_db               │
│                                     │
│  Cloudflare (DNS proxy)             │
│  └── pravatk.com.np → VM IP         │
└─────────────────────────────────────┘
```

## Nginx Configuration Summary

| Environment | File | Key Proxy |
|-------------|------|-----------|
| Docker (local) | `frontend/nginx.conf` | `/api/` → `http://backend:8080` |
| Production (deploy) | `deploy/nginx.conf` | `/api/` → `http://127.0.0.1:8080` |

## Security Notes

- CORS is configured for specific origins (localhost + actual domains)
- Backend has no authentication — contact form is open, sync endpoint is unprotected
- MySQL root is restricted to localhost in production; application uses a limited-privilege user
- HTTPS terminates at Cloudflare (proxied) or via self-signed cert on the VM
- No secrets are committed to the repository (DB passwords, API keys are env vars or in `.gitignore`d files)
