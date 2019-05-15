import { async, TestBed } from '@angular/core/testing';
import { NgAntdProModule } from './ng-antd-pro.module';

describe('NgAntdProModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgAntdProModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(NgAntdProModule).toBeDefined();
  });
});
