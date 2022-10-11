import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Propio1Component } from './propio1.component';

describe('Propio1Component', () => {
  let component: Propio1Component;
  let fixture: ComponentFixture<Propio1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Propio1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Propio1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
