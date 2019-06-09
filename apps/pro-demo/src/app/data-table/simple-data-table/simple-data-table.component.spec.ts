import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleDataTableComponent } from './simple-data-table.component';

describe('SimpleDataTableComponent', () => {
  let component: SimpleDataTableComponent;
  let fixture: ComponentFixture<SimpleDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
