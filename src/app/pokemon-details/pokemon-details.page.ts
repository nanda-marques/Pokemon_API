import { Component, OnInit } from '@angular/core'; // OnInit -> interface
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // ^^ módulos usados no HTML
import { ActivatedRoute, RouterModule } from '@angular/router'; // parâmetros da rota
import { PokemonService } from '../services/pokemon.service'; // serviço -> API pokemon

@Component({
  selector: 'app-pokemon-details',
  standalone: true, // não precisar ser declarado num módulo
  imports: [CommonModule, IonicModule, RouterModule], //para o HTML
  templateUrl: './pokemon-details.page.html',
  styleUrls: ['./pokemon-details.page.scss'],
})
export class PokemonDetailsPage implements OnInit {
  pokemon: any;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const name = params['name']; //NOME: pokémon na URL
      if (name) {
        this.pokemonService.getPokemonDetails(name).subscribe((data: any) => { //resposta 
          this.pokemon = data;
        });
      }
    });
  }
}
