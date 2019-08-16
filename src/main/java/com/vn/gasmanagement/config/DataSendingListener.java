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
      account.setPasswordDecode("123456");
      account.setRole(roleRepository.findByRoleName("MANAGER"));
      accountRepository.save(account);

      //user
      User user = new User();
      user.setFullName("Lê Ngọc Tường");
      user.setAccountId(accountRepository.findByUsername("tuongln").getId());
      user.setAddress("Diên Điền, Diên Khánh, Khánh Hòa.");
      user.setCmnd("2345678910");
      user.setPhoneNumber("0345678910");
      user.setStartDateWork("03/03/2019");
      userRepository.save(user);
    }

    //MANAGER 2
    if (accountRepository.findByUsername("manager2") == null) {
      Account account1 = new Account();
      account1.setUsername("manager2");
      account1.setPassword(passwordEncoder.encode("000000"));
      account1.setPasswordDecode("000000");
      account1.setRole(roleRepository.findByRoleName("MANAGER"));
      accountRepository.save(account1);

      //user
      User manager2 = new User();
      manager2.setFullName("Manager 2");
      manager2.setAccountId(accountRepository.findByUsername("manager2").getId());
      manager2.setAddress("Nha Trang, Khánh Hòa.");
      manager2.setCmnd("225706543");
      manager2.setPhoneNumber("0978779077");
      manager2.setStartDateWork("05/05/2019");
      userRepository.save(manager2);
    }

    //NHAN VIEN
    if (accountRepository.findByUsername("nhanvien1") == null) {
      Account account2 = new Account();
      account2.setUsername("nhanvien1");
      account2.setPassword(passwordEncoder.encode("111111"));
      account2.setPasswordDecode("111111");
      account2.setRole(roleRepository.findByRoleName("WORKER"));
      accountRepository.save(account2);

      //user
      User worker = new User();
      worker.setFullName("Nhân viên 1");
      worker.setAccountId(accountRepository.findByUsername("nhanvien1").getId());
      worker.setAddress("Diên Khánh, Khánh Hòa.");
      worker.setCmnd("225234543");
      worker.setPhoneNumber("0978567077");
      worker.setStartDateWork("06/06/2019");
      userRepository.save(worker);
    }

    //NHAN VIEN 2
    if (accountRepository.findByUsername("nhanvien2") == null) {
      Account account3 = new Account();
      account3.setUsername("nhanvien2");
      account3.setPassword(passwordEncoder.encode("222222"));
      account3.setPasswordDecode("222222");
      account3.setRole(roleRepository.findByRoleName("WORKER"));
      accountRepository.save(account3);

      //user
      User worker = new User();
      worker.setFullName("Nhân viên 2");
      worker.setAccountId(accountRepository.findByUsername("nhanvien2").getId());
      worker.setAddress("Diên Toàn, Khánh Hòa.");
      worker.setCmnd("225234567");
      worker.setPhoneNumber("0978567077");
      worker.setStartDateWork("06/06/2019");
      userRepository.save(worker);
    }
  }
}
