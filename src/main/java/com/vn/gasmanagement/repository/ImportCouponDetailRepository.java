package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.ImportCouponDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImportCouponDetailRepository extends JpaRepository<ImportCouponDetail, Integer> {

  List<ImportCouponDetail> findAllByIdImportCoupon(int idImportCoupon);
}
