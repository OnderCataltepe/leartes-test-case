import axios, { AxiosResponse } from 'axios';
const JSON_SERVER_BASE_URL = 'http://localhost:3004/';
const GLITCH_API_BASE_URL = 'https://flash-cherry-ceder.glitch.me/';
const API = axios.create({
  baseURL: GLITCH_API_BASE_URL,
  timeout: 1000,
  headers: {
    Accept: 'application/json'
  }
});

export default API;
