package com.portfolio.repository;

import com.portfolio.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findByGithubId(Long githubId);

    List<Project> findAllByOrderByStarsDesc();

    @Query("SELECT DISTINCT p.language FROM Project p WHERE p.language IS NOT NULL AND p.language <> '' ORDER BY p.language")
    List<String> findDistinctLanguages();
}
