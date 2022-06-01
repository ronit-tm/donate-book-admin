import { apiInstance } from '../../httpClient';
import * as actions from './index';

export const getCategoryList = () => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(actions.getCategoryListRequest());
    apiInstance
      .get('admin/category')
      .then((res) => {
        console.log('res: ', res);
        dispatch(actions.getCategoryListSuccess(res.data.data));
        resolve();
      })
      .catch((e) => {
        dispatch(actions.getCategoryListError(e?.response?.data?.message));
        reject();
      });
  });
