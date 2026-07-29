import { Component, output } from '@angular/core';

@Component({
  selector: 'xp-login-screen',
  standalone: true,
  template: `
    <div class="xp-login">
      <div class="xp-login-inner">
        <div class="xp-login-center">
          <div class="xp-login-left">
            <!-- Windows flag logo -->
            <svg class="xp-login-logo" viewBox="0 0 64 64" width="64" height="64">
              <path d="M4 4h27v27H4z" fill="#ff4b4b" opacity="0.9"/>
              <path d="M33 4h27v27H33z" fill="#4cff4c" opacity="0.9"/>
              <path d="M4 33h27v27H4z" fill="#4b4bff" opacity="0.9"/>
              <path d="M33 33h27v27H33z" fill="#ffff4b" opacity="0.9"/>
            </svg>
            <div class="xp-login-left-text">
              To begin, click on <span class="xp-login-instruction-name">User</span> to log in
            </div>
          </div>

          <div class="xp-login-divider"></div>

          <div class="xp-login-right">
            <div class="xp-login-user-tile" tabindex="0" (click)="login()" (keydown.enter)="login()">
              <img
                src="https://avatars.githubusercontent.com/u/80919172?v=4"
                alt="Pravat"
                class="xp-login-avatar"
              />
              <div class="xp-login-name">User</div>
              <div class="xp-login-role">Software Developer</div>
            </div>
          </div>
        </div>
      </div>

      <div class="xp-login-restart" tabindex="0" (click)="restart()" (keydown.enter)="restart()">
        <svg class="xp-login-restart-icon" viewBox="0 0 24 24" width="16" height="16">
          <path fill="#ccc" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13v4H7l5 5 5-5h-4V7h-2z"/>
        </svg>
        <span class="xp-login-restart-text">Restart System</span>
      </div>

      <div class="xp-login-bottom-text">
        <span>After you log on, the system's yours to explore.</span>
        <span>Every detail has been designed with a purpose.</span>
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
