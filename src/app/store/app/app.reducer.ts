import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

import { environment } from '../../../environments/environment';
import { AppState } from './app.state';
import { searchReducer, searchStateKey } from '../search';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  [searchStateKey]: searchReducer,
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
