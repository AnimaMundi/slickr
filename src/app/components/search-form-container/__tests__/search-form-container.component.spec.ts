import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { appReducer } from '@store/app';

import { SearchFormContainerComponent } from '../search-form-container.component';

describe('SearchFormContainerComponent', () => {
  let component: SearchFormContainerComponent;
  let fixture: ComponentFixture<SearchFormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducer)],
      declarations: [SearchFormContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compile the template', () => {
    expect(fixture).toMatchSnapshot();
  });
});
