import {httpPost, httpGet} from "./index";

const BASE_URL = "api/warehouse";

export function createNewBallot(request) {
  return httpPost(BASE_URL + "/create-import", request);
}

export function getListDataInWarehouse(request) {
  if (request) {
    return httpGet(BASE_URL + "/table-in-warehouse?dateFrom="+request.dateFrom+"&dateTo="+request.dateTo);
  }
  else {
    return null;
  }
}

export function getListDataOutWarehouse(request) {
  if (request) {
    return httpGet(BASE_URL + "/table-out-warehouse?dateFrom="+request.dateFrom+"&dateTo="+request.dateTo);
  }
  else {
    return null;
  }
}

export function getListDataExistEnd(request) {
  if (request) {
    return httpGet(BASE_URL + "/table-exist-end?dateFrom="+request.dateFrom+"&dateTo="+request.dateTo);
  }
  else {
    return null;
  }
}