import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetPreviewComponent } from './planet-preview.component';

describe('PlanetPreviewComponent', () => {
  let component: PlanetPreviewComponent;
  let fixture: ComponentFixture<PlanetPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanetPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
