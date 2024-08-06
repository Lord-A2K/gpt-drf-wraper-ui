import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.VITE_API_BASE_URL || 'http://localhost:8000', // Fallback to localhost if env variable is not set
  headers: {
    'Content-Type': 'application/json',
  },
});
