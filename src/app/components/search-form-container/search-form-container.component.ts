import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { AppState } from '@store/app';
import {
  getSearchQuery,
  SearchQueryChangedAction,
  SearchQueryFormSubmittedAction,
} from '@store/search';

@Component({
  selector: 'app-search-form-container',
  templateUrl: './search-form-container.component.html',
  styleUrls: ['./search-form-container.component.scss'],
})
export class SearchFormContainerComponent implements OnInit {
  public searchQuery$: Observable<string>;

  constructor(private readonly store$: Store<AppState>) {}

  public ngOnInit() {
    this.searchQuery$ = this.store$.pipe(select(getSearchQuery));
  }

  public onSearchQueryChanged(searchQuery: string): void {
    this.store$.dispatch(new SearchQueryChangedAction(searchQuery));
  }

  public onSearchQueryFormSubmitted(): void {
    this.store$.dispatch(new SearchQueryFormSubmittedAction());
  }
}
