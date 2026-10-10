
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  IonSpinner,
  IonText
} from '@ionic/angular';

import { PokemonService } from '../../services/pokemon.service';

interface PokemonStat {
  name: string;
  label: string;
  value: number;
}

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonSpinner,
    IonText
  ]
})
export class PokemonDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly pokemonService = inject(PokemonService);

  readonly Math = Math;

  pokemon: any = null;
  loading = true;
  error = '';

  readonly statLabels: Record<string, string> = {
    hp: 'HP',
    attack: 'Ataque',
    defense: 'Defesa',
    'special-attack': 'Ataque especial',
    'special-defense': 'Defesa especial',
    speed: 'Velocidade'
  };

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.paramMap.get('name');

    if (!pokemonName) {
      this.error = 'Pokémon não informado.';
      this.loading = false;
      return;
    }

    this.pokemonService.getPokemonDetails(pokemonName).subscribe({
      next: (data) => {
        this.pokemon = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar Pokémon:', err);
        this.error = 'Não foi possível carregar os detalhes do Pokémon.';
        this.loading = false;
      }
    });
  }

  get imageUrl(): string {
    if (!this.pokemon) {
      return '';
    }

    return (
      this.pokemon.sprites?.other?.['official-artwork']?.front_default ||
      this.pokemon.sprites?.front_default ||
      this.pokemonService.getPokemonImage(this.pokemon.id)
    );
  }

  get stats(): PokemonStat[] {
    if (!this.pokemon?.stats) {
      return [];
    }

    return this.pokemon.stats.map((stat: any): PokemonStat => ({
      name: stat.stat.name,
      label: this.statLabels[stat.stat.name] || stat.stat.name,
      value: stat.base_stat
    }));
  }

  formatName(name: string): string {
    if (!name) {
      return '';
    }

    return name
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  formatMeasure(value: number): string {
    return (value / 10).toLocaleString('pt-BR', {
      maximumFractionDigits: 1
    });
  }
}
