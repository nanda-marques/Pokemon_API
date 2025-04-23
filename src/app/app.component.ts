import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false, // ele depende de estar declarado dentro de um NgModel
})
export class AppComponent {
  constructor() {}
}
