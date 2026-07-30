import { Component } from '@angular/core';

@Component({
  selector: 'win-recycle-bin',
  standalone: true,
  template: `
<div class="xp-content" style="padding: 16px; text-align: center;">
  <div style="margin-bottom: 16px;">
    <img src="assets/icons/recycle-bin.png" width="64" height="64" style="opacity: 0.7;" />
  </div>
  <div style="font-size: 13px; font-weight: 600; color: #666; margin-bottom: 4px;">
    Recycle Bin
  </div>
  <div style="font-size: 11px; color: #888;">
    This folder is empty.
  </div>

  <div style="margin-top: 24px; display: flex; gap: 8px; justify-content: center;">
    <button class="xp-btn" disabled style="opacity: 0.5;">Restore all items</button>
    <button class="xp-btn" disabled style="opacity: 0.5;">Empty Recycle Bin</button>
  </div>
</div>
  `,
})
export class RecycleBinWindowComponent {}
