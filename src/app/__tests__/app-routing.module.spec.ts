import { AppRoutingModule } from '../app-routing.module';

describe('AppRoutingModule', () => {
  let module: AppRoutingModule;

  beforeEach(() => {
    module = new AppRoutingModule();
  });

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
