import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env';

import { IPhotosSearchResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private readonly http: HttpClient) {}

  public searchPhotos(tags: string): Observable<IPhotosSearchResponse> {
    return this.makeRequest('flickr.photos.search', {
      per_page: '20',
      tags,
    });
  }

  // [TODO] - remove any
  public getPhotoSizes(photoId: string): Observable<any> {
    return this.makeRequest('flickr.photos.getSizes', {
      photo_id: photoId,
    });
  }

  private makeRequest<T>(
    method: string,
    extParams: { [param: string]: string | string[] },
  ): Observable<T> {
    return this.http.get<T>(`${environment.flickr.endpoint}/rest`, {
      params: {
        api_key: environment.flickr.apiKey,
        format: 'json',
        nojsoncallback: '1',
        method,
        ...extParams,
      },
    });
  }
}
