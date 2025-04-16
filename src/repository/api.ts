//src/repository/api.ts
//import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://152.67.89.52:8010',
//   headers: {
//     'X-API-Key': import.meta.env.VITE_API_KEY || 'b6f0c83a9d9f7c1e43e7eab8c0b519a47bce512f2d4b4f29c52ac4ed4a5b9261',
//     'Content-Type': 'application/json',
//   },
// });

// src/repository/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: localStorage.getItem('api_url') || import.meta.env.VITE_API_URL,
  headers: {
    'X-API-Key': localStorage.getItem('api_key') || import.meta.env.VITE_API_KEY,
    'Content-Type': 'application/json',
  },
});

// Funktion, um die Axios-Konfiguration dynamisch zu aktualisieren
export function updateApiConfig(url: string, key: string) {
  api.defaults.baseURL = url;
  api.defaults.headers['X-API-Key'] = key;

  // optional: auch im localStorage aktualisieren
  localStorage.setItem('api_url', url);
  localStorage.setItem('api_key', key);
}

export { api };