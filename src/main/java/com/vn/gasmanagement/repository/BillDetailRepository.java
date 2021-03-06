package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.BillDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetail, Integer> {

  List<BillDetail> findAllByBillId(Long billId);
}
