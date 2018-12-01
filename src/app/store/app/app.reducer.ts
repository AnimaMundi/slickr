import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '@env';
import { searchReducer, searchStateKey } from '@store/search';

import { AppState } from './app.state';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  [searchStateKey]: searchReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
