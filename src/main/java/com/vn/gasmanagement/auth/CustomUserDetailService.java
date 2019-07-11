package com.vn.gasmanagement.auth;

import com.vn.gasmanagement.modal.Account;
import com.vn.gasmanagement.modal.User;
import com.vn.gasmanagement.repository.AccountRepository;
import com.vn.gasmanagement.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailService implements UserDetailsService {

  private Logger logger = LoggerFactory.getLogger(CustomUserDetailService.class);

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    try {
      Account account = accountRepository.findByUsername(username);
      if(account == null) {
        throw new UsernameNotFoundException("User not found");
      }
      User user = userRepository.findByAccountId(account.getId());
      return UserPrincipal.create(account, user);
    }
    catch (Exception ex){
      logger.error("UsernameNotFoundException");
      throw new UsernameNotFoundException("User not found");
    }
  }
}
