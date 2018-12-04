import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { of, forkJoin } from 'rxjs';

import { FlickrService } from '@core/flickr';
import { AppState } from '@store/app';

import {
  ESearchAction,
  SearchAction,
  SearchSuccessAction,
  SearchFailureAction,
  SearchQueryFormSubmittedAction,
  SearchSizesAction,
  SearchSizesSuccessAction,
  SearchSizesFailureAction,
  SearchResultsAction,
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

  @Effect()
  public triggerSearchSizes = this.actions$.pipe(
    ofType<SearchSuccessAction>(ESearchAction.SearchSuccess),
    map(({ payload }) => new SearchSizesAction(payload)),
  );

  @Effect()
  public getSearchSizes$ = this.actions$.pipe(
    ofType<SearchSizesAction>(ESearchAction.SearchSizes),
    switchMap(({ payload }) =>
      forkJoin(
        payload.photos.photo.map(({ id }) =>
          this.flickrService.getPhotoSizes(id),
        ),
      ).pipe(
        map(
          res => new SearchSizesSuccessAction({ photos: payload, sizes: res }),
        ),
        catchError(err => of(new SearchSizesFailureAction(err))),
      ),
    ),
  );

  @Effect()
  public aggregateSearchData$ = this.actions$.pipe(
    ofType<SearchSizesSuccessAction>(ESearchAction.SearchSizesSuccess),
    map(({ payload }) => {
      const len = payload.photos.photos.photo.length;
      const pepe = [];

      for (let i = 0; i < len; i++) {
        const photo = payload.photos.photos.photo[i];
        const size = payload.sizes[i].sizes.size[4]; // Small 320

        const originalWidth = Number(size.width);
        const originalHeight = Number(size.height);

        const aspectRatio = originalWidth / originalHeight;

        const scaledWidth = 320;
        const scaledHeight =
          originalWidth === scaledWidth
            ? originalHeight
            : scaledWidth / aspectRatio;

        pepe.push({
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

      return new SearchResultsAction({
        currentPage: payload.photos.photos.page,
        pages: payload.photos.photos.pages,
        total: payload.photos.photos.total,
        photos: pepe,
      });
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store$: Store<AppState>,
    private readonly flickrService: FlickrService,
  ) {}
}
