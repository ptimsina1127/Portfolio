import { Component } from '@angular/core';
import { BootScreenComponent } from './xp/boot-screen.component';
import { LoginScreenComponent } from './xp/login-screen.component';
import { DesktopComponent } from './xp/desktop.component';
import { SoundService } from './xp/sound.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BootScreenComponent, LoginScreenComponent, DesktopComponent],
  template: `
    @if (screen === 'boot') {
      <xp-boot-screen (bootComplete)="onBootComplete()" />
    } @else if (screen === 'login') {
      <xp-login-screen (loginComplete)="onLogin($event)" />
    } @else if (screen === 'desktop') {
      <xp-desktop (logout)="onLogout()" />
    }

    <div class="xp-crt-scanline"></div>
    <div class="xp-crt-vignette"></div>
  `,
})
export class AppComponent {
  screen: 'boot' | 'login' | 'desktop' = 'boot';

  constructor(private sound: SoundService) {}

  onBootComplete() {
    this.screen = 'login';
  }

  onLogin(_user: string) {
    this.sound.playLogin();
    this.screen = 'desktop';
  }

  onLogout() {
    this.sound.playLogoff();
    this.screen = 'login';
  }
}
