import { Component, output } from '@angular/core';
import { NgIf } from '@angular/common';
import { TaskbarComponent } from './taskbar.component';
import { StartMenuComponent, StartMenuItem } from './start-menu.component';
import { XpWindowComponent, WindowState } from './xp-window.component';
import { AboutWindowComponent } from '../windows/about-window.component';
import { SkillsWindowComponent } from '../windows/skills-window.component';
import { ExperienceWindowComponent } from '../windows/experience-window.component';
import { ProjectsWindowComponent } from '../windows/projects-window.component';
import { ContactWindowComponent } from '../windows/contact-window.component';

export interface OpenWindow {
  id: string;
  title: string;
  icon: string;
  component: string;
  minimized: boolean;
  maximized: boolean;
}

export interface DesktopIcon {
  icon: string;
  label: string;
  id: string;
}

@Component({
  selector: 'xp-desktop',
  standalone: true,
  imports: [
    NgIf,
    TaskbarComponent,
    StartMenuComponent,
    XpWindowComponent,
    AboutWindowComponent,
    SkillsWindowComponent,
    ExperienceWindowComponent,
    ProjectsWindowComponent,
    ContactWindowComponent,
  ],
  template: `
    <div class="xp-desktop">
      <div class="xp-desktop-wallpaper"></div>

      <!-- Welcome overlay -->
      @if (showWelcome) {
        <div class="xp-welcome-overlay" [class.fade-out]="welcomeFading">
          <span class="xp-welcome-text">welcome</span>
        </div>
      }

      <div class="xp-desktop-icons">
        @for (icon of desktopIcons; track icon.id) {
          <div class="xp-desktop-icon" (dblclick)="openWindow(icon.id)">
            <div class="xp-desktop-icon-img">
              @switch (icon.id) {
                @case ('about') {
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <rect x="4" y="2" width="24" height="28" rx="2" fill="#f0f0f0" stroke="#808080" stroke-width="1.5"/>
                    <circle cx="16" cy="13" r="4" fill="#3a7ad8"/>
                    <path d="M10 22c0-3.3 2.7-6 6-6s6 2.7 6 6" fill="none" stroke="#3a7ad8" stroke-width="2"/>
                  </svg>
                }
                @case ('resume') {
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <rect x="6" y="2" width="20" height="28" rx="2" fill="#f0f0f0" stroke="#808080" stroke-width="1.5"/>
                    <rect x="9" y="8" width="14" height="2" rx="1" fill="#c0c0c0"/>
                    <rect x="9" y="13" width="14" height="2" rx="1" fill="#c0c0c0"/>
                    <rect x="9" y="18" width="10" height="2" rx="1" fill="#c0c0c0"/>
                  </svg>
                }
                @case ('projects') {
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <rect x="2" y="6" width="28" height="22" rx="3" fill="#f0c040" stroke="#b8860b" stroke-width="1.5"/>
                    <rect x="2" y="6" width="28" height="6" rx="3" fill="#e0b030" stroke="#b8860b" stroke-width="1.5"/>
                    <circle cx="8" cy="9" r="1.5" fill="#fff"/>
                    <circle cx="12" cy="9" r="1.5" fill="#fff"/>
                    <circle cx="16" cy="9" r="1.5" fill="#fff"/>
                  </svg>
                }
                @case ('contact') {
                  <svg viewBox="0 0 32 32" width="32" height="32">
                    <rect x="2" y="4" width="28" height="24" rx="2" fill="#f0f0f0" stroke="#808080" stroke-width="1.5"/>
                    <path d="M2 8l14 10L30 8" fill="none" stroke="#3a7ad8" stroke-width="2"/>
                  </svg>
                }
              }
            </div>
            <span class="xp-desktop-icon-label">{{ icon.label }}</span>
          </div>
        }
      </div>

      @for (win of windowStates; track win.id) {
        <xp-window
          [state]="win"
          (close)="closeWindow(win.id)"
          (minimize)="minimizeWindow(win.id)"
          (toggleMaximize)="toggleMaximizeWindow(win.id)"
          (focus)="focusWindow(win.id)"
          (move)="moveWindow(win.id, $event)"
          (resize)="resizeWindow(win.id, $event)"
        >
          @switch (win.component) {
            @case ('about') { <win-about /> }
            @case ('skills') { <win-skills /> }
            @case ('experience') { <win-experience /> }
            @case ('projects') { <win-projects /> }
            @case ('contact') { <win-contact /> }
          }
        </xp-window>
      }

      @if (showLogoffDialog) {
        <div class="xp-logoff-overlay" (click)="cancelLogoff()">
          <div class="xp-logoff-dialog" (click)="$event.stopPropagation()">
            <div class="xp-logoff-header">
              <svg viewBox="0 0 32 32" width="32" height="32">
                <circle cx="16" cy="16" r="14" fill="#f0d040" stroke="#b8860b" stroke-width="1.5"/>
                <path d="M16 8v10" stroke="#333" stroke-width="2.5" stroke-linecap="round"/>
                <circle cx="16" cy="22" r="1.5" fill="#333"/>
              </svg>
              <span class="xp-logoff-header-text">Log Off Windows</span>
            </div>
            <div class="xp-logoff-sep"></div>
            <div class="xp-logoff-actions">
              <div class="xp-logoff-btn" tabindex="0" (click)="onLogout()" (keydown.enter)="onLogout()">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path fill="none" stroke="#333" stroke-width="1.5" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 5l5 5-5 5"/>
                </svg>
                <span>Log Off</span>
              </div>
            </div>
            <div class="xp-logoff-sep"></div>
            <div class="xp-logoff-footer">
              <button class="xp-btn" (click)="cancelLogoff()">Cancel</button>
            </div>
          </div>
        </div>
      }

      @if (showStartMenu) {
        <xp-start-menu
          [items]="startMenuItems"
          [username]="'Pravat Timsina'"
          (itemClicked)="onStartMenuItem($event)"
          (logoutClicked)="showLogoffDialog = true; showStartMenu = false"
        />
      }

      <xp-taskbar
        [windows]="openWindows"
        [activeWindow]="activeWindowId"
        (startClicked)="toggleStartMenu()"
        (windowClicked)="focusWindow($event)"
      />
    </div>
  `,
})
export class DesktopComponent {
  readonly logout = output<void>();

  showStartMenu = false;
  showLogoffDialog = false;
  activeWindowId: string | null = null;
  private nextZIndex = 10;

  showWelcome = true;
  welcomeFading = false;

  desktopIcons: DesktopIcon[] = [
    { icon: 'about', label: 'About Me', id: 'about' },
    { icon: 'resume', label: 'My Resume', id: 'resume' },
    { icon: 'projects', label: 'My Projects', id: 'projects' },
    { icon: 'contact', label: 'Contact Me', id: 'contact' },
  ];

  openWindows: OpenWindow[] = [];
  windowStates: WindowState[] = [];

  startMenuItems: StartMenuItem[] = [
    { icon: '👤', label: 'About Me', id: 'about', section: 'right' },
    { icon: '📄', label: 'My Resume', id: 'resume', section: 'right' },
    { icon: '🛠️', label: 'My Skills', id: 'skills', section: 'right' },
    { icon: '💼', label: 'Experience', id: 'experience', section: 'right' },
    { icon: '📁', label: 'My Projects', id: 'projects', section: 'right' },
    { icon: '✉️', label: 'Contact Me', id: 'contact', section: 'right' },
    { icon: '🌐', label: 'GitHub', id: 'github', section: 'left' },
    { icon: '🔗', label: 'LinkedIn', id: 'linkedin', section: 'left' },
    { icon: '🐦', label: 'Twitter', id: 'twitter', section: 'left' },
    { icon: '📄', label: 'Resume', id: 'resume-pdf', section: 'left' },
  ];

  ngOnInit() {
    setTimeout(() => {
      this.welcomeFading = true;
      setTimeout(() => { this.showWelcome = false; }, 800);
    }, 1500);
  }

  toggleStartMenu() {
    this.showStartMenu = !this.showStartMenu;
  }

  cancelLogoff() {
    this.showLogoffDialog = false;
  }

  onStartMenuItem(item: StartMenuItem) {
    this.showStartMenu = false;
    if (item.id === 'github') { window.open('https://github.com/ptimsina1127', '_blank'); return; }
    if (item.id === 'linkedin') { window.open('https://linkedin.com/in/ptimsina', '_blank'); return; }
    if (item.id === 'twitter') { window.open('https://x.com/pravatktimsina', '_blank'); return; }
    if (item.id === 'resume-pdf') { window.open('assets/Handshake_Pravat_Resume.pdf', '_blank'); return; }
    if (item.id === 'resume') { window.open('assets/Handshake_Pravat_Resume.pdf', '_blank'); return; }
    this.openWindow(item.id);
  }

  onLogout() {
    this.showLogoffDialog = false;
    this.logout.emit();
  }

  openWindow(id: string) {
    const existing = this.openWindows.find(w => w.id === id);
    if (existing) {
      this.focusWindow(id);
      if (existing.minimized) {
        existing.minimized = false;
        this.syncState();
      }
      return;
    }

    const defs: Record<string, { title: string; icon: string }> = {
      about: { title: 'About Me', icon: '👤' },
      skills: { title: 'My Skills', icon: '🛠️' },
      experience: { title: 'Experience', icon: '💼' },
      projects: { title: 'My Projects', icon: '📁' },
      contact: { title: 'Contact Me', icon: '✉️' },
    };

    const def = defs[id];
    if (!def) return;

    const win: OpenWindow = {
      id, title: def.title, icon: def.icon, component: id,
      minimized: false, maximized: false,
    };
    this.openWindows.push(win);

    const n = this.openWindows.length - 1;
    const state: WindowState = {
      id, title: def.title, icon: def.icon, component: id,
      active: true,
      minimized: false, maximized: false,
      x: 80 + n * 24,
      y: 40 + n * 24,
      width: id === 'projects' ? 640 : 600,
      height: id === 'projects' ? 460 : 400,
      zIndex: this.nextZIndex++,
    };
    this.windowStates.push(state);
    this.activeWindowId = id;
  }

  closeWindow(id: string) {
    this.openWindows = this.openWindows.filter(w => w.id !== id);
    this.windowStates = this.windowStates.filter(w => w.id !== id);
    if (this.activeWindowId === id) {
      this.activeWindowId = this.openWindows.length > 0 ? this.openWindows[this.openWindows.length - 1].id : null;
    }
  }

  minimizeWindow(id: string) {
    const win = this.openWindows.find(w => w.id === id);
    if (win) win.minimized = true;
    this.syncState();
  }

  toggleMaximizeWindow(id: string) {
    const win = this.openWindows.find(w => w.id === id);
    if (win) win.maximized = !win.maximized;
    this.syncState();
  }

  focusWindow(id: string) {
    this.activeWindowId = id;
    const state = this.windowStates.find(w => w.id === id);
    if (state) {
      state.active = true;
      state.zIndex = this.nextZIndex++;
      this.windowStates.forEach(w => { if (w.id !== id) w.active = false; });
    }
    this.showStartMenu = false;
  }

  moveWindow(id: string, pos: { x: number; y: number }) {
    const state = this.windowStates.find(w => w.id === id);
    if (state) { state.x = pos.x; state.y = pos.y; }
  }

  resizeWindow(id: string, size: { width: number; height: number }) {
    const state = this.windowStates.find(w => w.id === id);
    if (state) { state.width = size.width; state.height = size.height; }
  }

  private syncState() {
    this.windowStates = [...this.windowStates];
  }
}
