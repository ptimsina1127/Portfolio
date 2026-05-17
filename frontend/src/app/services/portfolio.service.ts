import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Project } from '../models/project.model';
import { Profile } from '../models/profile.model';
import { ContactMessage } from '../models/contact.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projects`);
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${id}`);
  }

  getLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/projects/languages`);
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.apiUrl}/profile`);
  }

  sendContactMessage(message: ContactMessage): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/contact`, message);
  }

  triggerSync(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/sync`, {});
  }
}
