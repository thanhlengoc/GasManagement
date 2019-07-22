import {httpGet, httpPost} from "./index";

const BASE_URI = "api/customer";

export function getAllCustomer() {
  return httpGet(BASE_URI + "/get-all");
}

export function createNewCustomer(request) {
  return httpPost(BASE_URI + "/create-new", request);
}