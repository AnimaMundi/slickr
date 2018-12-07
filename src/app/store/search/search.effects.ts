import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter,
  tap,
} from 'rxjs/operators';
import { of, forkJoin, Observable } from 'rxjs';

import { FlickrService } from '@core/flickr';
import { AppState } from '@store/app';

import {
  ESearchAction,
  SearchAction,
  SearchSuccessAction,
  SearchFailureAction,
  SearchQueryFormSubmittedAction,
  ResultListEndScrolledAction,
  SearchMoreAction,
  SearchMoreFailureAction,
  SearchMoreSuccessAction,
} from './search.actions';
import {
  getSearchQuery,
  getSearchPage,
  getIsLoading,
} from './search.selectors';
import { IPhotoSearchResult, ISearchResultsState } from './search.state';

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
  public triggerSearchMore$ = this.actions$.pipe(
    ofType<ResultListEndScrolledAction>(ESearchAction.ResultListEndScrolled),
    withLatestFrom(this.store$.pipe(select(getIsLoading))),
    filter(([_, isLoading]) => !isLoading),
    map(() => new SearchMoreAction()),
  );

  @Effect()
  public search$ = this.actions$.pipe(
    ofType<SearchAction>(ESearchAction.Search),
    withLatestFrom(this.store$.pipe(select(getSearchQuery))),
    switchMap(([_, searchQuery]) =>
      this.getResultsAndEnrich(searchQuery).pipe(
        map(res => new SearchSuccessAction(res)),
        catchError(err => of(new SearchFailureAction(err))),
      ),
    ),
  );

  @Effect()
  public searchMore$ = this.actions$.pipe(
    ofType<SearchMoreAction>(ESearchAction.SearchMore),
    withLatestFrom(
      this.store$.pipe(select(getSearchQuery)),
      this.store$.pipe(select(getSearchPage)),
    ),
    switchMap(([_, searchQuery, page]) =>
      this.getResultsAndEnrich(searchQuery, page + 1).pipe(
        map(res => new SearchMoreSuccessAction(res)),
        catchError(err => of(new SearchMoreFailureAction(err))),
      ),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly flickrService: FlickrService,
  ) {}

  private getResultsAndEnrich(
    searchQuery: string,
    page: number = 1,
  ): Observable<ISearchResultsState> {
    return this.flickrService.searchPhotos(searchQuery, page).pipe(
      switchMap(photoSearchResults =>
        forkJoin(
          photoSearchResults.photos.photo.map(({ id }) =>
            this.flickrService.getPhotoSizes(id),
          ),
        ).pipe(
          map(photoSizesResults => {
            const len = photoSearchResults.photos.photo.length;
            const photoResults: IPhotoSearchResult[] = [];

            for (let i = 0; i < len; i++) {
              const photo = photoSearchResults.photos.photo[i];
              const size = photoSizesResults[i].sizes.size[4]; // Small 320

              const originalWidth = Number(size.width);
              const originalHeight = Number(size.height);

              const aspectRatio = originalWidth / originalHeight;

              const scaledWidth = 320;
              const scaledHeight =
                originalWidth === scaledWidth
                  ? originalHeight
                  : scaledWidth / aspectRatio;

              photoResults.push({
                width: scaledWidth,
                height: scaledHeight,
                farm: String(photo.farm),
                id: photo.id,
                secret: photo.secret,
                server: photo.server,
                title: photo.title,
                owner: photo.owner,
                url: size.source,
              });
            }

            return {
              currentPage: photoSearchResults.photos.page,
              pages: photoSearchResults.photos.pages,
              total: Number(photoSearchResults.photos.total),
              photos: photoResults,
            };
          }),
        ),
      ),
    );
  }
}
