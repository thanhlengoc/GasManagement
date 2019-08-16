import {httpGet, httpPost} from "./index";

const BASE_URL = "api/bill";

export function createNewInvoice(request) {
  return httpPost(BASE_URL + "/create-invoice", request);
}

export function exportInvoice(requestParam) {
  let params = "";
  Object.keys(requestParam).map(i => params += i + '=' + requestParam[i] + '&');
  let url = "api/bill/export-invoice?" + params.substring(0, params.length -1);
  return httpGet(BASE_URL + "/export-invoice?param="+ params.substring(0, params.length -1));
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