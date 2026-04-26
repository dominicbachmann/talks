import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'tool-calling',
    loadComponent: () =>
      import('./tool-calling/tool-calling.component').then(
        (m) => m.ToolCallingDemoComponent,
      ),
  },
  {
    path: 'generative-ui',
    loadComponent: () =>
      import('./generative-ui/generative-ui.component').then(
        (m) => m.GenerativeUiDemoComponent,
      ),
  },
  {
    path: 'js-runtime',
    loadComponent: () =>
      import('./js-runtime/js-runtime.component').then(
        (m) => m.JsRuntimeDemoComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
