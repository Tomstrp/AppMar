import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../enviroments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private token = signal<string | null>(null);
  private httpClient = inject(HttpClient);

  constructor() {
    const savedToken = localStorage.getItem('TOKEN');
    if (savedToken) {
      this.token.set(savedToken);
    }
  }

  login(username: string, password: string) {
    var postData = { "Username": username, "Password": password };
    console.log(postData);
    return this.httpClient.post<{token:string}>(`${environment.authApiUrl}/Auth/Login`, postData)
      .pipe(
        tap(result => {
          this.token.set(result.token);
          localStorage.setItem('TOKEN', result.token);
        })
      );
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('TOKEN');
  }

  isAuthenticated() {
    console.log('this.token(): '+this.token() );
    return this.token() !== null;
  }

  getToken(){
    return this.token();
  }

}
