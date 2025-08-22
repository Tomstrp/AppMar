import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [RouterOutlet]
})
export class AppComponent {}
