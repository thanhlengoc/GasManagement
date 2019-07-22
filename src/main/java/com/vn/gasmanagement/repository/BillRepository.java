package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Bill;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

  List<Bill> findAllByCustomerPurchase(int customerPurchase);

  List<Bill> findAllByInvoiceDate(String invoiceDate);
}
