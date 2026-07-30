import { Component } from '@angular/core';

@Component({
  selector: 'win-my-computer',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 8px; height: 100%; display: flex; flex-direction: column;">
  <div style="display: flex; align-items: center; gap: 10px; padding: 8px; border-bottom: 1px solid #c0c0c0; margin-bottom: 8px;">
    <img src="assets/icons/local-disk.png" width="48" height="48" />
    <div>
      <div style="font-size: 13px; font-weight: 700;">Local Disk (C:)</div>
      <div style="font-size: 11px; color: #666;">443 GB free of 476 GB</div>
    </div>
  </div>

  <div style="font-size: 11px; font-weight: 600; color: #666; padding: 2px 4px; margin-bottom: 4px;">
    Files Stored on This Computer:
  </div>

  <div style="flex: 1; overflow-y: auto; border: 1px solid #c0c0c0; background: #fff;">
    <div style="display: flex; flex-direction: column;">
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'about'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>About Me</span>
      </div>
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'resume'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>My Resume</span>
      </div>
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'skills'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>My Skills</span>
      </div>
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'experience'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>Experience</span>
      </div>
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'projects'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>My Projects</span>
      </div>
      <div class="xp-computer-folder" onclick="window.dispatchEvent(new CustomEvent('open-window', {detail: 'contact'}))">
        <img src="assets/icons/folder.png" width="24" height="24" />
        <span>Contact Me</span>
      </div>
    </div>
  </div>

  <div style="font-size: 11px; color: #888; padding: 4px; border-top: 1px solid #c0c0c0; margin-top: 4px;">
    6 objects
  </div>
</div>
  `,
  styles: [`
    .xp-computer-folder {
      display: flex; align-items: center; gap: 6px;
      padding: 4px 8px; cursor: pointer;
      font-size: 11px; color: #000;
      user-select: none;
    }
    .xp-computer-folder:hover {
      background: #3973d6; color: #fff;
    }
    .xp-computer-folder span {
      pointer-events: none;
    }
  `]
})
export class MyComputerWindowComponent {}
