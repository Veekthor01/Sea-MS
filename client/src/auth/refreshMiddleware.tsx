import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Create an axios instance
const api = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
  });
  // Variable to track if we are currently refreshing the token
  let isRefreshing = false;
  // Queue Array to hold the failed requests that need to be retried
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

// Function to process the queue of failed requests
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

// Axios response interceptor
api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    // If the error is a 401 and the original request was not a refresh token request
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
      // Set the original request as requiring a retry
      originalRequest._retry = true;
      isRefreshing = true;
      // Create a new promise to handle the refresh token request
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