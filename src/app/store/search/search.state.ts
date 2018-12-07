export interface IPhotoSearchResult {
  id: string;
  secret: string;
  farm: string;
  server: string;
  url: string;
  title: string;
  owner: string;
  width: number;
  height: number;
}

export interface ISearchResultsState {
  currentPage: number;
  pages: number;
  total: number;
  photos: IPhotoSearchResult[];
}

export interface ISearchState {
  query: string;
  isLoading: boolean;
  results: ISearchResultsState;
}

export const initialSearchState: ISearchState = {
  query: '',
  isLoading: false,
  results: {
    currentPage: 0,
    pages: 0,
    total: 0,
    photos: [],
  },
};

export const searchStateKey = 'search';
