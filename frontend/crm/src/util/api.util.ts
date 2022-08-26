import axios from "axios";
import config from "./configuration.json";

export const apiHandler = {
  get,
  post,
  put
};

function get(url: string, token?: string) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(token),
  };
  return new Promise((resolve, reject) => {
    return axios
      .get(`${config.host}${url}`, requestOptions)
      .then(result => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          resolve([]);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function post(url: string, body: any, token?: string) {
  const requestOptions = {
    method: "POST",
    headers: authHeader(token),
  };
  return new Promise((resolve, reject) => {
    return axios
      .post(`${config.host}${url}`, body, requestOptions)
      .then(result => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          resolve([]);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}
function put(url: string, body: any, token?: string) {
  const requestOptions = {
    method: "PUT",
    headers: authHeader(token),
  };
  return new Promise((resolve, reject) => {
    return axios
      .put(`${config.host}${url}`, body, requestOptions)
      .then(result => {
        if (result.status === 200) {
          resolve(result.data);
        } else {
          resolve([]);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function authHeader(token?: string) {
  return { Authorization: `Bearer ${token}` };
}

export default get;
