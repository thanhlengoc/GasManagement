package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

  Account findByUsername(String username);
}
