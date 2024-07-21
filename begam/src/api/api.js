import { axiosInstance, authAxiosInstance } from './axios'


export const login = (credentials) => {
    return axiosInstance.post('/login', credentials);
};

export const signup = (userData) => {
    return axiosInstance.post('/signup', userData);
};

export const verify = (credentials) => {
    return axiosInstance.post('/verify-otp',credentials);
};

export const logout = (token) => {
    return axiosInstance.post('/logout',token);
};

export const getTournaments = () => {
    return authAxiosInstance.get('/home/get/tournament', {
      params: {
        date: '2024-07-13',
      },
    });
  };

  export const getPlayerOfWeek = (token) => {
    return axiosInstance.get('/home/tournament/result',token);
  }


  export const getUserReview = () => {
    return axiosInstance.get('/home/get/review');
  };
