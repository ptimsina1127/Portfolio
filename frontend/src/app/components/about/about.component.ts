import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="section-container">
      <div class="max-w-3xl">
        <h2 class="section-title">About Me</h2>
        <div class="w-20 h-1 bg-primary-500 rounded-full mb-8"></div>

        <div class="space-y-4 text-gray-300 leading-relaxed">
          <p>
            I'm a passionate software developer with experience building full-stack web applications.
            I enjoy working with modern technologies like Spring Boot, Angular, and cloud-native tools
            to create scalable and maintainable solutions.
          </p>
          <p>
            I'm constantly learning and exploring new technologies to improve my craft. When I'm not
            coding, you'll find me exploring open-source projects, contributing to the developer
            community, or working on personal projects that solve real-world problems.
          </p>
        </div>

        <div class="mt-8 flex flex-wrap gap-4">
          <a href="assets/Handshake_Pravat_Resume.pdf" target="_blank" class="btn-primary">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Resume
          </a>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent {}
