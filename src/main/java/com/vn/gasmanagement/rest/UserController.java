package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.auth.CurrentUser;
import com.vn.gasmanagement.auth.UserPrincipal;
import com.vn.gasmanagement.payload.UserProfile;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api")
public class UserController {

  @GetMapping(value = "/current-user")
  public UserProfile getCurrentUser(@CurrentUser UserPrincipal user) {
    return new UserProfile(user.getUserId(), user.getFullName(),
        user.getCmnd(), user.getPhoneNumber(), user.getAddress(), user.getStartDateWork(),
        user.getGrantedAuthorities());
  }
}
