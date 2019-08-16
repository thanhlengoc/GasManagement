package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Bill;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

  List<Bill> findAllByCustomerPurchase(int customerPurchase);

  @Query(value = "SELECT * FROM bill as t WHERE t.invoice_date=?1", nativeQuery = true)
  List<Bill> findAllByInvoiceDate(String invoiceDate);

  @Query(value = "SELECT * FROM bill as t WHERE t.invoice_date>=DATE (?1) and t.invoice_date<= DATE (?2)", nativeQuery = true)
  List<Bill> findAllByPartition(String dateFrom, String dateTo);
}
