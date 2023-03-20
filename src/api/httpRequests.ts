import axios, { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 1000,
  headers: {
    Accept: 'application/json'
  }
});

export default API;
