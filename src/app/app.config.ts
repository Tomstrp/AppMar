import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.route";
import { authInterceptor } from "./auth/auth.interceptor";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
    providers:[
        provideHttpClient(withInterceptors([authInterceptor])),
        provideRouter(
            routes, 
            withComponentInputBinding(), 
            withRouterConfig(
                {
                    paramsInheritanceStrategy: 'always'
                }
            )), provideAnimationsAsync()
    ]
}