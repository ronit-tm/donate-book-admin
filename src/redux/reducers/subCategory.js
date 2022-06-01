import {
  GET_SUB_CATEGORY_LIST_REQUEST,
  GET_SUB_CATEGORY_LIST_SUCCESS,
  GET_SUB_CATEGORY_LIST_ERROR,
} from '../../utils/constant';

const initialState = {
  fetching: false,
  subCategoryList: [],
  error: {},
};

export const SubCategoryList = (state = initialState, action = undefined) => {
  switch (action.type) {
    case GET_SUB_CATEGORY_LIST_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case GET_SUB_CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        subCategoryList: action.payload,
        fetching: false,
      };
    case GET_SUB_CATEGORY_LIST_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
