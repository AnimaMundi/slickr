import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { IPhotoSearchResult } from '@store/search';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultListComponent {
  @Input()
  public photos: IPhotoSearchResult[];

  private colsPerRow = 4;
  private colWidth = 320; // must match the expected width of the images (search.effects.ts)
  private gutter = 20;

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
  private cardHeightWithoutImage = 136;

  public getPhotoUrl(photo: IPhotoSearchResult): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${
      photo.id
    }_${photo.secret}_n.jpg`;
  }

  public getPhotoPageUrl(photo: IPhotoSearchResult): string {
    return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
  }

  public getCol(index: number): number {
    return index % this.colsPerRow;
  }

  public getRow(index: number): number {
    return Math.floor(index / this.colsPerRow);
  }

  public getPhotoLeft(index: number): string {
    const col = this.getCol(index);

    if (col === 0) {
      return `${this.gutter}px`;
    }

    return `${col * this.colWidth + col * this.gutter + this.gutter}px`;
  }

  public getPhotoTop(index: number): string {
    const row = this.getRow(index);

    if (row === 0) {
      return `${this.gutter}px`;
    }

    let top = 0;
    let currentImageIndex = index;

    while (currentImageIndex >= this.colsPerRow) {
      currentImageIndex -= this.colsPerRow;
      top +=
        this.photos[currentImageIndex].height +
        this.cardHeightWithoutImage +
        this.gutter;
    }

    top += this.gutter;

    return `${top}px`;
  }
}
