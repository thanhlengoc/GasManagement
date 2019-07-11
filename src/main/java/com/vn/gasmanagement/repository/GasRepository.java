package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Gas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GasRepository extends JpaRepository<Gas, Integer> {

}
