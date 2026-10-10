import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'pokemon-details/:name',
    loadComponent: () =>
      import('./pages/pokemon-details/pokemon-details.page')
        .then((m) => m.PokemonDetailsPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
