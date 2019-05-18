import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRegionComponent } from './grid-region.component';

describe('GridRegionComponent', () => {
  let component: GridRegionComponent;
  let fixture: ComponentFixture<GridRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
