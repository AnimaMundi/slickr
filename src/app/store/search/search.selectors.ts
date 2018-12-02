import { createFeatureSelector, createSelector } from '@ngrx/store';

import { searchStateKey } from './search.state';

export const selectSearchState = createFeatureSelector(searchStateKey);

export const getSearchQuery = createSelector(
  selectSearchState,
  ({ query }) => query,
);

export const getSearchResults = createSelector(
  selectSearchState,
  ({ results }) => results,
);

export const getPhotoSearchResults = createSelector(
  getSearchResults,
  ({ photos }) => photos,
);
