import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtividadePageComponent } from './atividade-page.component';

describe('AtividadePageComponent', () => {
  let component: AtividadePageComponent;
  let fixture: ComponentFixture<AtividadePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtividadePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtividadePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
