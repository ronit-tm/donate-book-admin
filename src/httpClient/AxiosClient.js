
import axios from 'axios';
import {handleApiError, handleRequest, handleResponse} from './ClientHelper';

export function axiosClient(baseURL) {
  const clientInstance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // clientInstance.interceptors.request.use(handleRequest);
  // clientInstance.interceptors.response.use(handleResponse, handleApiError);
  // clientInstance.defaults.timeout === 15000;
  return clientInstance;
}
