import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColRegionComponent } from './col-region.component';

describe('ColRegionComponent', () => {
  let component: ColRegionComponent;
  let fixture: ComponentFixture<ColRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
