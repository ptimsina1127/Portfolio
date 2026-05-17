import { Component } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ExperienceComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  template: `
    <app-navbar></app-navbar>
    <main>
      <section id="hero"><app-hero /></section>
      <section id="about"><app-about /></section>
      <section id="skills"><app-skills /></section>
      <section id="experience"><app-experience /></section>
      <section id="projects"><app-projects /></section>
      <section id="contact"><app-contact /></section>
    </main>
    <footer class="text-center py-6 text-gray-500 text-sm border-t border-gray-800">
      <p>&copy; 2026 Pravat Timsina. Built with Angular &amp; Spring Boot.</p>
    </footer>
  `,
})
export class AppComponent {}
