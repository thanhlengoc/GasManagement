package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Debt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtRepository extends JpaRepository<Debt, Integer> {

}
