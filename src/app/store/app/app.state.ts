import { RouterReducerState } from '@ngrx/router-store';

import { SearchState, searchStateKey } from '../search';

export interface AppState {
  router: RouterReducerState;
  [searchStateKey]: SearchState;
}
