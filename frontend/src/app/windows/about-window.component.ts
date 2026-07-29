import { Component } from '@angular/core';

@Component({
  selector: 'win-about',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 8px;">
  <h1>About Me</h1>
  <div style="border-bottom: 2px solid #3973d6; width: 60px; margin-bottom: 12px;"></div>

  <div style="display: flex; gap: 16px; align-items: flex-start;">
    <img src="https://avatars.githubusercontent.com/u/80919172?v=4"
         style="width: 80px; height: 80px; border-radius: 50%; border: 2px solid #3973d6; flex-shrink: 0;" />
    <div style="flex: 1;">
      <p>I'm a passionate software developer with experience building full-stack web applications using Spring Boot, Angular, and cloud-native tools.</p>
      <p>I love exploring open-source, contributing to developer communities, and building things that solve real problems.</p>
    </div>
  </div>

  <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #d0d0d0;">
    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
      <a href="assets/Handshake_Pravat_Resume.pdf" download class="xp-btn xp-btn-primary" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
        📄 Download Resume
      </a>
      <a href="assets/Handshake_Pravat_Resume.pdf" target="_blank" class="xp-btn" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
        View Resume
      </a>
      <a href="https://mail.google.com/mail/?view=cm&fs=1&to=pravattimsina&#64;gmail.com" target="_blank" class="xp-btn" style="display: inline-flex; align-items: center; gap: 4px; text-decoration: none;">
        ✉️ Send an Email
      </a>
    </div>
  </div>

  <div style="margin-top: 14px; padding-top: 10px; border-top: 1px solid #d0d0d0;">
    <div style="display: flex; gap: 10px;">
      <a href="https://github.com/ptimsina1127" target="_blank" class="xp-badge" style="text-decoration: none;">🐙 GitHub</a>
      <a href="https://linkedin.com/in/ptimsina" target="_blank" class="xp-badge" style="text-decoration: none;">🔗 LinkedIn</a>
      <a href="https://x.com/pravatktimsina" target="_blank" class="xp-badge" style="text-decoration: none;">🐦 Twitter</a>
    </div>
  </div>
</div>
  `,
})
export class AboutWindowComponent {}
