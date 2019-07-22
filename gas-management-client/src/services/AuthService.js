import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

let AUTH_API =  "http://localhost:8082/api/auth";

export const getMethod = (Url) => {
  axios.get(AUTH_API + Url)
  .then(function (response) {
    return response;
  })
  .catch(function (error) {
    handleError(error);
  });
};

export const getWithData = (Url, data) => {
  return axios.post(AUTH_API + Url, data);
};

export const get = (Url) => {
  return axios.get(AUTH_API + Url);
};

export const post = (Url, data) => {
  return axios.post(AUTH_API + Url, data);
};

const handleError = (error) => {
  if (error.response) {
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message);
  }
  console.log(error.config);
};

export const getCurrentUser = () => {
  return get("/current-user");
};

export const getRoleOfCurrentUser = () => {
  return get("/get-role-of-current-user");
};

export const handleLogout = () => {
  return axios.get("http://localhost:8082/logout");
};