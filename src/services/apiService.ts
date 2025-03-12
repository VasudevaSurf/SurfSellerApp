import axios from 'axios';
import Config from '../config/Config';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: Config.API_AUTH_HEADER,
  },
});

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/NtSeLoginApi', {
      user_login: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
