import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface User {
  username: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  apiUrl = '';
  currentUser = signal<User | null>(null);
  private httpClient = inject(HttpClient);

  constructor() {
    // All'avvio, recupero eventuale utente salvato
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(username: string, password: string) {
    return this.httpClient.post<User>('/api/login', { username, password }).pipe(
      tap(user => {
        this.currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn() {
    return this.currentUser() !== null;
  }
}
