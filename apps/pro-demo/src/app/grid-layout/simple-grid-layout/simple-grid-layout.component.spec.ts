import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleGridLayoutComponent } from './simple-grid-layout.component';

describe('SimpleGridLayoutComponent', () => {
  let component: SimpleGridLayoutComponent;
  let fixture: ComponentFixture<SimpleGridLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleGridLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
