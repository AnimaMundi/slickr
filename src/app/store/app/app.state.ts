import { RouterReducerState } from '@ngrx/router-store';

import { ISearchState, searchStateKey } from '@store/search';

export interface AppState {
  router: RouterReducerState;
  [searchStateKey]: ISearchState;
}
