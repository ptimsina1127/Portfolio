package com.portfolio.repository;

import com.portfolio.model.GithubProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GithubProfileRepository extends JpaRepository<GithubProfile, Long> {
}
