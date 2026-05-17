import { Component, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass],
  template: `
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [ngClass]="{
        'bg-gray-950/90 backdrop-blur-md border-b border-gray-800': isScrolled
      }"
    >
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <a href="#hero" class="text-xl font-bold text-white hover:text-primary-400 transition-colors">
            PT<span class="text-primary-500">.</span>
          </a>

          <div class="hidden md:flex items-center gap-8">
            @for (link of navLinks; track link.href) {
              <a
                [href]="link.href"
                class="text-sm font-medium transition-colors duration-200"
                [ngClass]="{
                  'text-primary-400': activeSection === link.id,
                  'text-gray-400 hover:text-white': activeSection !== link.id
                }"
              >
                {{ link.label }}
              </a>
            }
          </div>

          <button
            (click)="mobileOpen = !mobileOpen"
            class="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if (mobileOpen) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      @if (mobileOpen) {
        <div class="md:hidden bg-gray-900 border-b border-gray-800">
          <div class="px-4 py-3 space-y-2">
            @for (link of navLinks; track link.href) {
              <a
                [href]="link.href"
                (click)="mobileOpen = false"
                class="block px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                [ngClass]="{
                  'text-primary-400': activeSection === link.id,
                  'text-gray-400 hover:bg-gray-800': activeSection !== link.id
                }"
              >
                {{ link.label }}
              </a>
            }
          </div>
        </div>
      }
    </nav>
  `,
})
export class NavbarComponent {
  isScrolled = false;
  mobileOpen = false;
  activeSection = 'hero';

  navLinks = [
    { id: 'hero', label: 'Home', href: '#hero' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 20;

    const sections = this.navLinks.map((l) => document.getElementById(l.id));
    const scrollPos = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const sec = sections[i];
      if (sec && sec.offsetTop <= scrollPos) {
        this.activeSection = this.navLinks[i].id;
        break;
      }
    }
  }
}
