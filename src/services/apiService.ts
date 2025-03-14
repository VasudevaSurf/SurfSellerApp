import axios from 'axios';
import {API_ENDPOINTS} from '../constants/apiEndpoints';
import {API_BASE_URL, API_AUTH_HEADER} from '@env';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: API_AUTH_HEADER,
  },
});

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, {
      user_login: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
