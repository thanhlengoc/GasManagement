import { HOST_PORT } from '../config/hostport';
import axios from 'axios';

export function httpGet(url, body) {
  return callApi(url, 'GET', body);
}

export function httpPost(url, body) {
  return callApi(url, 'POST', body);
}

export function httpPut(url,body){
  return callApi(url,'POST',body)
}

export function httpDelete(url, body) {
  return callApi(url, 'DELETE', body);
}

function callApi(url, method, body = null) {
  const headers = { 'Content-Type': 'application/json; charset=utf-8' };
  const meta = {
    method,
    headers,
  };
  if (body) {
    meta.data = JSON.stringify(body);
  }
  return axios(`${HOST_PORT}/${url}`, meta) // eslint-disable-line
  .then(response => {
    return response;
  }).catch((error) => {
    console.log("fail!", error);
    // message.error(error.response.statusText);
    return false;
  });
}