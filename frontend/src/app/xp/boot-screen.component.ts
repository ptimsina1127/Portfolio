import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'xp-boot-screen',
  standalone: true,
  template: `
    <div class="xp-boot">
      <div class="xp-boot-content">
        <!-- Windows flag logo -->
        <svg class="xp-boot-flag" viewBox="0 0 64 64" width="128" height="128">
          <defs>
            <linearGradient id="flagRed" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ff4b4b"/>
              <stop offset="100%" stop-color="#cc0000"/>
            </linearGradient>
            <linearGradient id="flagGreen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4cff4c"/>
              <stop offset="100%" stop-color="#00a600"/>
            </linearGradient>
            <linearGradient id="flagBlue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#4b4bff"/>
              <stop offset="100%" stop-color="#0000cc"/>
            </linearGradient>
            <linearGradient id="flagYellow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffff4b"/>
              <stop offset="100%" stop-color="#ccaa00"/>
            </linearGradient>
          </defs>
          <path d="M4 4h27v27H4z" fill="url(#flagRed)" opacity="0.9"/>
          <path d="M33 4h27v27H33z" fill="url(#flagGreen)" opacity="0.9"/>
          <path d="M4 33h27v27H4z" fill="url(#flagBlue)" opacity="0.9"/>
          <path d="M33 33h27v27H33z" fill="url(#flagYellow)" opacity="0.9"/>
          <path d="M4 4h27v27H4z" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
          <path d="M33 4h27v27H33z" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
          <path d="M4 33h27v27H4z" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
          <path d="M33 33h27v27H33z" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
        </svg>

        <div class="xp-boot-loading">
          <div class="xp-boot-boxes">
            <div class="xp-boot-box" [class.active]="bootPhase >= 1"></div>
            <div class="xp-boot-box" [class.active]="bootPhase >= 2"></div>
            <div class="xp-boot-box" [class.active]="bootPhase >= 3"></div>
          </div>
        </div>

        <div class="xp-boot-delay-msg" [class.visible]="showDelayMsg">
          Still booting... hang tight.
        </div>
      </div>

      <div class="xp-boot-bottom-left">
        <span>For the best experience</span>
        <span>Enter Full Screen (F11)</span>
      </div>

      <div class="xp-boot-bottom-right">
        <svg class="xp-boot-wordmark" viewBox="0 0 160 30" width="160" height="30">
          <text x="0" y="22" fill="#aaa" font-family="'Trebuchet MS',sans-serif" font-size="22" font-weight="700" letter-spacing="1">WindowsXP</text>
        </svg>
      </div>
    </div>
  `,
})
export class BootScreenComponent implements OnInit {
  readonly bootComplete = output<void>();

  bootPhase = 0;
  showDelayMsg = false;

  ngOnInit() {
    setTimeout(() => { this.bootPhase = 1; }, 400);
    setTimeout(() => { this.bootPhase = 2; }, 900);
    setTimeout(() => { this.bootPhase = 3; }, 1400);

    setTimeout(() => { this.showDelayMsg = true; }, 2500);

    setTimeout(() => this.bootComplete.emit(), 3500);
  }
}
