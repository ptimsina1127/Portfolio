import { Component, input, output } from '@angular/core';

export interface StartMenuItem {
  icon: string;
  iconImg?: string;
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
        <img src="assets/xp-flag.png" class="xp-start-header-flag" width="28" height="28" alt="" />
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
              @if (item.iconImg) {
                <img [src]="item.iconImg" class="xp-start-left-item-icon-img" />
              } @else {
                <span class="xp-start-left-item-icon">{{ item.icon }}</span>
              }
              {{ item.label }}
            </div>
          }
        </div>

        <div class="xp-start-right">
          @for (item of rightItems(); track item.id) {
            <div class="xp-start-right-item" (click)="itemClicked.emit(item)">
              @if (item.iconImg) {
                <img [src]="item.iconImg" class="xp-start-right-item-icon-img" />
              } @else {
                <span class="xp-start-right-item-icon">{{ item.icon }}</span>
              }
              {{ item.label }}
            </div>
          }
        </div>
      </div>

      <div class="xp-start-footer">
        <div class="xp-start-footer-left">
          <button class="xp-start-footer-btn" (click)="logoutClicked.emit()">
            <img src="assets/icons/key.png" width="20" height="20" /> Log Off
          </button>
        </div>
        <div class="xp-start-footer-divider"></div>
        <div class="xp-start-footer-right">
          <button class="xp-start-footer-btn" (click)="turnOffClicked.emit()">
            <img src="assets/icons/power.png" width="20" height="20" /> Turn Off Computer
          </button>
        </div>
      </div>
    </div>
  `,
})
export class StartMenuComponent {
  readonly username = input('Pravat Timsina');
  readonly items = input<StartMenuItem[]>([]);
  readonly itemClicked = output<StartMenuItem>();
  readonly logoutClicked = output<void>();
  readonly turnOffClicked = output<void>();

  leftItems() {
    return this.items().filter(i => i.section === 'left');
  }

  rightItems() {
    return this.items().filter(i => i.section !== 'left');
  }
}
