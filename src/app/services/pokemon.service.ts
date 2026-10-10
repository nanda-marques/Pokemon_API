
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonResumo {
  name: string;
  url: string;
}

export interface PokemonListaResposta {
  count: number;
  results: PokemonResumo[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(limit = 151, offset = 0): Observable<PokemonListaResposta> {
    return this.http.get<PokemonListaResposta>(
      `${this.apiUrl}?limit=${limit}&offset=${offset}`
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/${encodeURIComponent(name.toLowerCase())}`
    );
  }

  getPokemonId(url: string): number {
    const match = url.match(/\/pokemon\/(\d+)\/?$/);
    return match ? Number(match[1]) : 0;
  }

  getPokemonImage(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
