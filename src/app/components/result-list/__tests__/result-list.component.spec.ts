import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultListComponent } from '../result-list.component';

describe('ResultListComponent', () => {
  let component: ResultListComponent;
  let fixture: ComponentFixture<ResultListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultListComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
