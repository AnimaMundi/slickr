import { initialSearchState, SearchState } from './search.state';
import { SearchActionType, ESearchAction } from './search.actions';

export const searchReducer = (
  state = initialSearchState,
  action: SearchActionType,
): SearchState => {
  switch (action.type) {
    case ESearchAction.SearchQueryChanged:
      return {
        ...state,
        query: action.payload,
      };

    default:
      return state;
  }
};
