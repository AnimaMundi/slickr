import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { appReducer, metaReducers, CustomSerializer } from '@store/app';
import { SearchEffects } from '@store/search';
import { environment } from '@env';

@NgModule({
  imports: [
    StoreModule.forRoot(appReducer, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SearchEffects]),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
  ],
})
export class AppStoreModule {}
