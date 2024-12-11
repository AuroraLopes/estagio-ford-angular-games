import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from '../directives/button.directive';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonDirective]
})
export class PongComponent implements OnInit {
  @ViewChild('gameCanvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private ballRadius = 10;
  private x!: number;
  private y!: number;
  private dx = 2; // Movimento horizontal
  private dy = -2; // Movimento vertical
  private paddleHeight = 10;
  private paddleWidth = 75;
  private paddleX!: number;
  private rightPressed = false;
  private leftPressed = false;
  private gameInterval: any; // Para armazenar o intervalo do jogo
  public isPaused = true; // Altere para público

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.resetGame();
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      if (!this.isPaused) {
        this.draw();
      }
    }, 10);
  }

  draw() {
    // Limpa o canvas
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.drawBall();
    this.drawPaddle();
    this.moveBall();
    this.movePaddle(); 
  }

  drawBall() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.ballRadius, 0, Math.PI * 2);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  drawPaddle() {
    this.ctx.beginPath();
    this.ctx.rect(this.paddleX, this.canvas.nativeElement.height - this.paddleHeight, this.paddleWidth, this.paddleHeight);
    this.ctx.fillStyle = "#0095DD";
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveBall() {
    this.x += this.dx;
    this.y += this.dy;

    // Colisão com as paredes
    if (this.x + this.ballRadius > this.canvas.nativeElement.width || this.x - this.ballRadius < 0) {
      this.dx = -this.dx;
    }
    if (this.y - this.ballRadius < 0) {
      this.dy = -this.dy;
    } else if (this.y + this.ballRadius > this.canvas.nativeElement.height) {
      if (this.x > this.paddleX && this.x < this.paddleX + this.paddleWidth) {
        this.dy = -this.dy;
      } else {
        alert("GAME OVER");
        this.resetGame();
      }
    }
  }

  resetGame() {
    clearInterval(this.gameInterval); // Limpa o intervalo do jogo
    this.x = this.canvas.nativeElement.width / 2;
    this.y = this.canvas.nativeElement.height - 30;
    this.paddleX = (this.canvas.nativeElement.width - this.paddleWidth) / 2;
    this.dx = 2; // Reinicia a velocidade
    this.dy = -2; // Reinicia a velocidade
    this.isPaused = true; // Inicia o jogo como pausado
  }

  pauseResumeGame() {
    this.isPaused = !this.isPaused; // Alterna o estado de pausa
    if (!this.isPaused) {
      this.startGame(); // Inicia o jogo se não estiver pausado
    }
  }

  movePaddle() {
    if (this.rightPressed && this.paddleX < this.canvas.nativeElement.width - this.paddleWidth) {
      this.paddleX += 6; // Aumenta a posição da raquete para a direita
    } else if (this.leftPressed && this.paddleX > 0) {
      this.paddleX -= 6; // Diminui a posição da raquete para a esquerda
    }
  }

  @HostListener('document:keydown', ['$event'])
  keyDownHandler(event: KeyboardEvent) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = true;
    }
  }

  @HostListener('document:keyup', ['$event'])
  keyUpHandler(event: KeyboardEvent) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
      this.rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
      this.leftPressed = false;
    }
  }
}
