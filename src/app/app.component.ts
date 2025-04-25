import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Libros', url: '/books', icon: 'archive' },
    { title: 'Autores', url: '/authors', icon: 'heart' },
    { title: 'Categorias', url: '/categories', icon: 'paper-plane' },
    { title: 'Usuarios', url: '/users', icon: 'mail' },
  ];
  constructor() {}
}
