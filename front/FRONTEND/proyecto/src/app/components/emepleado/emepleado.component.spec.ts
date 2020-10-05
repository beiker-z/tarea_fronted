import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmepleadoComponent } from './emepleado.component';

describe('EmepleadoComponent', () => {
  let component: EmepleadoComponent;
  let fixture: ComponentFixture<EmepleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmepleadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmepleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
