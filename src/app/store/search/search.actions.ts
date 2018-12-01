import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { IPhotosSearchResponse } from '@core/flickr';

export enum ESearchAction {
  SearchQueryChanged = '[Search] Search Query Changed',
  SearchQueryFormSubmitted = '[Search] Search Query Form Submitted',
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
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

export type SearchActionType =
  | SearchQueryChangedAction
  | SearchQueryFormSubmittedAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailureAction;
