import { AppStoreModule } from '../app-store.module';

describe('AppStoreModule', () => {
  let module: AppStoreModule;

  beforeEach(() => {
    module = new AppStoreModule();
  });

  it('should create', () => {
    expect(module).toBeTruthy();
  });
});
