import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { EXPERIENCES } from '../../models/experience.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="section-container">
      <div class="text-center mb-12">
        <h2 class="section-title">Experience</h2>
        <div class="w-20 h-1 bg-primary-500 rounded-full mx-auto"></div>
        <p class="section-subtitle mt-4">My professional journey</p>
      </div>

      <div class="max-w-3xl mx-auto relative">
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-800 -translate-x-1/2"></div>

        @for (exp of EXPERIENCES; track exp.title; let i = $index) {
          <div class="relative mb-10 last:mb-0">
            <div
              class="flex flex-col md:flex-row items-start gap-6"
              [ngClass]="{ 'md:flex-row-reverse': i % 2 === 1 }"
            >
              <div class="hidden md:block md:w-1/2"></div>

              <div
                class="absolute left-4 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 mt-6 z-10"
                [ngClass]="{
                  'bg-primary-500': exp.type === 'work',
                  'bg-emerald-500': exp.type === 'education'
                }"
              ></div>

              <div class="ml-10 md:ml-0 md:w-1/2 card">
                <div class="flex items-center gap-2 mb-2">
                  <span
                    class="px-2 py-0.5 text-xs font-medium rounded"
                    [ngClass]="{
                      'bg-primary-500/20 text-primary-400': exp.type === 'work',
                      'bg-emerald-500/20 text-emerald-400': exp.type === 'education'
                    }"
                  >
                    {{ exp.type === 'work' ? 'Work' : 'Education' }}
                  </span>
                  <span class="text-sm text-gray-500">{{ exp.startDate }} - {{ exp.endDate }}</span>
                </div>
                <h3 class="text-lg font-semibold text-white">{{ exp.title }}</h3>
                <p class="text-primary-400 text-sm mb-3">{{ exp.organization }} &middot; {{ exp.location }}</p>
                <ul class="space-y-1">
                  @for (desc of exp.description; track desc) {
                    <li class="text-sm text-gray-400 flex items-start gap-2">
                      <span class="text-primary-400 mt-1">•</span>
                      {{ desc }}
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class ExperienceComponent {
  EXPERIENCES = EXPERIENCES;
}
