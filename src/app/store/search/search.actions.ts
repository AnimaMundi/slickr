import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { ISearchResultsState } from './search.state';

export enum ESearchAction {
  SearchQueryChanged = '[Search] Search Query Changed',
  SearchQueryFormSubmitted = '[Search] Search Query Form Submitted',
  ResultListEndScrolled = '[Search] Result List End Scrolled',
  Search = '[Search] Search',
  SearchSuccess = '[Search] Search Success',
  SearchFailure = '[Search] Search Failure',
  SearchMore = '[Search] Search More',
  SearchMoreSuccess = '[Search] Search More Success',
  SearchMoreFailure = '[Search] Search More Failure',
}

export class SearchQueryChangedAction implements Action {
  public readonly type = ESearchAction.SearchQueryChanged;

  constructor(public readonly payload: string) {}
}

export class SearchQueryFormSubmittedAction implements Action {
  public readonly type = ESearchAction.SearchQueryFormSubmitted;
}

export class ResultListEndScrolledAction implements Action {
  public readonly type = ESearchAction.ResultListEndScrolled;
}

export class SearchAction implements Action {
  public readonly type = ESearchAction.Search;
}

export class SearchSuccessAction implements Action {
  public readonly type = ESearchAction.SearchSuccess;

  constructor(public readonly payload: ISearchResultsState) {}
}

export class SearchFailureAction implements Action {
  public readonly type = ESearchAction.SearchFailure;

  constructor(public readonly payload: HttpErrorResponse) {}
}

export class SearchMoreAction implements Action {
  public readonly type = ESearchAction.SearchMore;
}

export class SearchMoreSuccessAction implements Action {
  public readonly type = ESearchAction.SearchMoreSuccess;

  constructor(public readonly payload: ISearchResultsState) {}
}

export class SearchMoreFailureAction implements Action {
  public readonly type = ESearchAction.SearchMoreFailure;

  constructor(public readonly payload: HttpErrorResponse) {}
}

export type SearchActionType =
  | SearchQueryChangedAction
  | SearchQueryFormSubmittedAction
  | ResultListEndScrolledAction
  | SearchAction
  | SearchSuccessAction
  | SearchFailureAction
  | SearchMoreAction
  | SearchMoreSuccessAction
  | SearchMoreFailureAction;
