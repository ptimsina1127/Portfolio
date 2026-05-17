import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="flex items-center justify-center min-h-[60vh]">
      <div class="text-center">
        <p class="text-primary-400 text-lg">Redirecting...</p>
      </div>
    </div>
  `,
})
export class HomeComponent {}
