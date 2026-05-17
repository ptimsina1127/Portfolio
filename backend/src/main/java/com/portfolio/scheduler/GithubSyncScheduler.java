package com.portfolio.scheduler;

import com.portfolio.service.GithubSyncService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class GithubSyncScheduler {

    private static final Logger log = LoggerFactory.getLogger(GithubSyncScheduler.class);

    private final GithubSyncService githubSyncService;

    @Value("${github.sync.on-startup}")
    private boolean syncOnStartup;

    public GithubSyncScheduler(GithubSyncService githubSyncService) {
        this.githubSyncService = githubSyncService;
    }

    @PostConstruct
    public void onStartup() {
        if (syncOnStartup) {
            log.info("Running initial GitHub sync on startup");
            githubSyncService.syncAll();
        }
    }

    @Scheduled(cron = "${github.sync.cron}")
    public void scheduledSync() {
        log.info("Running scheduled GitHub sync");
        githubSyncService.syncAll();
    }
}
