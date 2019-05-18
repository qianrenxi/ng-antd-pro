import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowRegionComponent } from './row-region.component';

describe('RowRegionComponent', () => {
  let component: RowRegionComponent;
  let fixture: ComponentFixture<RowRegionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowRegionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
