import { Component } from '@angular/core';

@Component({
  selector: 'win-resume',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 0; height: 100%; display: flex; flex-direction: column;">
  <iframe
    src="assets/Handshake_Pravat_Resume.pdf"
    style="width: 100%; height: 100%; border: none;"
  ></iframe>
</div>
  `,
})
export class ResumeWindowComponent {}
