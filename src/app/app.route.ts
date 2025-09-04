import { Routes } from "@angular/router";
import { ServiceIndexComponent } from "./briefingcon/service-index/service-index.component";
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginGuard } from "./auth/login/login.guard";

export const routes:Routes  = [
    {
        path: 'login',
        canActivate: [LoginGuard],
        component: LoginComponent
    },
    {
        path: 'briefingcon',
        canActivate: [AuthGuard],
        component: ServiceIndexComponent
    },
    { path: '**', redirectTo: 'login' }
];