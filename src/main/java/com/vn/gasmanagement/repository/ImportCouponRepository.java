package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.ImportCoupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportCouponRepository extends JpaRepository<ImportCoupon, Integer> {

}
