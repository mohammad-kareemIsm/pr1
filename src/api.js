import axios from 'axios';

const api = axios.create({
  baseURL: 'https://quizappsyria.pythonanywhere.com/Documntation/?format=openapi', 
});

export const setAuthToken = (token) => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  };
  
  export default api;       