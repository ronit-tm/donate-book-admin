import { apiInstance } from '../../httpClient';
import * as actions from './index';

export const getSubCategoryList = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(actions.getSubCategoryListRequest());
    apiInstance
      .get('admin/subcategory')
      .then((res) => {
        console.log('res: ', res);
        dispatch(actions.getSubCategoryListSuccess(res.data.data));
        resolve(res.data);
      })
      .catch((e) => {
        dispatch(actions.getSubCategoryListError(e?.response?.data?.message));
        reject(e);
      });
  });
