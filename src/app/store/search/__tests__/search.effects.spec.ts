import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';

import { appReducer } from '@store/app';

import { SearchEffects } from '../search.effects';

describe('SearchEffects', () => {
  // tslint:disable-next-line:prefer-const
  let actions$: Observable<any>;
  let effects: SearchEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducer), HttpClientTestingModule],
      providers: [SearchEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.get(SearchEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
