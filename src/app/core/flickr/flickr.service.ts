import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env';

import { IPhotosSearchResponse, IPhotoSizesApiResponse } from './models';

@Injectable({
  providedIn: 'root',
})
export class FlickrService {
  constructor(private readonly http: HttpClient) {}

  public searchPhotos(
    tags: string,
    page: number = 1,
  ): Observable<IPhotosSearchResponse> {
    return this.makeRequest('flickr.photos.search', {
      per_page: '20',
      page: String(page),
      tags,
    });
  }

  public getPhotoSizes(photoId: string): Observable<IPhotoSizesApiResponse> {
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
