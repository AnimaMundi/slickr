import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppStoreModule } from './app-store.module';

import { AppComponent } from './app.component';
import {
  HeaderComponent,
  FooterComponent,
  SearchFormComponent,
  SearchFormContainerComponent,
} from './components';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchFormComponent,
    SearchFormContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,

    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,

    AppRoutingModule,
    AppStoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
