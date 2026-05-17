package com.portfolio.controller;

import com.portfolio.service.GithubSyncService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/sync")
public class SyncController {

    private final GithubSyncService githubSyncService;

    public SyncController(GithubSyncService githubSyncService) {
        this.githubSyncService = githubSyncService;
    }

    @PostMapping
    public ResponseEntity<Map<String, String>> triggerSync() {
        githubSyncService.syncAll();
        return ResponseEntity.ok(Map.of("message", "Sync completed successfully"));
    }
}
