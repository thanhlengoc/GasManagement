package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.PayShellDetail;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayShellDetailRepository extends JpaRepository<PayShellDetail, Integer> {

  List<PayShellDetail> findAllByIdPayShell(int idPayShell);
}
