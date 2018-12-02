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

    case ESearchAction.SearchSuccess:
      return {
        ...state,
        results: {
          ...state.results,
          currentPage: action.payload.photos.page,
          pages: action.payload.photos.pages,
          total: Number(action.payload.photos.total),
          photos: state.results.photos.concat(
            action.payload.photos.photo.map(
              ({ id, farm, secret, server, title, owner }) => ({
                farm: String(farm),
                id,
                secret,
                server,
                title,
                owner,
              }),
            ),
          ),
        },
      };

    default:
      return state;
  }
};
