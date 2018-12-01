import { RouterReducerState } from '@ngrx/router-store';

import { SearchState, searchStateKey } from '@store/search';

export interface AppState {
  router: RouterReducerState;
  [searchStateKey]: SearchState;
}
