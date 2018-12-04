import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { IPhotosSearchResponse } from '@core/flickr';

export enum ESearchAction {
  SearchQueryChanged = '[Search] Search Query Changed',
  SearchQueryFormSubmitted = '[Search] Search Query Form Submitted',
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
  SearchSizes = '[Search] Search Sizes',
  SearchSizesSuccess = '[Search] Search Sizes Success',
  SearchSizesFailure = '[Search] Search Sizes Failure',
  SearchResults = '[Search] Search Results',
}

export class SearchQueryChangedAction implements Action {
  public readonly type = ESearchAction.SearchQueryChanged;

  constructor(public readonly payload: string) {}
}

export class SearchQueryFormSubmittedAction implements Action {
  public readonly type = ESearchAction.SearchQueryFormSubmitted;
}

export class SearchAction implements Action {
  public readonly type = ESearchAction.Search;
}

export class SearchSuccessAction implements Action {
  public readonly type = ESearchAction.SearchSuccess;

  constructor(public readonly payload: IPhotosSearchResponse) {}
}

export class SearchFailureAction implements Action {
  public readonly type = ESearchAction.SearchFailure;

  constructor(public readonly payload: HttpErrorResponse) {}
}

export class SearchSizesAction implements Action {
  public readonly type = ESearchAction.SearchSizes;

  constructor(public readonly payload: IPhotosSearchResponse) {}
}

export class SearchSizesSuccessAction implements Action {
  public readonly type = ESearchAction.SearchSizesSuccess;

  constructor(
    public readonly payload: { photos: IPhotosSearchResponse; sizes: any },
  ) {} // [TODO] - Replace Any
}

export class SearchSizesFailureAction implements Action {
  public readonly type = ESearchAction.SearchSizesFailure;

  constructor(public readonly payload: HttpErrorResponse) {}
}

export class SearchResultsAction implements Action {
  public readonly type = ESearchAction.SearchResults;

  constructor(public readonly payload: any) {} // [TODO] - Replace Any
}

export type SearchActionType =
  | SearchQueryChangedAction
  | SearchQueryFormSubmittedAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | SearchSizesAction
  | SearchSizesSuccessAction
  | SearchSizesFailureAction
  | SearchResultsAction;
