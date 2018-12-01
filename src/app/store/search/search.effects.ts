import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';

import { FlickrService } from '@core/flickr';
import { AppState } from '@store/app';

import {
  ESearchAction,
  SearchAction,
  SearchSuccessAction,
  SearchFailureAction,
  SearchQueryFormSubmittedAction,
} from './search.actions';
import { getSearchQuery } from './search.selectors';

@Injectable()
export class SearchEffects {
  @Effect()
  public triggerSearch$ = this.actions$.pipe(
    ofType<SearchQueryFormSubmittedAction>(
      ESearchAction.SearchQueryFormSubmitted,
    ),
    map(() => new SearchAction()),
  );

  @Effect()
  public search$ = this.actions$.pipe(
    ofType<SearchAction>(ESearchAction.Search),
    withLatestFrom(this.store$.pipe(select(getSearchQuery))),
    switchMap(([_, searchQuery]) =>
      this.flickrService.searchPhotos(searchQuery).pipe(
        map(res => new SearchSuccessAction(res)),
        catchError(err => of(new SearchFailureAction(err))),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly flickrService: FlickrService,
  ) {}
}
