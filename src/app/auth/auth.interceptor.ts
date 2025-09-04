import { inject } from '@angular/core';
import {  HttpRequest, HttpHandlerFn } from '@angular/common/http';7

import { AuthService } from '../auth/auth.service';


export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {7
  const token = inject(AuthService).getToken();
  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${token}`),
  });
  return next(newReq);
}