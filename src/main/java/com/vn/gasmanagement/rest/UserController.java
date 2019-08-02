package com.vn.gasmanagement.rest;

import com.vn.gasmanagement.auth.CurrentUser;
import com.vn.gasmanagement.auth.UserPrincipal;
import com.vn.gasmanagement.payload.request.NewUserRequest;
import com.vn.gasmanagement.payload.request.UpdateUserRequest;
import com.vn.gasmanagement.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController
@RequestMapping(value = "/api/auth")
public class UserController {

  @Autowired
  UserServiceImpl userService;

  @GetMapping(value = "/current-user")
  public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user) {
    return userService.getCurrentUser(user);
  }

  @GetMapping(value = "/get-role-of-current-user")
  public ResponseEntity<?> getRoleOfCurrentUser(@CurrentUser UserPrincipal user) {
    return userService.getRoleOfCurrentUser(user);
  }

  @GetMapping(value = "/get-list-user")
  public ResponseEntity<?> getListUser() {
    return new ResponseEntity<>(userService.getListUser(), HttpStatus.OK);
  }

  @PostMapping(value = "/new-user")
  public ResponseEntity<?> createNewUser(@RequestBody NewUserRequest request) {
    return new ResponseEntity<>(userService.createNewUser(request), HttpStatus.OK);
  }

  @PostMapping(value = "/update-info")
  public ResponseEntity<?> updateUser(@RequestBody UpdateUserRequest request) {
    return new ResponseEntity<>(userService.updateUser(request), HttpStatus.OK);
  }

}
