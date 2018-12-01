import { Action } from '@ngrx/store';

export enum ESearchAction {
  SearchQueryChanged = '[Search] Search Query Changed',
}

export class SearchQueryChangedAction implements Action {
  public readonly type = ESearchAction.SearchQueryChanged;

  constructor(public readonly payload: string) {}
}

export type SearchActionType = SearchQueryChangedAction;
