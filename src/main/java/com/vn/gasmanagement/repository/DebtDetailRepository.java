package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.DebtDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DebtDetailRepository extends JpaRepository<DebtDetail, Integer> {

}
