import { axiosInstance, authAxiosInstance,authAdminInstance } from "./axios";

export const login = (credentials) => {
  return axiosInstance.post("/login", credentials);
};

export const signup = (userData) => {
  return axiosInstance.post("/signup", userData);
};

export const verify = (credentials) => {
  return axiosInstance.post("/verify-otp", credentials);
};

export const logout = (token) => {
  return axiosInstance.post("/logout", token);
};

export const getTournaments = (token) => {
  return authAxiosInstance.get("/home/get/tournament", {
    params: {
      date: "2024-08-06",
    },
    headers: { "x-auth-token": token }
  });
};

export const getTournamentResults = (token) => {
  return authAxiosInstance.get("/home/get/tournament/result", {
    headers: { "x-auth-token": token },
    "startDate":"2024-08-05",
    "endDate":"2024-08-06"
  });
};

export const getPlayerOfWeek = (token) => {
  return authAxiosInstance.get("/home/get/tournament/best/palyer/week", {
    headers: { "x-auth-token": token },
  });
};

export const getUserDetails = (token) => {
  return axiosInstance.get("/get/user/details", {
    headers: { "x-auth-token": token },
  });
};

export const getCounts = () => {
  return authAxiosInstance.get("/home/tournament/result");
};

export const getUserReview = () => {
  return axiosInstance.get("/home/get/review");
};

export const revokeUser = (data,token) => {
  return authAdminInstance.delete("/revoke-user",data,{
    headers: { "x-auth-token": token },
  });
}; 


export const joinTournament = (data,token) => {
  return authAxiosInstance.post("/tournament/join",data ,{
    headers: { "x-auth-token": token },
  });
};


export const participents = (token) => {
  return authAdminInstance.get("/get/user/payment-status", {
    headers: { "x-auth-token": token },
  });
};

export const updateUserDetails = (data,token) => {
  return authAxiosInstance.post("/update-profile",data,{
    headers: { "x-auth-token": token },
  });
};

export const createTournament = (data,token) => {
  return authAdminInstance.post("/create/tournament",data,{
    headers: { "x-auth-token": token },
  });
};

export const insertResult = (data,token) => {
  return authAdminInstance.post("/add-result",data,{
    headers: { "x-auth-token": token },
  });
};

export const insertPlayerOfTheWeek = (data,token) => {
  return authAdminInstance.post("/insert/tournament/week/winner",data,{
    headers: { "x-auth-token": token },
  });
};

export const getallUser = (token) => {
  return authAdminInstance.get("/get/all/users",{
    headers: { "x-auth-token": token },
  });
};

