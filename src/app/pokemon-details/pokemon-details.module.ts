import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  // diretivas comuns do Angular como *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // [(ngModel)]

import { IonicModule } from '@ionic/angular'; // componentes visuais e funcionalidades do Ionic

import { PokemonDetailsPageRoutingModule } from './pokemon-details-routing.module';

import { PokemonDetailsPage } from './pokemon-details.page';

@NgModule({
  imports: [ // módulos
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonDetailsPageRoutingModule, //standalone
    PokemonDetailsPage
  ]
})
export class PokemonDetailsPageModule {}
