// import axios from 'axios';
// import store from '../store';
// import { API } from '../configs';

// const apios = axios.create({
//   baseURL: process.env.API,
// });

// apios.interceptors.request.use(config => {
//   if (!store.state.token) return config;

//   config.headers.common.Authorization = `Bearer ${store.state.token}`;

//   return config;
// });

// apios.interceptors.response.use(
//   response => response,
//   error => {
//     if (error.response.status === 401 && !store.state.redirected) {
//       store.dispatch('logout');
//       store.commit('redirected', true);
//       window.location.href = '/';
//     }
//     return Promise.reject(error);
//   },
// );

// export default apios;
