import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-quadrado',
  templateUrl: './quadrado.component.html',
  styleUrls: ['./quadrado.component.scss'],
  standalone: true,
})
export class QuadradoComponent {
  @Input() valor: 'X' | 'O' | null = null;

  @HostBinding('style.backgroundColor') backgroundColor: string = 'white'; // Inicialmente branco

  ngOnChanges() {
    // Muda a cor aleatória apenas quando o valor muda
    if (this.valor) {
      this.mudarCorAleatoria();
    }
  }

  private mudarCorAleatoria() {
    const corAleatoria = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.backgroundColor = corAleatoria; // Muda a cor de fundo
  }
}
