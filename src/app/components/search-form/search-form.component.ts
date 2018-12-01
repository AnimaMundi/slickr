import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit, OnDestroy {
  public searchQueryFormControl = new FormControl('');

  @Input()
  public set searchQuery(searchQuery: string) {
    this.searchQueryFormControl.setValue(searchQuery, { emitEvent: false });
  }

  @Output()
  public searchQueryChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  public ngOnInit(): void {
    this.searchQueryFormControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
        this.searchQueryChange.emit(value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
