import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'simple-form-model',
    loadComponent: () =>
      import('./demos/simple-form-model/simple-form-model')
        .then(m => m.SimpleFormModel),
  },
  {
    path: 'field-state',
    loadComponent: () =>
      import('./demos/field-state/field-state')
        .then(m => m.FieldState),
  },
  {
    path: 'custom-control-reactive',
    loadComponent: () =>
      import('./demos/custom-control-reactive/custom-control-reactive')
        .then(m => m.CustomControlReactive),
  },
  {
    path: 'custom-control-signal',
    loadComponent: () =>
      import('./demos/custom-control-signal/custom-control-signal')
        .then(m => m.CustomControlSignal),
  },
];
