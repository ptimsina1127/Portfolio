import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section-container">
      <div class="text-center mb-12">
        <h2 class="section-title">Projects</h2>
        <div class="w-20 h-1 bg-primary-500 rounded-full mx-auto"></div>
        <p class="section-subtitle mt-4">Things I've built</p>
      </div>

      <div class="flex flex-col sm:flex-row items-center gap-4 mb-8">
        <div class="relative flex-1 w-full sm:max-w-md">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="filterProjects()"
            placeholder="Search projects..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
          />
        </div>

        <div class="flex flex-wrap gap-2">
          <button
            (click)="selectedLanguage = ''; filterProjects()"
            class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
            [class.bg-primary-600]="selectedLanguage === ''"
            [class.text-white]="selectedLanguage === ''"
            [class.bg-gray-800]="selectedLanguage !== ''"
            [class.text-gray-400]="selectedLanguage !== ''"
            [class.hover:bg-gray-700]="selectedLanguage !== ''"
          >
            All
          </button>
          @for (lang of languages; track lang) {
            <button
              (click)="selectedLanguage = lang; filterProjects()"
              class="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
              [class.bg-primary-600]="selectedLanguage === lang"
              [class.text-white]="selectedLanguage === lang"
              [class.bg-gray-800]="selectedLanguage !== lang"
              [class.text-gray-400]="selectedLanguage !== lang"
              [class.hover:bg-gray-700]="selectedLanguage !== lang"
            >
              {{ lang }}
            </button>
          }
        </div>
      </div>

      @if (filteredProjects.length > 0) {
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (project of filteredProjects; track project.id) {
            <div class="card animate-fade-in flex flex-col">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-white line-clamp-1">{{ project.name }}</h3>
                <div class="flex items-center gap-3 text-sm text-gray-500 flex-shrink-0 ml-2">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>
                    {{ project.stars }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    {{ project.forks }}
                  </span>
                </div>
              </div>

              <p class="text-sm text-gray-400 mb-4 line-clamp-2 flex-1">
                {{ project.description || 'No description available' }}
              </p>

              @if (project.topics) {
                <div class="flex flex-wrap gap-1.5 mb-4">
                  @for (topic of project.topics.split(','); track topic) {
                    <span class="px-2 py-0.5 text-xs bg-primary-500/10 text-primary-400 rounded-full">{{ topic.trim() }}</span>
                  }
                </div>
              }

              <div class="flex items-center justify-between pt-4 border-t border-gray-800">
                @if (project.language) {
                  <span class="flex items-center gap-2 text-sm text-gray-400">
                    <span class="w-3 h-3 rounded-full" [style.background]="getLanguageColor(project.language)"></span>
                    {{ project.language }}
                  </span>
                } @else {
                  <span></span>
                }
                <a [href]="project.htmlUrl" target="_blank" class="text-sm text-primary-400 hover:text-primary-300 transition-colors flex items-center gap-1">
                  View on GitHub
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              </div>
            </div>
          }
        </div>
      } @else {
        <div class="text-center py-16">
          <p class="text-gray-500 text-lg">No projects found</p>
          <p class="text-gray-600 text-sm mt-2">Try adjusting your search or filter</p>
        </div>
      }
    </div>
  `,
})
export class ProjectsComponent implements OnInit {
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

  getLanguageColor(language: string): string {
    const colors: Record<string, string> = {
      TypeScript: '#3178c6',
      JavaScript: '#f1e05a',
      Java: '#b07219',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Kotlin: '#A97BFF',
      Go: '#00ADD8',
      Rust: '#dea584',
      'C#': '#178600',
      Ruby: '#701516',
      PHP: '#4F5D95',
      Swift: '#ffac45',
      Dart: '#00B4AB',
    };
    return colors[language] || '#6b7280';
  }
}
