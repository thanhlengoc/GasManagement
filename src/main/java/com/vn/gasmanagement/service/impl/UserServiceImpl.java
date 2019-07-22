package com.vn.gasmanagement.service.impl;

import com.vn.gasmanagement.auth.CurrentUser;
import com.vn.gasmanagement.auth.UserPrincipal;
import com.vn.gasmanagement.modal.Account;
import com.vn.gasmanagement.modal.User;
import com.vn.gasmanagement.payload.UserProfile;
import com.vn.gasmanagement.payload.request.NewUserRequest;
import com.vn.gasmanagement.payload.response.BaseResponse;
import com.vn.gasmanagement.repository.AccountRepository;
import com.vn.gasmanagement.repository.RoleRepository;
import com.vn.gasmanagement.repository.UserRepository;
import com.vn.gasmanagement.service.UserService;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

  private Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

  @Autowired
  UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  AccountRepository accountRepository;

  @Override
  public ResponseEntity<?> getCurrentUser(@CurrentUser UserPrincipal user) {
    try {
      UserProfile currentUser = new UserProfile(user.getUserId(), user.getFullName(),
          user.getCmnd(), user.getPhoneNumber(), user.getAddress(), user.getStartDateWork(),
          user.getGrantedAuthorities());
      return new ResponseEntity<>(currentUser, HttpStatus.OK);
    }
    catch (Exception ex) {
      logger.error("User not found.");
      return new ResponseEntity<>("User not found.", HttpStatus.OK);
    }
  }

  @Override
  public ResponseEntity<?> getRoleOfCurrentUser(UserPrincipal user) {
    try {
      return new ResponseEntity<>(user.getGrantedAuthorities(), HttpStatus.OK);
    }
    catch (Exception ex) {
      logger.error("Not found role of user.");
      return new ResponseEntity<>("Not found role of user.", HttpStatus.OK);
    }
  }

  @Override
  public BaseResponse getListUser() {
    try {
      List<User> userList = userRepository.findAll();
      return new BaseResponse(1, "Lấy danh sách nhân viên thành công.", userList);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0, "Lấy danh sách nhân viên thất bại.", null);
    }
  }

  @Override
  public BaseResponse createNewUser(NewUserRequest request) {
    try {
      User user = new User();
      Account account = new Account();
      account.setUsername(request.getUsername());
      account.setPassword(passwordEncoder.encode(request.getPassword()));
      account.setRole(roleRepository.findById(request.getRole()).get());
      accountRepository.save(account);

      user.setAccountId(account.getId());
      user.setFullName(request.getFullName());
      user.setPhoneNumber(request.getPhoneNumber());
      user.setCmnd(request.getCmnd());
      user.setAddress(request.getAddress());
      user.setStartDateWork(request.getStartDateWork());
      user.setNote(request.getNote());
      userRepository.save(user);

      return new BaseResponse(1, "Thêm nhân viên thành công.", user);
    }
    catch (Exception ex) {
      logger.error(ex.getMessage(), ex);
      return new BaseResponse(0,"Thêm nhân viên thất bại.", null);
    }
  }
}
