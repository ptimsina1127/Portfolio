import { Component, output } from '@angular/core';

@Component({
  selector: 'xp-login-screen',
  standalone: true,
  template: `
    <div class="xp-login">
      <div class="xp-login-glow"></div>

      <div class="xp-login-center-wrap">
        <div class="xp-login-center">
          <!-- Left: Flag + Branding -->
          <div class="xp-login-left">
            <img src="assets/xp-flag.png" alt="" class="xp-login-flag" />
            <div class="xp-login-brand">
              <div class="xp-login-microsoft">Microsoft</div>
              <div class="xp-login-windowsxp">Windows<span class="xp-login-xp">XP</span></div>
            </div>
            <div class="xp-login-instruction">To begin, click your user name</div>
          </div>

          <!-- Center: Divider -->
          <div class="xp-login-divider"></div>

          <!-- Right: User Tile -->
          <div class="xp-login-right">
            <div class="xp-login-user-tile" tabindex="0" (click)="login()" (keydown.enter)="login()">
              <div class="xp-login-user-highlight">
                <img src="https://avatars.githubusercontent.com/u/80919172?v=4" alt="" class="xp-login-avatar" />
                <div class="xp-login-username">Administrator</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Taskbar -->
      <div class="xp-login-taskbar">
        <div class="xp-login-taskbar-left" tabindex="0" (click)="restart()" (keydown.enter)="restart()">
          <svg class="xp-login-standby-icon" viewBox="0 0 24 24" width="18" height="18">
            <circle cx="12" cy="12" r="9" stroke="#bbb" stroke-width="1.5" fill="none"/>
            <line x1="12" y1="3" x2="12" y2="12" stroke="#bbb" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <span class="xp-login-turn-off-text">Turn off computer</span>
        </div>
        <div class="xp-login-taskbar-right">
          <span class="xp-login-taskbar-desc">After you log on, you can add or change accounts. Just go to Control Panel and click User Accounts.</span>
        </div>
      </div>
    </div>
  `,
})
export class LoginScreenComponent {
  readonly loginComplete = output<string>();

  login() {
    this.loginComplete.emit('pravat');
  }

  restart() {
    window.location.reload();
  }
}
