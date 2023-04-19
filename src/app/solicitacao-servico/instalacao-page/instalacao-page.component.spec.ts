import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalacaoPageComponent } from './instalacao-page.component';

describe('InstalacaoPageComponent', () => {
  let component: InstalacaoPageComponent;
  let fixture: ComponentFixture<InstalacaoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstalacaoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstalacaoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
