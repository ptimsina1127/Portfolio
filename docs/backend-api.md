# Backend API Reference

## Controllers

### ProfileController

**Path:** `/api/profile`
**File:** `backend/src/main/java/com/portfolio/controller/ProfileController.java`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/profile` | Returns the first stored GitHub profile |

**Response `200 OK`:**
```json
{
  "id": 1,
  "login": "ptimsina1127",
  "avatarUrl": "https://avatars.githubusercontent.com/u/...",
  "name": "Pravat Timsina",
  "bio": "Software Developer...",
  "publicRepos": 12,
  "githubUrl": "https://github.com/ptimsina1127",
  "updatedAt": "2026-05-20T12:00:00"
}
```

**Response `404 Not Found`:** When no profile has been synced yet.

---

### ProjectController

**Path:** `/api/projects`
**File:** `backend/src/main/java/com/portfolio/controller/ProjectController.java`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | All projects ordered by stars (desc) |
| GET | `/api/projects/{id}` | Single project by database ID |
| GET | `/api/projects/languages` | Distinct programming languages |

**Response `GET /api/projects`:**
```json
[
  {
    "id": 1,
    "githubId": 123456789,
    "name": "my-project",
    "description": "A cool project",
    "htmlUrl": "https://github.com/ptimsina1127/my-project",
    "homepage": "https://my-project.example.com",
    "language": "TypeScript",
    "stars": 42,
    "forks": 10,
    "topics": "react,typescript,graphql",
    "lastPushed": "2026-04-15T10:30:00",
    "createdAt": "2026-01-01T00:00:00",
    "updatedAt": "2026-04-15T10:30:00"
  }
]
```

**Response `GET /api/projects/languages`:**
```json
["Java", "JavaScript", "Python", "TypeScript"]
```

---

### ContactController

**Path:** `/api/contact`
**File:** `backend/src/main/java/com/portfolio/controller/ContactController.java`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit a contact message |

**Request body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Collaboration",
  "message": "I'd like to work with you on..."
}
```

**Response `200 OK`:**
```json
{
  "message": "Message sent successfully"
}
```

---

### SyncController

**Path:** `/api/sync`
**File:** `backend/src/main/java/com/portfolio/controller/SyncController.java`

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sync` | Manually trigger GitHub sync |

**Response `200 OK`:**
```json
{
  "message": "Sync completed successfully"
}
```

## Services

### GithubSyncService

**File:** `backend/src/main/java/com/portfolio/service/GithubSyncService.java`

Handles synchronization with the GitHub REST API.

**Methods:**
- `syncAll()` — Calls both `syncProfile()` and `syncProjects()`
- `syncProfile()` — Fetches `GET https://api.github.com/users/{username}` and upserts `GithubProfile` entity
- `syncProjects()` — Fetches `GET https://api.github.com/users/{username}/repos?per_page=100&sort=pushed`, filters out forked repos (`fork=false`), and upserts `Project` entities matched by `githubId`

**Configuration properties:**
- `github.username` — GitHub username to sync
- `github.sync.on-startup` — Boolean, sync on app startup
- `github.sync.cron` — Cron expression for scheduled sync

### ProjectService

**File:** `backend/src/main/java/com/portfolio/service/ProjectService.java`

Simple CRUD service for projects.

**Methods:**
- `getAllProjects()` → `projectRepository.findAllByOrderByStarsDesc()`
- `getProjectById(Long id)` → `projectRepository.findById(id)`
- `getAllLanguages()` → `projectRepository.findDistinctLanguages()`

### ContactService

**File:** `backend/src/main/java/com/portfolio/service/ContactService.java`

**Methods:**
- `saveMessage(ContactMessage)` → `contactMessageRepository.save(message)`

## Scheduler

### GithubSyncScheduler

**File:** `backend/src/main/java/com/portfolio/scheduler/GithubSyncScheduler.java`

Triggers GitHub sync on two events:
1. **Application startup** (`@PostConstruct`) — if `github.sync.on-startup=true`
2. **Scheduled** (`@Scheduled(cron = ...)`) — default: every 3 days at midnight
