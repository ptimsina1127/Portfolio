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
      <a href="https://github.com/ptimsina1127" target="_blank" class="xp-badge" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#181717"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 24 5.37 18.63 0 12 0z"/></svg>
        GitHub
      </a>
      <a href="https://linkedin.com/in/ptimsina" target="_blank" class="xp-badge" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        LinkedIn
      </a>
      <a href="https://x.com/pravatktimsina" target="_blank" class="xp-badge" style="text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="#000000"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        Twitter
      </a>
    </div>
  </div>
</div>
  `,
})
export class AboutWindowComponent {}
