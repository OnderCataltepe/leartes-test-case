import axios, { AxiosResponse } from 'axios';

const API = axios.create({
  baseURL: 'https://flash-cherry-ceder.glitch.me/',
  timeout: 1000,
  headers: {
    Accept: 'application/json'
  }
});

export default API;
