package com.vn.gasmanagement.service;

import com.vn.gasmanagement.auth.CurrentUser;
import com.vn.gasmanagement.auth.UserPrincipal;
import com.vn.gasmanagement.payload.request.NewUserRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import org.springframework.http.ResponseEntity;

public interface UserService {
  ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user);
  ResponseEntity<?> getRoleOfCurrentUser(@CurrentUser UserPrincipal user);
  BaseResponse getListUser();
  BaseResponse createNewUser(NewUserRequest request);
}
