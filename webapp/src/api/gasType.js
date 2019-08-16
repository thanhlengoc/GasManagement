import {httpGet, httpPost} from "./index";

export function saveGasType(request) {
  return httpPost("api/save-gas", request);
}

export function getAllGasType() {
  return httpGet("api/get-all-gas");
}