package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.ImportCoupon;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportCouponRepository extends JpaRepository<ImportCoupon, Integer> {

  List<ImportCoupon> findAllByDateAdded(String dateAdded);

  @Query(value = "SELECT * FROM import_coupon as t WHERE t.date_added >= DATE (?1) && t.date_added <= DATE (?2)", nativeQuery = true)
  List<ImportCoupon> findAllByDatePartition(String dateFrom, String dateTo);
}
