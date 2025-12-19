import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import { provideSweetAlert2 } from '@sweetalert2/ngx-sweetalert2';

import {routes} from './app.routes';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { tokenInterceptor } from './core/_interceptors/token.interceptor';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {loadingInterceptor} from './core/_interceptors/loading.interceptor';
import {NgxSpinnerModule} from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers:
    [
      provideZoneChangeDetection({eventCoalescing: true}),
      provideRouter(routes),
      provideSweetAlert2({
        // Optional configuration
        fireOnInit: false,
        dismissOnDestroy: true,
      }),
      provideAnimations(), // required animations providers
      provideToastr(),
      provideHttpClient(withInterceptors([tokenInterceptor, loadingInterceptor])),
      importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' })),// Toastr providers
    ]
};
