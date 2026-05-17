import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { ContactMessage } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="section-container">
      <div class="text-center mb-12">
        <h2 class="section-title">Get In Touch</h2>
        <div class="w-20 h-1 bg-primary-500 rounded-full mx-auto"></div>
        <p class="section-subtitle mt-4">Have a question or want to work together? Drop me a message!</p>
      </div>

      <div class="max-w-2xl mx-auto">
        @if (submitted) {
          <div class="card text-center py-12 animate-fade-in">
            <svg class="w-16 h-16 text-emerald-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <h3 class="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
            <p class="text-gray-400">Thank you for reaching out. I'll get back to you soon.</p>
            <button (click)="submitted = false" class="mt-6 btn-outline">Send Another</button>
          </div>
        } @else {
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  [(ngModel)]="form.name"
                  name="name"
                  required
                  class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  [(ngModel)]="form.email"
                  name="email"
                  required
                  class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                [(ngModel)]="form.subject"
                name="subject"
                class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Message</label>
              <textarea
                [(ngModel)]="form.message"
                name="message"
                required
                rows="5"
                class="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-lg text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button type="submit" class="btn-primary w-full justify-center" [disabled]="loading">
              @if (loading) {
                <svg class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Sending...
              } @else {
                Send Message
              }
            </button>
          </form>
        }
      </div>
    </div>
  `,
})
export class ContactComponent {
  form: ContactMessage = { name: '', email: '', subject: '', message: '' };
  submitted = false;
  loading = false;

  constructor(private portfolioService: PortfolioService) {}

  onSubmit() {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.loading = true;
    this.portfolioService.sendContactMessage(this.form).subscribe({
      next: () => {
        this.submitted = true;
        this.loading = false;
        this.form = { name: '', email: '', subject: '', message: '' };
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
