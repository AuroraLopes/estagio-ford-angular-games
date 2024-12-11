import { Component, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../directives/button.directive';
import { QuadradoComponent } from '../quadrado/quadrado.component';

interface PlayerStats {
  name: string;
  victories: number;
  defeats: number;
}

@Component({
  selector: 'app-jogo-da-velha',
  templateUrl: './jogo-da-velha.component.html',
  styleUrls: ['./jogo-da-velha.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonDirective, QuadradoComponent]
})
export class JogoDaVelhaComponent {
  quadrados: Array<'X' | 'O' | null> = Array(9).fill(null);
  proximoJogador: 'X' | 'O' = 'X';

  definirValor(index: number) {
    if (!this.quadrados[index]) {
      this.quadrados[index] = this.proximoJogador;
      this.proximoJogador = this.proximoJogador === 'X' ? 'O' : 'X';
    }
  }
}
