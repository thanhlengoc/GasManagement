import {httpGet, httpPost} from "./index";

const BASE_URL = "api/bill";

export function createNewInvoice(request) {
  return httpPost(BASE_URL + "/create-invoice", request);
}

export function exportInvoice() {
  return httpGet(BASE_URL + "/export-invoice");
}

export function getListInvoice(customerId) {
  return httpGet(BASE_URL + "/list-invoice?" + customerId);
}