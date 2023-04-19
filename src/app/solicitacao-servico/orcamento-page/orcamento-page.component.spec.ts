import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoPageComponent } from './orcamento-page.component';

describe('OrcamentoPageComponent', () => {
  let component: OrcamentoPageComponent;
  let fixture: ComponentFixture<OrcamentoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrcamentoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
