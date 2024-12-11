import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appButton]',
})

export class ButtonDirective {

  @Input() restart: boolean = false; // Atributo para botão de reiniciar
  @Input() pause: boolean = false;   // Atributo para botão de pausar

  constructor(private el: ElementRef) {}

  // Definindo estilos ao passar o mouse sobre os botões
  @HostListener('mouseenter') onMouseEnter() {
    if (this.restart) {
      this.applyStyles('blue', '2px solid black', '150px', '50px'); // Botão de reiniciar
    } else if (this.pause) {
      this.applyStyles('purple', '2px dashed red', '140px', '45px'); // Botão de pausar
    }
  }

  // Reseta a cor, borda e tamanho ao sair do mouse para os padrões
  @HostListener('mouseleave') onMouseLeave() {
    if (this.restart) {
      this.applyStyles('pink', '1px solid grey', '120px', '40px'); // Cor e estilo padrão para botão de reiniciar
    } else if (this.pause) {
      this.applyStyles('green', '1px solid grey', '110px', '35px'); // Cor e estilo padrão para botão de pausar
    }
  }

  // Função para aplicar múltiplos estilos
  private applyStyles(backgroundColor: string, border: string, width: string, height: string) {
    this.el.nativeElement.style.backgroundColor = backgroundColor;
    this.el.nativeElement.style.border = border;
    this.el.nativeElement.style.width = width;
    this.el.nativeElement.style.height = height;
  }
}
