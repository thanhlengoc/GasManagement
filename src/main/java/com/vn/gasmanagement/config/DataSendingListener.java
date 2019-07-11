package com.vn.gasmanagement.config;

import com.vn.gasmanagement.modal.Account;
import com.vn.gasmanagement.modal.Role;
import com.vn.gasmanagement.modal.User;
import com.vn.gasmanagement.repository.AccountRepository;
import com.vn.gasmanagement.repository.RoleRepository;
import com.vn.gasmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSendingListener implements ApplicationListener<ContextRefreshedEvent> {

  @Autowired
  AccountRepository accountRepository;

  @Autowired
  RoleRepository roleRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Override
  public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
    //Roles
    if(roleRepository.findByRoleName("MANAGER") == null){
      roleRepository.save(new Role("MANAGER"));
    }
    if(roleRepository.findByRoleName("WORKER") == null){
      roleRepository.save(new Role("WORKER"));
    }

    //MANAGER
    if (accountRepository.findByUsername("tuongln") == null) {
      Account account = new Account();
      account.setUsername("tuongln");
      account.setPassword(passwordEncoder.encode("123456"));
      Role role =  roleRepository.findByRoleName("MANAGER");
      account.setRole(role);

      accountRepository.save(account);

      //user
      User user = new User();
      user.setFullName("Lê Ngọc Tường");
      user.setAccountId(account.getId());
      user.setAddress("Diên Điền, Diên Khánh, Khánh Hòa.");
      user.setCmnd("2345678910");
      user.setPhoneNumber("0345678910");
      user.setStartDateWork("03/03/2019");

      userRepository.save(user);
    }

    //WORKER
    if (accountRepository.findByUsername("nhanvien") == null) {
      Account account = new Account();
      account.setUsername("nhanvien");
      account.setPassword(passwordEncoder.encode("000000"));
      Role role = roleRepository.findByRoleName("WORKER");
      account.setRole(role);

      accountRepository.save(account);

      //user
      User worker = new User();
      worker.setFullName("Worker 1");
      worker.setAccountId(account.getId());
      worker.setAddress("Diên Khánh, Khánh Hòa.");
      worker.setCmnd("1111111111");
      worker.setPhoneNumber("22222222222");
      worker.setStartDateWork("05/05/2019");

      userRepository.save(worker);
    }
  }
}
