import {httpGet} from "./index";

export function getCurrentUser() {
  return httpGet("api/current-user")
}