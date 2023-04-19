import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitaPageComponent } from './visita-page.component';

describe('AtividadePageComponent', () => {
  let component: VisitaPageComponent;
  let fixture: ComponentFixture<VisitaPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitaPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitaPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
