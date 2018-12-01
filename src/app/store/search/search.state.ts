export interface SearchState {
  query: string;
}

export const initialSearchState: SearchState = {
  query: '',
};

export const searchStateKey = 'search';
