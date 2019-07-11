package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.PayShell;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayShellRepository extends JpaRepository<PayShell, Integer> {

}
