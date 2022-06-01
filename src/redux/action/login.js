import { apiInstance } from "../../httpClient";
import * as actions from "./index";

export const handleAdminLogin = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    dispatch(actions.loginRequest());
    apiInstance
      .post("admin/login", data)
      .then((res) => {
        console.log('res: ', res);
        dispatch(actions.loginSuccess(res.data.data));
        resolve();
      })
      .catch((e) => {
        dispatch(actions.loginError(e?.response?.data?.message));
        reject();
      });
  });