import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // ✔ Manejo global de errores
    provideBrowserGlobalErrorListeners(),

    // ✔ Detección de cambios optimizada
    provideZoneChangeDetection({ eventCoalescing: true }),

    // ✔ Router principal
    provideRouter(routes),

    // ✔ HttpClient moderno
    provideHttpClient()
  ]
};
