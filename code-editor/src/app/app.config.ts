import { provideAnimations } from '@angular/platform-browser/animations';
import { TuiRootModule } from '@taiga-ui/core';
import {
    ApplicationConfig,
    provideZoneChangeDetection,
    importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { NGX_MONACO_EDITOR_CONFIG } from 'ngx-monaco-editor-v2';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
    providers: [
        provideAnimations(),
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(appRoutes),
        provideHttpClient(),
        importProvidersFrom(TuiRootModule),
        {
            provide: NGX_MONACO_EDITOR_CONFIG,
            useValue: {
                baseUrl: 'assets/monaco',
            },
        },
    ],
};
