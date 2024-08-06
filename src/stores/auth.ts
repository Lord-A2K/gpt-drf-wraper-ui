import { defineStore } from 'pinia';
import { ref } from 'vue';
import { userSchema, loginSchema, User } from '../validation/userSchema';
import axios from 'axios';

import api from './api';


export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));
  const accessToken = ref<string | null>(localStorage.getItem('access_token'));
  const refreshToken = ref<string | null>(localStorage.getItem('refresh_token'));

  const setTokens = (access: string, refresh: string) => {
    accessToken.value = access;
    refreshToken.value = refresh;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  };

  const clearTokens = () => {
    accessToken.value = null;
    refreshToken.value = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  };

  const login = async (email: string, password: string) => {
    try {
      // Validate input data
      loginSchema.parse({ email, password });

      const response = await axios.post(api.authentication.token(), { email, password });
      const { access, refresh } = response.data;
      setTokens(access, refresh);

      const userResponse = await axios.get(api.authentication.profile(), {
        headers: { Authorization: `Bearer ${access}` },
      });
      user.value = userResponse.data;
      localStorage.setItem('user', JSON.stringify(userResponse.data));
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      // Validate input data
      userSchema.parse({ email, name, password });

      const response = await axios.post(api.authentication.register(), { email, name, password });
      const { access, refresh } = response.data.tokens;
      setTokens(access, refresh);

      const userResponse = await axios.get(api.authentication.profile(), {
        headers: { Authorization: `Bearer ${access}` },
      });
      user.value = userResponse.data;
      localStorage.setItem('user', JSON.stringify(userResponse.data));
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(api.authentication.refreshToken(), { refresh: refreshToken.value });
      const { access } = response.data;
      accessToken.value = access;
      localStorage.setItem('access_token', access);
    } catch (error) {
      console.error('Error during token refresh:', error);
      logout();
      throw new Error("Refresh toke not valid");
    }
  };

  const logout = () => {
    user.value = null;
    clearTokens();
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => !!accessToken.value;

  return {
    user,
    accessToken,
    refreshToken,
    login,
    register,
    refreshAccessToken,
    logout,
    isAuthenticated,
  };
});


