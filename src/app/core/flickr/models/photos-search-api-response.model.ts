export interface IPhotosSearchPhoto {
  farm: number;
  id: string;
  isfamily: number;
  isfriend: number;
  ispublic: number;
  owner: string;
  secret: string;
  server: string;
  title: string;
}

export interface IPhotosSearchPhotos {
  page: number;
  pages: number;
  perpage: number;
  total: string;
  photo: IPhotosSearchPhoto[];
}

export interface IPhotosSearchResponse {
  photos: IPhotosSearchPhotos;
  stat: string;
}
