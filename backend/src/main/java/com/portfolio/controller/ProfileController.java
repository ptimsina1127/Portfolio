package com.portfolio.controller;

import com.portfolio.model.GithubProfile;
import com.portfolio.repository.GithubProfileRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final GithubProfileRepository profileRepository;

    public ProfileController(GithubProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @GetMapping
    public ResponseEntity<GithubProfile> getProfile() {
        List<GithubProfile> profiles = profileRepository.findAll();
        if (profiles.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(profiles.get(0));
    }
}
