import { createFeatureSelector, createSelector } from '@ngrx/store';

import { searchStateKey, ISearchState } from './search.state';

export const selectSearchState = createFeatureSelector<ISearchState>(
  searchStateKey,
);

export const getSearchQuery = createSelector(
  selectSearchState,
  ({ query }) => query,
);

export const getIsLoading = createSelector(
  selectSearchState,
  ({ isLoading }) => isLoading,
);

export const getSearchResults = createSelector(
  selectSearchState,
  ({ results }) => results,
);

export const getSearchPage = createSelector(
  getSearchResults,
  ({ currentPage }) => currentPage,
);

export const getPhotoSearchResults = createSelector(
  getSearchResults,
  ({ photos }) => photos,
);
