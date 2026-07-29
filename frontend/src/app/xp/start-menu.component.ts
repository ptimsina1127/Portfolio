import { Component, input, output } from '@angular/core';

export interface StartMenuItem {
  icon: string;
  label: string;
  id: string;
  section?: 'right' | 'left';
}

@Component({
  selector: 'xp-start-menu',
  standalone: true,
  template: `
    <div class="xp-start-menu">
      <div class="xp-start-header">
        <svg class="xp-start-header-flag" viewBox="0 0 64 64" width="28" height="28">
          <path d="M4 4h27v27H4z" fill="#ff4b4b" opacity="0.9"/>
          <path d="M33 4h27v27H33z" fill="#4cff4c" opacity="0.9"/>
          <path d="M4 33h27v27H4z" fill="#4b4bff" opacity="0.9"/>
          <path d="M33 33h27v27H33z" fill="#ffff4b" opacity="0.9"/>
        </svg>
        <img
          src="https://avatars.githubusercontent.com/u/80919172?v=4"
          alt="Pravat"
          class="xp-start-header-avatar"
        />
        <span class="xp-start-header-name">
          {{ username() }}
        </span>
      </div>

      <div class="xp-start-body">
        <div class="xp-start-left">
          @for (item of leftItems(); track item.id) {
            <div class="xp-start-left-item" (click)="itemClicked.emit(item)">
              <span class="xp-start-left-item-icon">{{ item.icon }}</span>
              {{ item.label }}
            </div>
          }
          <div class="xp-start-left-divider"></div>
          <div class="xp-start-left-item" (click)="logoutClicked.emit()">
            <span class="xp-start-left-item-icon">🔒</span>
            Log Off
          </div>
        </div>

        <div class="xp-start-right">
          @for (item of rightItems(); track item.id) {
            <div class="xp-start-right-item" (click)="itemClicked.emit(item)">
              <span class="xp-start-right-item-icon">{{ item.icon }}</span>
              {{ item.label }}
            </div>
          }
        </div>
      </div>

      <div class="xp-start-footer">
        <button class="xp-start-footer-btn" (click)="logoutClicked.emit()">
          🔒 Log Off
        </button>
      </div>
    </div>
  `,
})
export class StartMenuComponent {
  readonly username = input('Pravat Timsina');
  readonly items = input<StartMenuItem[]>([]);
  readonly itemClicked = output<StartMenuItem>();
  readonly logoutClicked = output<void>();

  leftItems() {
    return this.items().filter(i => i.section === 'left');
  }

  rightItems() {
    return this.items().filter(i => i.section !== 'left');
  }
}
