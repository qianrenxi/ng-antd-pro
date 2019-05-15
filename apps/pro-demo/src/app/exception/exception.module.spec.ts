import { ExceptionModule } from './exception.module';

describe('ExceptionModule', () => {
  let exceptionModule: ExceptionModule;

  beforeEach(() => {
    exceptionModule = new ExceptionModule();
  });

  it('should create an instance', () => {
    expect(exceptionModule).toBeTruthy();
  });
});
