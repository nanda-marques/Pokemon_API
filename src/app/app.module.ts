import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // p/rodar em um navegador
import { RouteReuseStrategy } from '@angular/router'; // reutilização de rotas.

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http'; //comunicação HTTP com a API ou servidores externos

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Inicializa o módulo Ionic/configura o comportamento base do app.
    AppRoutingModule, //Rotas
    HttpClientModule //Para realizar requisições HTTP
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
