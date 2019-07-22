import {httpPost, httpGet} from "./index";

const BASE_URL = "api/warehouse";

export function createNewBallot(request) {
  return httpPost(BASE_URL + "/create-import", request);
}

export function getListData() {
  return httpGet(BASE_URL + "/table")
}