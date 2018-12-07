import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  IPhotoSearchResult,
  getPhotoSearchResults,
  ResultListEndScrolledAction,
  getIsLoading,
} from '@store/search';
import { AppState } from '@store/app';

@Component({
  selector: 'app-result-list-container',
  templateUrl: './result-list-container.component.html',
  styleUrls: ['./result-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultListContainerComponent implements OnInit {
  public photoSearchResults$: Observable<IPhotoSearchResult[]>;
  public isLoading$: Observable<boolean>;

  constructor(private readonly store$: Store<AppState>) {}

  public ngOnInit(): void {
    this.photoSearchResults$ = this.store$.pipe(select(getPhotoSearchResults));
    this.isLoading$ = this.store$.pipe(select(getIsLoading));
  }

  public onListEndScrolled(): void {
    this.store$.dispatch(new ResultListEndScrolledAction());
  }
}
