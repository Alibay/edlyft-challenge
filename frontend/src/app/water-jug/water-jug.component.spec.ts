import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterJugComponent } from './water-jug.component';

describe('WaterJugComponent', () => {
  let component: WaterJugComponent;
  let fixture: ComponentFixture<WaterJugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterJugComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterJugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
