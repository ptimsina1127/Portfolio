package com.portfolio.service;

import com.portfolio.model.GithubProfile;
import com.portfolio.model.Project;
import com.portfolio.repository.GithubProfileRepository;
import com.portfolio.repository.ProjectRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class GithubSyncService {

    private static final Logger log = LoggerFactory.getLogger(GithubSyncService.class);
    private static final String GITHUB_API_REPOS = "https://api.github.com/users/%s/repos?per_page=100&sort=pushed";
    private static final String GITHUB_API_USER = "https://api.github.com/users/%s";

    private final RestTemplate restTemplate;
    private final ProjectRepository projectRepository;
    private final GithubProfileRepository profileRepository;

    @Value("${github.username}")
    private String githubUsername;

    public GithubSyncService(RestTemplate restTemplate, ProjectRepository projectRepository,
                             GithubProfileRepository profileRepository) {
        this.restTemplate = restTemplate;
        this.projectRepository = projectRepository;
        this.profileRepository = profileRepository;
    }

    public void syncProjects() {
        log.info("Starting GitHub sync for user: {}", githubUsername);
        try {
            String url = String.format(GITHUB_API_REPOS, githubUsername);
            List<Map<String, Object>> repos = restTemplate.getForObject(url, List.class);

            if (repos == null) {
                log.warn("No repos returned from GitHub API");
                return;
            }

            for (Map<String, Object> repo : repos) {
                boolean isFork = Boolean.TRUE.equals(repo.get("fork"));
                if (isFork) {
                    log.debug("Skipping forked repo: {}", repo.get("name"));
                    continue;
                }

                Long githubId = ((Number) repo.get("id")).longValue();
                Optional<Project> existing = projectRepository.findByGithubId(githubId);

                Project project = existing.orElse(new Project());
                project.setGithubId(githubId);
                project.setName((String) repo.get("name"));
                project.setDescription((String) repo.get("description"));
                project.setHtmlUrl((String) repo.get("html_url"));
                project.setHomepage((String) repo.get("homepage"));
                project.setLanguage((String) repo.get("language"));

                Object starsObj = repo.get("stargazers_count");
                project.setStars(starsObj instanceof Number ? ((Number) starsObj).intValue() : 0);

                Object forksObj = repo.get("forks_count");
                project.setForks(forksObj instanceof Number ? ((Number) forksObj).intValue() : 0);

                Object topicsObj = repo.get("topics");
                if (topicsObj instanceof List) {
                    project.setTopics(String.join(",", (List<String>) topicsObj));
                }

                Object pushedObj = repo.get("pushed_at");
                if (pushedObj instanceof String) {
                    project.setLastPushed(LocalDateTime.parse((String) pushedObj, DateTimeFormatter.ISO_DATE_TIME));
                }

                projectRepository.save(project);
            }

            log.info("Synced {} repos successfully", repos.size());
        } catch (Exception e) {
            log.error("Failed to sync repos from GitHub", e);
        }
    }

    public void syncProfile() {
        log.info("Syncing GitHub profile for user: {}", githubUsername);
        try {
            String url = String.format(GITHUB_API_USER, githubUsername);
            Map<String, Object> profileData = restTemplate.getForObject(url, Map.class);

            if (profileData == null) return;

            List<GithubProfile> existing = profileRepository.findAll();
            GithubProfile profile = existing.isEmpty() ? new GithubProfile() : existing.get(0);

            profile.setLogin((String) profileData.get("login"));
            profile.setAvatarUrl((String) profileData.get("avatar_url"));
            profile.setName((String) profileData.get("name"));
            profile.setBio((String) profileData.get("bio"));

            Object reposObj = profileData.get("public_repos");
            profile.setPublicRepos(reposObj instanceof Number ? ((Number) reposObj).intValue() : 0);

            profile.setGithubUrl((String) profileData.get("html_url"));
            profileRepository.save(profile);

            log.info("Profile synced successfully");
        } catch (Exception e) {
            log.error("Failed to sync profile from GitHub", e);
        }
    }

    public void syncAll() {
        syncProfile();
        syncProjects();
    }
}
