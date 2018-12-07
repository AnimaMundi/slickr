import { initialSearchState, ISearchState } from './search.state';
import { SearchActionType, ESearchAction } from './search.actions';

export const searchReducer = (
  state = initialSearchState,
  action: SearchActionType,
): ISearchState => {
  switch (action.type) {
    case ESearchAction.SearchQueryChanged:
      return {
        ...state,
        query: action.payload,
      };

    case ESearchAction.Search:
    case ESearchAction.SearchMore:
      return {
        ...state,
        isLoading: true,
      };

    case ESearchAction.SearchSuccess:
      return {
        ...state,
        isLoading: false,
        results: action.payload,
      };

    case ESearchAction.SearchMoreSuccess:
      return {
        ...state,
        isLoading: false,
        results: {
          currentPage: action.payload.currentPage,
          pages: action.payload.pages,
          total: action.payload.total,
          photos: state.results.photos.concat(action.payload.photos),
        },
      };

    default:
      return state;
  }
};
