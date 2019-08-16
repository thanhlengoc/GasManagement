import {httpGet, httpPost} from "./index";

const BASE_URL = "api/bill";

export function createNewInvoice(request) {
  return httpPost(BASE_URL + "/create-invoice", request);
}

export function exportInvoice(param) {
  return httpGet(BASE_URL + "/export-invoice?param="+param);
}

export function getListInvoice(customerId) {
  return httpGet(BASE_URL + "/list-invoice?" + customerId);
}

export function getListInOutInvoice(request) {
  if (request) {
    return httpGet(BASE_URL + "/data-in-out?dateFrom="+request.dateFrom+"&dateTo="+request.dateTo);
  }
  else {
    return null;
  }
}