export interface IPhotoSize {
  width: number;
  height: number;
  label: string;
  media: string;
  source: string;
  url: string;
}

export interface IPhotoSizes {
  canblog: number;
  candownload: number;
  canprint: number;
  size: IPhotoSize[];
}

export interface IPhotoSizesApiResponse {
  sizes: IPhotoSizes;
  state: string;
}
