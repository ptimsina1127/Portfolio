# Portfolio — Pravat Timsina

Full-stack portfolio website at [pravatk.com.np](https://pravatk.com.np). Built with Angular 18 + Spring Boot 3, featuring GitHub profile/project sync, contact form, and Docker-based deployment.

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

## Quick Start

```bash
# 1. Database (Docker)
docker run -d --name portfolio-mysql -p 3306:3306 \
  -e MYSQL_ROOT_PASSWORD=CHANGE_ME \
  -e MYSQL_DATABASE=portfolio_db \
  -e MYSQL_USER=portfolio \
  -e MYSQL_PASSWORD=CHANGE_ME \
  mysql:8.0

# 2. Backend
cd backend
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Edit application.properties with your DB password
mvn spring-boot:run

# 3. Frontend (separate terminal)
cd frontend
npm install
npm start
```

Open http://localhost:4200. The Angular dev server proxies `/api` to the backend on port 8080.

## Full Stack with Docker

```bash
docker compose up -d
# Frontend: http://localhost:80
# Backend:  http://localhost:8080/api
```

Edit `docker-compose.yml` with your passwords first, or copy `.env.example` to `.env` and reference the variables.

## Configuration

Backend settings are configured via Spring Boot properties / environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `SPRING_DATASOURCE_URL` | `jdbc:mysql://localhost:3306/portfolio_db?...` | JDBC URL |
| `SPRING_DATASOURCE_USERNAME` | `root` | DB username |
| `SPRING_DATASOURCE_PASSWORD` | `CHANGE_ME` | DB password |
| `GITHUB_USERNAME` | `ptimsina1127` | GitHub username to sync |
| `GITHUB_SYNC_CRON` | `0 0 0 */3 * ?` | Sync schedule (cron) |
| `GITHUB_SYNC_ON_STARTUP` | `true` | Sync on app startup |

CORS is configured for: `localhost:4200`, `localhost:80`, `localhost`, `pravatk.com.np`.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | GitHub profile (avatar, name, bio, repo count) |
| GET | `/api/projects` | All GitHub repos sorted by stars |
| GET | `/api/projects/{id}` | Single project by database ID |
| GET | `/api/projects/languages` | Distinct programming languages |
| POST | `/api/contact` | Submit a contact message |
| POST | `/api/sync` | Manually trigger GitHub sync |

## Project Structure

```
pravat-portfolio/
├── frontend/                    # Angular 18 SPA
│   ├── src/app/
│   │   ├── components/          # UI components (navbar, hero, about, skills, etc.)
│   │   ├── models/              # TypeScript interfaces + static data
│   │   ├── services/            # HTTP API calls
│   │   ├── pages/               # Route pages
│   │   └── environments/        # API URL config
│   ├── Dockerfile               # Multi-stage: build (node) + serve (nginx)
│   └── nginx.conf               # Docker Nginx config
├── backend/                     # Spring Boot REST API
│   ├── src/main/java/com/portfolio/
│   │   ├── controller/          # REST controllers
│   │   ├── service/             # Business logic
│   │   ├── model/               # JPA entities
│   │   ├── repository/          # Spring Data JPA
│   │   ├── config/              # CORS, RestTemplate
│   │   └── scheduler/           # GitHub sync cron
│   ├── src/main/resources/
│   │   ├── application.properties.example  # Config template
│   │   └── application.properties          # Local config (gitignored)
│   └── Dockerfile
├── deploy/                      # VM deployment scripts & configs
├── docs/                        # Documentation
├── docker-compose.yml           # MySQL + Backend + Frontend
├── .env.example                 # Environment variable template
└── AGENTS.md                    # Session ops reference
```

## GitHub Sync

The backend automatically syncs data from the GitHub API:
- **Profile**: avatar, name, bio, public repo count
- **Projects**: all non-forked repos with stars, forks, topics, language

Sync triggers: on startup, every 3 days via cron, or manual `POST /api/sync`.

## Deployment

The portfolio runs on an Oracle Cloud VM (146.235.193.6) behind Cloudflare. See [docs/deployment.md](docs/deployment.md) for the full guide covering:

- VM provisioning (Oracle Cloud free tier)
- DNS setup (Cloudflare)
- Nginx configuration
- Backend systemd service
- Frontend build & deploy
- Docker MySQL
- Secrets management
- Maintenance commands
