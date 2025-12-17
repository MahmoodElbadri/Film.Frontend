import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

import {routes} from './app.routes';
import {HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { tokenInterceptor } from './core/_interceptors/token.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideHttpClient(withInterceptors([tokenInterceptor])),
      provideSweetAlert2({
        // Optional configuration
        fireOnInit: false,
        dismissOnDestroy: true,
      }),
      provideAnimations(), // required animations providers
      provideToastr(),     // Toastr providers
    ]
};
