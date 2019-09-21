package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Bill;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {

  @Query(value = "SELECT * FROM bill as t WHERE t.id = ?1", nativeQuery = true)
  Optional<Bill> findById(Long id);

  @Query(value = "SELECT * FROM bill as t WHERE t.customer_purchase = ?1", nativeQuery = true)
  List<Bill> findAllByCustomerPurchase(int customerPurchase);

  @Query(value = "SELECT * FROM bill as t WHERE t.invoice_date=?1", nativeQuery = true)
  List<Bill> findAllByInvoiceDate(String invoiceDate);

  @Query(value = "SELECT * FROM bill as t WHERE t.invoice_date>=DATE (?1) and t.invoice_date<=DATE (?2)", nativeQuery = true)
  List<Bill> findAllByPartition(String dateFrom, String dateTo);
}
