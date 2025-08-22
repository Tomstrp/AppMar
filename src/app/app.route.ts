import { Routes } from "@angular/router";
import { BriefingconIndexComponent } from "./briefingcon/briefingcon-index/briefingcon-index.component";
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
        component: BriefingconIndexComponent
    },
    { path: '**', redirectTo: 'login' }
];