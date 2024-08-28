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
  return axiosInstance.post("/logout",{},{
    headers: { "x-auth-token": token }
  });
};

export const resetpassword = (data) => {
  return axiosInstance.post("/reset/password",data);
};

export const getTournaments = (token, date) => {
  return authAxiosInstance.get("/home/get/tournament", {
    params: {
      date: date, // Use the date passed as a parameter
    },
    headers: { "x-auth-token": token }
  });
};

export const getAllTournaments = (token) => {
  return authAxiosInstance.get("/home/get/all/tournament",{
    headers: { "x-auth-token": token }
  });
};


export const getTournamentResults = (token, startDate, endDate) => {
  return authAxiosInstance.post(
    "/home/get/tournament/result",{},
    {
      headers: { "x-auth-token": token }
    }
  );
};



export const getPlayerOfWeek = (token) => {
  return authAxiosInstance.get("/home/get/tournament/best/palyer/week", {
    headers: { "x-auth-token": token },
  });
};

export const getUserDetails = (token) => {
  return axiosInstance.post(
    "/get/user/details", 
    {}, // Empty object for the data
    {
      headers: { "x-auth-token": token },
    }
  );
};


export const getCounts = () => {
  return authAxiosInstance.get("/home/tournament/result");
};

export const getUserReview = () => {
  return axiosInstance.get("/get/Review");
};

export const createUserReview = (data,token) => {
  return axiosInstance.post("/create/Review",data,{
    headers: { "x-auth-token": token },
  });
};

export const revokeUser = (data, token) => {
  return authAdminInstance.request({
    method: 'DELETE',
    url: "/revoke-user",
    headers: { "x-auth-token": token },
    data: data,  // Include the data in the request body
  });
};


export const updateStatus = (data,token) => {
  return authAdminInstance.put("/update-payment-status",data,{
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

export const updateUserEmail = (data,token) => {
  return authAxiosInstance.post("/update-email",data,{
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


export const editTournament = (data,token) => {
  return authAdminInstance.post("/edit/tournament",data,{
    headers: { "x-auth-token": token },
  });
};

export const verifyEmail = (data) => {
  return axiosInstance.post("/verify-email",data);
};

export const contact = (data) => {
  return axiosInstance.post("/contact/user",data);
};