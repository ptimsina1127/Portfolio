import { Component, OnInit, output } from '@angular/core';

@Component({
  selector: 'xp-boot-screen',
  standalone: true,
  template: `
    <div class="xp-boot">
      <img src="assets/xp-boot.gif" alt="" class="xp-boot-gif">
    </div>
  `,
})
export class BootScreenComponent implements OnInit {
  readonly bootComplete = output<void>();

  ngOnInit() {
    setTimeout(() => this.bootComplete.emit(), 3500);
  }
}
