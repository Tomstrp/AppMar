import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormField} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { debounceTime } from 'rxjs';

import { AuthService } from '../auth.service';

let initialEmailValue = '';
const savedForm = window.localStorage.getItem('form-login-email');

if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    MatFormField, 
    MatInputModule, 
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  error = signal<string>('');
  loading = signal<boolean>(false);

  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required]
    }),
    password: new FormControl('', {
      validators: [Validators.required],
    }),
  });

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  ngOnInit() {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'form-login-email',
            JSON.stringify({ email: value.email })
          );
        }
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }

  onSubmit() {
    this.error.set('');
    this.loading.set(true);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    this.authService.login(enteredEmail || "", enteredPassword || "").subscribe({
      next:()=> {       
        this.loading.set(false);
        this.router.navigate(['briefingcon'], {replaceUrl: true});
      },
      error: (ex) => {
        this.loading.set(false);
        this.error.set(ex.error.message);
      }
    });
  }
  
}
