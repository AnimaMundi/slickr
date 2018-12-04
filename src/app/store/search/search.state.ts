export interface IPhotoSearchResult {
  id: string;
  secret: string;
  farm: string;
  server: string;
  title: string;
  owner: string;
  width: number;
  height: number;
}

export interface SearchState {
  query: string;
  results: {
    currentPage: number;
    pages: number;
    total: number;
    photos: IPhotoSearchResult[];
  };
}

export const initialSearchState: SearchState = {
  query: '',
  results: {
    currentPage: 0,
    pages: 0,
    total: 0,
    photos: [],
  },
};

export const searchStateKey = 'search';
