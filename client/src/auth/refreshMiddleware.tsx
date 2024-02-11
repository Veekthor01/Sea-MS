import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true, // This will enable cookies
  });
  
  let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && originalRequest.url !== `${BACKEND_URL}/refresh`) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(() => {
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(function(resolve, reject) {
        api.post(`${BACKEND_URL}/refresh`)
          .then(() => {
            processQueue(null);
            resolve(api(originalRequest));
          })
          .catch((err) => {
            processQueue(err);
            reject(err);
          })
          .then(() => { isRefreshing = false });
      });
    }

    return Promise.reject(error);
  }
);

    export default api;