import { Component, OnInit, OnDestroy, input, output } from '@angular/core';
import { OpenWindow } from './desktop.component';

@Component({
  selector: 'xp-taskbar',
  standalone: true,
  template: `
    <div class="xp-taskbar">
      <button class="xp-start-btn" (click)="startClicked.emit()">
        <img src="assets/xp-flag.png" class="xp-start-flag" width="20" height="20" alt="" />
        <span class="xp-start-text">start</span>
      </button>

      <div class="xp-taskbar-divider"></div>

      <div class="xp-taskbar-windows">
        @for (win of windows(); track win.id) {
          <button
            class="xp-taskbar-window-btn"
            [class.active]="win.id === activeWindow()"
            (click)="windowClicked.emit(win.id)"
          >
            {{ win.icon }} {{ win.title }}
          </button>
        }
      </div>

      <div class="xp-taskbar-tray">
        <div class="xp-tray-icons">
          <svg class="xp-tray-icon" viewBox="0 0 16 16" width="14" height="14" title="Volume">
            <path fill="#fff" d="M2 6h2l3-3v10L4 10H2V6zm7 0c1.1 0 2 1.3 2 3s-.9 3-2 3v-1c.6 0 1-1 1-2s-.4-2-1-2V6z"/>
          </svg>
          <svg class="xp-tray-icon" viewBox="0 0 16 16" width="14" height="14" title="Network">
            <rect x="2" y="10" width="3" height="4" rx="0.5" fill="#fff"/>
            <rect x="6.5" y="7" width="3" height="7" rx="0.5" fill="#fff"/>
            <rect x="11" y="4" width="3" height="10" rx="0.5" fill="#fff"/>
          </svg>
        </div>
        <span class="xp-taskbar-clock">{{ clock }}</span>
      </div>
    </div>
  `,
})
export class TaskbarComponent implements OnInit, OnDestroy {
  readonly windows = input<OpenWindow[]>([]);
  readonly activeWindow = input<string | null>(null);
  readonly startClicked = output<void>();
  readonly windowClicked = output<string>();
  clock = '12:00 PM';

  private timer: any;

  ngOnInit() {
    this.updateClock();
    this.timer = setInterval(() => this.updateClock(), 30000);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  private updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = String(now.getMinutes()).padStart(2, '0');
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    this.clock = `${h}:${m} ${ampm}`;
  }
}
