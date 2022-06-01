import { GET_CATEGORY_LIST_REQUEST, GET_CATEGORY_LIST_SUCCESS, GET_CATEGORY_LIST_ERROR } from '../../utils/constant';

const initialState = {
  fetching: false,
  categoryList: [],
  error: {},
};

export const CategoryList = (state = initialState, action = undefined) => {
  switch (action.type) {
    case GET_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case GET_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: action.payload,
        fetching: false,
      };
    case GET_CATEGORY_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
