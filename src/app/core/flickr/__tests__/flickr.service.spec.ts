import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { FlickrService } from '../flickr.service';

describe('FlickrService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }),
  );

  it('should be created', () => {
    const service: FlickrService = TestBed.get(FlickrService);
    expect(service).toBeTruthy();
  });
});
