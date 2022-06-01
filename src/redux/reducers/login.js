import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from "../../utils/constant";

const initialState = {
  fetching: false,
  userData: [],
  error: {},
};

export const handleLogin = (state = initialState, action = undefined) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        groupList: action.payload,
        fetching: false,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        fetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
