import { ApplicationConfig } from "@angular/core";
import { provideRouter, withComponentInputBinding, withRouterConfig } from "@angular/router";
import { provideHttpClient } from "@angular/common/http";

import { routes } from "./app.route";

export const appConfig: ApplicationConfig = {
    providers:[
        provideHttpClient(),
        provideRouter(
            routes, 
            withComponentInputBinding(), 
            withRouterConfig(
                {
                    paramsInheritanceStrategy: 'always'
                }
            ))
    ]
}