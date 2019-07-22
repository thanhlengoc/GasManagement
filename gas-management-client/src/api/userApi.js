import {httpGet, httpPost} from "./index";

const BASE_URL = "api/auth";

export function createNewUser(request) {
  return httpPost(BASE_URL + "/new-user", request);
}

export function getListUser() {
  return httpGet(BASE_URL + '/get-list-user');
}