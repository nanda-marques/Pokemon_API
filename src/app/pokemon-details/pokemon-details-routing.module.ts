// Essa página define a rota para exibir a página de detalhes

import { NgModule } from '@angular/core'; //decorador
import { Routes, RouterModule } from '@angular/router'; //rotas
import { PokemonDetailsPage } from './pokemon-details.page'; // detalhes do Pokémon

const routes: Routes = [
  {
    path: '',
    component: PokemonDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // rotas filhas
  exports: [RouterModule],
})
export class PokemonDetailsPageRoutingModule {}
