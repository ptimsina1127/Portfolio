import { Component } from '@angular/core';
import { SKILLS } from '../../models/skill.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  template: `
    <div class="section-container">
      <div class="text-center mb-12">
        <h2 class="section-title">Skills &amp; Tech Stack</h2>
        <div class="w-20 h-1 bg-primary-500 rounded-full mx-auto"></div>
        <p class="section-subtitle mt-4">Technologies I work with</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        @for (category of SKILLS; track category.title) {
          <div class="card">
            <h3 class="text-lg font-semibold text-white mb-4">{{ category.title }}</h3>
            <div class="space-y-3">
              @for (skill of category.skills; track skill.name) {
                <div class="flex items-center gap-3 px-3 py-2 bg-gray-800/50 rounded-lg">
                  <span class="text-xl">{{ skill.icon }}</span>
                  <span class="text-sm text-gray-300">{{ skill.name }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class SkillsComponent {
  SKILLS = SKILLS;
}
