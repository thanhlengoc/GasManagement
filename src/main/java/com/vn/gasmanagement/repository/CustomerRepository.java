package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Customer;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {

  @Query(value = "SELECT * FROM customer as t where t.id = ?1", nativeQuery = true)
  Optional<Customer> findById(Long cusId);
}
