import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JogoDaVelhaComponent } from './jogo-da-velha/jogo-da-velha.component';
import { PongComponent } from './pong/pong.component';
import { HeaderComponent } from "./header/header.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JogoDaVelhaComponent, PongComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'games-angular';
}


