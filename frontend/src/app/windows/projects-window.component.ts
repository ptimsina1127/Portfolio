import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { Project } from '../models/project.model';

@Component({
  selector: 'win-projects',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 8px;">
  <h1>Projects</h1>
  <div style="border-bottom: 2px solid #3973d6; width: 60px; margin-bottom: 12px;"></div>

  <div class="xp-projects-search">
    <input
      class="xp-input"
      placeholder="Search projects..."
      #searchInput
      (input)="searchQuery = searchInput.value; filterProjects()"
    />
    <button class="xp-projects-lang-btn" [class.active]="!selectedLanguage" (click)="selectedLanguage = ''; filterProjects()">All</button>
    @for (lang of languages; track lang) {
      <button class="xp-projects-lang-btn" [class.active]="selectedLanguage === lang" (click)="selectedLanguage = lang; filterProjects()">
        {{ lang }}
      </button>
    }
  </div>

  @if (filteredProjects.length > 0) {
    <div class="xp-projects-list">
      @for (project of filteredProjects; track project.id) {
        <div class="xp-project-card">
          <div class="xp-project-name">
            <a [href]="project.htmlUrl" target="_blank" style="color: #0066cc; text-decoration: underline;">
              {{ project.name }}
            </a>
          </div>
          <div class="xp-project-desc">{{ project.description || 'No description available' }}</div>
          @if (project.topics) {
            <div class="xp-project-topics">
              @for (topic of project.topics.split(','); track topic) {
                <span class="xp-project-topic">{{ topic.trim() }}</span>
              }
            </div>
          }
          <div class="xp-project-meta">
            @if (project.language) {
              <span>🔵 {{ project.language }}</span>
            }
            <span>⭐ {{ project.stars }}</span>
            <span>⑂ {{ project.forks }}</span>
          </div>
        </div>
      }
    </div>
  } @else {
    <div style="text-align: center; padding: 30px 0; color: #888;">
      <p>No projects found</p>
    </div>
  }
</div>
  `,
})
export class ProjectsWindowComponent implements OnInit {
  allProjects: Project[] = [];
  filteredProjects: Project[] = [];
  languages: string[] = [];
  selectedLanguage = '';
  searchQuery = '';

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit() {
    this.portfolioService.getProjects().subscribe((projects) => {
      this.allProjects = projects;
      this.filterProjects();
    });
    this.portfolioService.getLanguages().subscribe((langs) => {
      this.languages = langs;
    });
  }

  filterProjects() {
    let filtered = this.allProjects;
    if (this.selectedLanguage) {
      filtered = filtered.filter((p) => p.language === this.selectedLanguage);
    }
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }
    this.filteredProjects = filtered;
  }
}
