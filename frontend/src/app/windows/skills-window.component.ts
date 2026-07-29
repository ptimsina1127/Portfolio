import { Component } from '@angular/core';

@Component({
  selector: 'win-skills',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 8px;">
  <h1>Skills & Tech Stack</h1>
  <div style="border-bottom: 2px solid #3973d6; width: 60px; margin-bottom: 12px;"></div>

  <div class="xp-grid-4">
    <div class="xp-card">
      <div class="xp-card-title">Languages</div>
      <div>☕ Java</div>
      <div>🔷 TypeScript</div>
      <div>🟨 JavaScript</div>
      <div>🐍 Python</div>
      <div>🗄️ SQL</div>
    </div>
    <div class="xp-card">
      <div class="xp-card-title">Frameworks</div>
      <div>🍃 Spring Boot</div>
      <div>🅰️ Angular</div>
      <div>⚛️ React</div>
      <div>🗃️ Hibernate</div>
      <div>🎨 Tailwind CSS</div>
    </div>
    <div class="xp-card">
      <div class="xp-card-title">Tools & Platforms</div>
      <div>📦 Git</div>
      <div>🐳 Docker</div>
      <div>📮 Postman</div>
      <div>📐 Maven</div>
      <div>💻 VS Code</div>
    </div>
    <div class="xp-card">
      <div class="xp-card-title">Databases</div>
      <div>🐬 MySQL</div>
      <div>🐘 PostgreSQL</div>
      <div>🍃 MongoDB</div>
    </div>
  </div>
</div>
  `,
})
export class SkillsWindowComponent {}
