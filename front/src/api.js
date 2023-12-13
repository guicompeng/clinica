// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001',
  timeout: 5000,
  withCredentials: true,
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    // Outros cabeçalhos personalizados, se necessário
  },
});

export default instance;