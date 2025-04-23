import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokemon-details',
    loadChildren: () => import('./pokemon-details/pokemon-details.module').then( m => m.PokemonDetailsPageModule) // é carregado quando o usuário clica para acessar
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }) // precarrega todas as rotas  lazy-loaded (carregamento-preguiçoso) em segundo plano
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
