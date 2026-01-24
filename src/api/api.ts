import axios from 'axios';
export const API_ROUTES = {
  profile: `profile`,
  category: `categories`,
};
export const httpClient = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 10000,
});
