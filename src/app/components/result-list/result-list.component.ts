import {
  Component,
  Input,
  ChangeDetectionStrategy,
  HostListener,
  ViewChildren,
  QueryList,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

import { IPhotoSearchResult } from '@store/search';

const colsPerRow = 4;

// must match the expected width of the images (search.effects.ts)
const colWidth = 320;
const gutter = 20;

/**
 * Internal card padding: 32px;
 *  Padding Top: 16px;
 *  Padding Bottom: 16px;
 * Header height: 32px;
 * Header margin bottom: 12px;
 * Image margin bottom: 16px;
 * Actions height: 44px;
 *
 * Total Height (Without image): 136px;
 */
const cardHeightWithoutImage = 136;

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultListComponent {
  @Input()
  public photos: IPhotoSearchResult[];

  @Input()
  public isLoading: boolean;

  @ViewChildren('photoResultElement', { read: ElementRef })
  public photoResultElements: QueryList<ElementRef>;

  @Output()
  public listEndScroll = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  public onWindowScroll(): void {
    const elements = this.photoResultElements.toArray();
    const element = elements[elements.length - 4];

    const boundingClientRect = element.nativeElement.getBoundingClientRect();
    const isInViewport =
      boundingClientRect.top <=
      (window.innerHeight || document.documentElement.clientHeight);

    if (isInViewport) {
      this.listEndScroll.emit();
    }
  }

  public getPhotoUrl(photo: IPhotoSearchResult): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${
      photo.id
    }_${photo.secret}_n.jpg`;
  }

  public getPhotoPageUrl(photo: IPhotoSearchResult): string {
    return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
  }

  public getCol(index: number): number {
    return index % colsPerRow;
  }

  public getRow(index: number): number {
    return Math.floor(index / colsPerRow);
  }

  public getPhotoLeft(index: number): number {
    const col = this.getCol(index);

    if (col === 0) {
      return gutter;
    }

    return col * colWidth + col * gutter + gutter;
  }

  public getPhotoTop(index: number): number {
    const row = this.getRow(index);

    if (row === 0) {
      return gutter;
    }

    let top = 0;
    let currentImageIndex = index;

    while (currentImageIndex >= colsPerRow) {
      currentImageIndex -= colsPerRow;
      top += this.getFullCardHeight(currentImageIndex);
    }

    top += gutter;

    return top;
  }

  private getFullCardHeight(index: number): number {
    return this.photos[index].height + cardHeightWithoutImage + gutter;
  }
}
