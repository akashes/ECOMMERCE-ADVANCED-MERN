// import axios from 'axios';



// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// // 1. REQUEST INTERCEPTOR (Attach Token)
// axios.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// 2. RESPONSE INTERCEPTOR (Handle 401)
// axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     console.log('inside axios response interceptor')
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
      
//       if (isRefreshing) {
//         // If already refreshing, queue this request
//         return new Promise(function(resolve, reject) {
//           failedQueue.push({ resolve, reject });
//         })
//         .then(token => {
//           originalRequest.headers.Authorization = 'Bearer ' + token;
//           return axios(originalRequest);
//         })
//         .catch(err => Promise.reject(err));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         // Call your refresh endpoint
//         // NOTE: Use a clean axios instance or fetch to avoid infinite interceptor loops
//         const response = await axios.post('/api/user/refresh-token', {}, { withCredentials: true });
        
//         const { accessToken } = response.data; // Adjust based on your API response structure

//         localStorage.setItem('accessToken', accessToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        
//         processQueue(null, accessToken);
//         isRefreshing = false;

//         return axios(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError, null);
//         isRefreshing = false;
        
//         // Logout Logic
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('user');
//         // window.location.href = '/login';
        
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );












import axios from 'axios';

const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', 
  withCredentials: true
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
        .then(token => {
          originalRequest.headers.Authorization = 'Bearer ' + token;
          return axios(originalRequest);
        })
        .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {

        const response = await authClient.post('/api/user/refresh-token');
        
        const { accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        
        processQueue(null, accessToken);
        isRefreshing = false;

        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Logout Logic
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        // axios.post(`${import.meta.env.VITE_API_URL}/api/user/logout`)
        

        if (window.location.pathname !== '/login') {
            window.location.href = '/login'; 
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);