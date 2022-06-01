import { createAction } from 'redux-actions';
import * as constants from '../../utils/constant';

export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const loginError = createAction(constants.LOGIN_ERROR);

export const getCategoryListRequest = createAction(constants.GET_CATEGORY_LIST_REQUEST);
export const getCategoryListSuccess = createAction(constants.GET_CATEGORY_LIST_SUCCESS);
export const getCategoryListError = createAction(constants.GET_CATEGORY_LIST_ERROR);

export const getSubCategoryListRequest = createAction(constants.GET_SUB_CATEGORY_LIST_REQUEST);
export const getSubCategoryListSuccess = createAction(constants.GET_SUB_CATEGORY_LIST_SUCCESS);
export const getSubCategoryListError = createAction(constants.GET_SUB_CATEGORY_LIST_ERROR);
