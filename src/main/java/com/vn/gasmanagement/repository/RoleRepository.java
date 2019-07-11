package com.vn.gasmanagement.repository;

import com.vn.gasmanagement.modal.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {

  Role findByRoleName(String name);
}
