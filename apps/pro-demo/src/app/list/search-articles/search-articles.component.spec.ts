import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchArticlesComponent } from './search-articles.component';

describe('SearchArticlesComponent', () => {
  let component: SearchArticlesComponent;
  let fixture: ComponentFixture<SearchArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
