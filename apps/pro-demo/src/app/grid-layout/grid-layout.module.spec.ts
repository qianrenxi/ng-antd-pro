import { GridLayoutModule } from './grid-layout.module';

describe('GridLayoutModule', () => {
  let gridLayoutModule: GridLayoutModule;

  beforeEach(() => {
    gridLayoutModule = new GridLayoutModule();
  });

  it('should create an instance', () => {
    expect(gridLayoutModule).toBeTruthy();
  });
});
