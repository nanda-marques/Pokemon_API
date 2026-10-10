
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonText
} from '@ionic/angular';

import {
  PokemonService,
  PokemonResumo
} from '../services/pokemon.service';

interface PokemonExibicao extends PokemonResumo {
  id: number;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonSpinner,
    IonText
  ]
})
export class HomePage implements OnInit {
  private readonly pokemonService = inject(PokemonService);

  pokemonList: PokemonExibicao[] = [];
  filteredPokemon: PokemonExibicao[] = [];
  loading = true;
  error = '';
  searchTerm = '';

  ngOnInit(): void {
    this.pokemonService.getPokemonList(151).subscribe({
      next: (response) => {
        this.pokemonList = response.results.map((pokemon) => {
          const id = this.pokemonService.getPokemonId(pokemon.url);

          return {
            ...pokemon,
            id,
            image: this.pokemonService.getPokemonImage(id)
          };
        });

        this.filteredPokemon = [...this.pokemonList];
        this.loading = false;
      },
      error: () => {
        this.error = 'Não foi possível carregar os Pokémon. Tente novamente.';
        this.loading = false;
      }
    });
  }

  filterPokemon(event: CustomEvent): void {
    this.searchTerm = String(event.detail.value ?? '')
      .trim()
      .toLowerCase();

    this.filteredPokemon = this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchTerm) ||
      String(pokemon.id).includes(this.searchTerm)
    );
  }

  formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}
