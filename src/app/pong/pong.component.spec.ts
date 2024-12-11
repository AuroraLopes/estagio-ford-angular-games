import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PongComponent } from './pong.component';
import { ButtonDirective } from '../directives/button.directive';

describe('PongComponent', () => {
  let component: PongComponent;
  let fixture: ComponentFixture<PongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PongComponent, ButtonDirective]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


