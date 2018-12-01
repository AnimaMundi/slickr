import { createFeatureSelector, createSelector } from '@ngrx/store';

import { searchStateKey } from './search.state';

export const selectSearchState = createFeatureSelector(searchStateKey);

export const getSearchQuery = createSelector(
  selectSearchState,
  ({ query }) => query,
);
