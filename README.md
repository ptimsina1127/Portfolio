# Portfolio — Pravat Timsina

Full-stack portfolio website built with **Angular 18** (frontend) and **Spring Boot 3** (backend), featuring GitHub profile/project sync, a contact form, and Docker-based deployment.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 18, TypeScript, Tailwind CSS |
| Backend | Spring Boot 3.2, Java 17, JPA/Hibernate |
| Database | MySQL 8.0 |
| Build | Maven (backend), Angular CLI (frontend) |
| Containerization | Docker & Docker Compose |
| Deployment | Oracle Cloud VM (Ubuntu 24.04), systemd, Nginx |
| External APIs | GitHub REST API (profile + repos sync) |

## Features

- **GitHub Profile Sync** — Automatically fetches and displays your GitHub profile info and public repositories (excludes forks)
- **Project Showcase** — Browse GitHub repos with star/fork counts, language badges, and topic tags; filter by language or search by name/description
- **Experience Timeline** — Work and education history displayed as an alternating vertical timeline
- **Skills Section** — Categorized tech stack (languages, frameworks, tools, databases)
- **Contact Form** — Visitors can send messages directly from the site (stored in database)
- **Responsive Design** — Dark-themed UI with mobile hamburger menu, smooth scrolling, scroll-aware navbar
- **Dockerized** — Full stack runs via `docker-compose up` with health-checked MySQL, auto-schema creation

## Project Structure

```
pravat-portfolio/
├── frontend/                    # Angular 18 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/      # UI components
│   │   │   │   ├── navbar/      # Fixed top nav with scroll awareness
│   │   │   │   ├── hero/        # Profile avatar, bio, social links
│   │   │   │   ├── about/       # About me + resume download
│   │   │   │   ├── skills/      # Tech stack cards
│   │   │   │   ├── experience/  # Timeline (work + education)
│   │   │   │   ├── projects/    # GitHub repo grid with filters
│   │   │   │   └── contact/     # Contact form
│   │   │   ├── models/          # TypeScript interfaces + static data
│   │   │   ├── services/        # PortfolioService (HTTP API calls)
│   │   │   ├── pages/           # Route pages (home)
│   │   │   ├── environments/    # API URL config
│   │   │   ├── app.component.ts # Root component (layout shell)
│   │   │   ├── app.config.ts    # App providers (router, http)
│   │   │   └── app.routes.ts    # Route definitions
│   │   ├── styles.css           # Tailwind directives + custom classes
│   │   └── index.html           # Entry HTML
│   ├── Dockerfile               # Multi-stage: build (node) + serve (nginx)
│   ├── nginx.conf               # Docker Nginx config (proxies /api to backend)
│   └── package.json
├── backend/                     # Spring Boot REST API
│   ├── src/main/java/com/portfolio/
│   │   ├── PortfolioApplication.java    # Entry point + @EnableScheduling
│   │   ├── config/
│   │   │   ├── CorsConfig.java          # CORS for localhost + domains
│   │   │   └── RestTemplateConfig.java  # HTTP client bean
│   │   ├── controller/
│   │   │   ├── ProfileController.java   # GET /api/profile
│   │   │   ├── ProjectController.java   # GET /api/projects, /api/projects/languages
│   │   │   ├── ContactController.java   # POST /api/contact
│   │   │   └── SyncController.java      # POST /api/sync (manual trigger)
│   │   ├── model/
│   │   │   ├── GithubProfile.java       # JPA entity (github_profile table)
│   │   │   ├── Project.java             # JPA entity (projects table)
│   │   │   └── ContactMessage.java      # JPA entity (contact_messages table)
│   │   ├── repository/                  # Spring Data JPA repositories
│   │   ├── service/
│   │   │   ├── GithubSyncService.java   # Fetches profile + repos from GitHub API
│   │   │   ├── ProjectService.java      # Project CRUD operations
│   │   │   └── ContactService.java      # Save contact messages
│   │   └── scheduler/
│   │       └── GithubSyncScheduler.java # Cron + startup sync trigger
│   ├── src/main/resources/
│   │   └── application.properties       # DB, GitHub, JPA config
│   ├── Dockerfile                       # Multi-stage: build (maven) + run (temurin)
│   └── pom.xml
├── deploy/                      # Production deployment scripts
│   ├── deploy.sh                 # Build → upload → setup systemd + Nginx
│   ├── vm-setup.sh               # One-time VM: Java, MySQL, directory setup
│   ├── nginx.conf                # Nginx config template
│   └── portfolio-backend.service # systemd unit for backend
├── docker-compose.yml           # MySQL + Backend + Frontend containers
├── AGENTS.md                    # Session reference / ops notes
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | GitHub profile (avatar, name, bio, repo count) |
| GET | `/api/projects` | All GitHub repos sorted by stars (desc) |
| GET | `/api/projects/{id}` | Single project by database ID |
| GET | `/api/projects/languages` | Distinct programming languages used |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/sync` | Manually trigger GitHub sync |

## Database Schema

### `github_profile`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT (PK, auto) | |
| login | VARCHAR | GitHub username |
| avatar_url | VARCHAR | Profile picture URL |
| name | VARCHAR | Display name |
| bio | TEXT | Short bio |
| public_repos | INT | Public repo count |
| github_url | VARCHAR | GitHub profile URL |
| updated_at | DATETIME | Last sync timestamp |

### `projects`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT (PK, auto) | |
| github_id | BIGINT (unique) | GitHub repo ID |
| name | VARCHAR | Repo name |
| description | TEXT | Repo description |
| html_url | VARCHAR | GitHub repo URL |
| homepage | VARCHAR | Project homepage |
| language | VARCHAR | Primary language |
| stars | INT | Star count |
| forks | INT | Fork count |
| topics | TEXT | Comma-separated topics |
| last_pushed | DATETIME | Last push timestamp |
| created_at | DATETIME | Record creation |
| updated_at | DATETIME | Record update |

### `contact_messages`
| Column | Type | Notes |
|--------|------|-------|
| id | BIGINT (PK, auto) | |
| name | VARCHAR | Sender name |
| email | VARCHAR | Sender email |
| subject | VARCHAR | Message subject |
| message | TEXT | Message body |
| created_at | DATETIME | Submission time |

## Local Development

### Prerequisites
- Node.js 20+, npm
- Java 17+, Maven
- MySQL 8.0 (or Docker)

### 1. Database
```bash
# Using Docker (recommended)
docker run -d --name portfolio-mysql \
  -e MYSQL_ROOT_PASSWORD=CHANGE_ME_ROOT \
  -e MYSQL_DATABASE=portfolio_db \
  -e MYSQL_USER=portfolio \
  -e MYSQL_PASSWORD=CHANGE_ME \
  -p 3306:3306 mysql:8.0
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
# Starts on http://localhost:8080
```

### 3. Frontend
```bash
cd frontend
npm install
npm start
# Starts on http://localhost:4200 (proxies /api to 8080)
```

### 4. Full Stack with Docker
```bash
docker compose up -d
# Frontend: http://localhost:80
# Backend:  http://localhost:8080/api
```

## Deployment (Oracle Cloud VM)

### One-time setup
```bash
ssh -i ~/Downloads/ssh-key-2026-05-07.key ubuntu@<VM_IP>
# Run the setup script manually or:
./deploy/vm-setup.sh
```

### Deploy
```bash
./deploy/deploy.sh <VM_IP>
```
This script: builds frontend + backend → uploads JAR and static files → installs systemd service → configures Nginx.

### Manual commands on VM
```bash
# Check backend
sudo systemctl status portfolio-backend
sudo journalctl -u portfolio-backend -f

# Rebuild frontend
cd /home/ubuntu/portfolio/frontend && npm run build

# Rebuild backend
cd /home/ubuntu/portfolio/backend && mvn clean package -DskipTests

# Check MySQL
sudo docker exec portfolio-mysql mysql -uroot -p<password> -e "SHOW DATABASES;"

# Reload Nginx
sudo nginx -t && sudo systemctl reload nginx
```

## Configuration

### Environment Variables (Backend)
| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/portfolio_db?...` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | `CHANGE_ME` | DB password |
| `GITHUB_USERNAME` | `ptimsina1127` | GitHub username to sync |
| `GITHUB_SYNC_CRON` | `0 0 0 */3 * ?` | Sync schedule (cron) |
| `GITHUB_SYNC_ON_STARTUP` | `true` | Sync on app startup |

### CORS Allowed Origins
- `localhost:4200`, `localhost:80`, `localhost`
- `pravatk.com.np` (and `www.`)
- `myprojects.com.np` (and `www.`)

## GitHub Sync

The backend automatically syncs data from the GitHub API:
- **Profile**: avatar, name, bio, public repo count
- **Projects**: all non-forked repos with stars, forks, topics, language, description

Sync triggers:
1. On application startup (configurable via `GITHUB_SYNC_ON_STARTUP`)
2. Scheduled via cron (default: every 3 days at midnight)
3. Manually via `POST /api/sync`
