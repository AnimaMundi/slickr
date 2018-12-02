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

  public getPhotoUrl(photo: IPhotoSearchResult): string {
    return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${
      photo.id
    }_${photo.secret}_n.jpg`;
  }

  public getPhotoPageUrl(photo: IPhotoSearchResult): string {
    return `https://www.flickr.com/photos/${photo.owner}/${photo.id}`;
  }
}
