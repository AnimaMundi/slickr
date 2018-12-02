import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { appReducer } from '@store/app';

import { ResultListContainerComponent } from '../result-list-container.component';

describe('ResultListContainerComponent', () => {
  let component: ResultListContainerComponent;
  let fixture: ComponentFixture<ResultListContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducer)],
      declarations: [ResultListContainerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
